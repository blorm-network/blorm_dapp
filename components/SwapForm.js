import { useState, useEffect } from 'react';
import Select from 'react-select';
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { SkipRouter } from "@skip-router/core";
import styles from '../styles/SwapForm.module.css';

export default function SwapForm() {
  const [keplr, setKeplr] = useState(null);
  const [sourceAssetDenom, setSourceAssetDenom] = useState(null);
  const [sourceAssetChainID, setSourceAssetChainID] = useState(null);
  const [destAssetDenom, setDestAssetDenom] = useState(null);
  const [destAssetChainID, setDestAssetChainID] = useState(null);
  const [amountIn, setAmountIn] = useState('');
  const [route, setRoute] = useState(null);
  const [addresses, setAddresses] = useState({});
  const [connected, setConnected] = useState(false);
  const [assets, setAssets] = useState([]);
  const [chains, setChains] = useState([]);
  const [isRawOutputVisible, setIsRawOutputVisible] = useState(false);
  const [assetOptionsSource, setAssetOptionsSource] = useState([]);
  const [assetOptionsDest, setAssetOptionsDest] = useState([]);
  const [chainOptions, setChainOptions] = useState([]);


  useEffect(() => {
    const fetchChains = async () => {
      const skipClient = new SkipRouter();
      const resultChains = await skipClient.chains();
      console.log("Fetched Chains:", resultChains);
      setChains(resultChains);
    };
    fetchChains();

    const fetchAssets = async () => {
      const res = await fetch('/api/ibc-chains', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log("Fetched Assets:", data);
      setAssets(data);
    };
    fetchAssets();
  }, []);
  
  useEffect(() => {
    if (chains) {
      setChainOptions(chains.map(chain => ({
        value: chain.chainID,
        label: chain.chainID + " / " + chain.chainName,
      })));
    }
  }, [chains]);

  useEffect(() => {
    if (sourceAssetChainID && assets && sourceAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsSource(assets.chain_to_assets_map[sourceAssetChainID.value].assets.map(asset => ({
        value: asset.denom,
        label: asset.name + " (" + asset.denom + " / " + asset.symbol + " / " + asset.origin_denom + ")",
      })));
      console.log("Source Asset Options set:", assetOptionsSource);
    }
  }, [sourceAssetChainID]);

  useEffect(() => {
    if (destAssetChainID && assets && destAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsDest(assets.chain_to_assets_map[destAssetChainID.value].assets.map(asset => ({
        value: asset.denom,
        label: asset.name + " (" + asset.denom + " / " + asset.symbol + " / " + asset.origin_denom + ")",
      })));
      console.log("Source Asset Options set:", assetOptionsSource);
    }
  }, [destAssetChainID]);

  useEffect(() => {
    const loadKeplr = async () => {
      if (typeof window !== 'undefined') {
        while (!window.keplr) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        setKeplr(window.keplr);
      }
    };
    loadKeplr();
    window.addEventListener("keplr_keystorechange", () => {
      console.log("Key store in Keplr is changed. You may need to refetch the account info.");
    });
  }, []);

  const connectKeplr = async () => {
    if (!keplr) {
      alert("Please install Keplr extension");
      return;
    }
    try {
      const chainIds = route?.requiredChainAddresses || [sourceAssetChainID?.value, destAssetChainID?.value].filter(Boolean);
      if (chainIds.length < 2) {
        alert("Please select both source and destination chains or find a route first.");
        return;
      }
      await keplr.enable(chainIds);
      const addressMap = {};
      for (let chainId of chainIds) {
        const offlineSigner = keplr.getOfflineSigner(chainId);
        if (!offlineSigner) {
          alert(`Failed to get offline signer for chain ${chainId}`);
          return;
        }
        const accounts = await offlineSigner.getAccounts();
        addressMap[chainId] = accounts[0].address;
      }
      setAddresses(addressMap);
      setConnected(true);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to Keplr");
    }
  };

  const handleFindRoute = async (e) => {
    e.preventDefault();
    if (!sourceAssetDenom || !sourceAssetChainID || !destAssetDenom || !destAssetChainID || !amountIn) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Finding route with these details:', { sourceAssetDenom, sourceAssetChainID, destAssetDenom, destAssetChainID, amountIn });
    const requestBody = {
      sourceAssetDenom: sourceAssetDenom.value,
      sourceAssetChainID: sourceAssetChainID.value,
      destAssetDenom: destAssetDenom.value,
      destAssetChainID: destAssetChainID.value,
      amountIn,
      smartSwapOptions: { splitRoutes: true },
    };
    const res = await fetch('/api/ibc-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (res.ok) {
      const data = await res.json();
      setRoute(data);
    } else {
      const errorData = await res.json();
      alert(`Error finding route: ${errorData}`);
    }
  };

  const handleExecuteRoute = async () => {
    if (!route) {
      alert('Please find a route first.');
      return;
    }
    if (!keplr) {
      alert("Please install Keplr extension");
      return;
    }
    try {
      const chainIds = route.requiredChainAddresses;
      await keplr.enable(chainIds);

      const addressMap = {};
      const signers = {};
      for (let chainId of chainIds) {
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        addressMap[chainId] = accounts[0].address;
        signers[chainId] = offlineSigner; // Store the offline signer
      }

      console.log(addressMap, signers);

      const cosmosSigners = Object.entries(signers).reduce((acc, [chainID, signer]) => {
        acc[chainID] = new SigningCosmosClient("https://lcd-cosmoshub.keplr.app", addresses[chainID], signer);
        return acc;
      }, {});

      // Initialize SkipRouter with the signers
      const skipClient = new SkipRouter({ getCosmosSigner: (chainID) => cosmosSigners[chainID] });

      await skipClient.executeRoute({
        route,
        userAddresses: Object.entries(addresses).map(([chainID, address]) => ({ chainID, address })),
        onTransactionCompleted: (chainID, txHash, status) => {
          console.log(`Route completed with tx hash: ${txHash} & status: ${status.state}`);
        },
      });

      alert('Route executed successfully!');
    } catch (error) {
      console.error('Error executing route:', error);
      // alert('Error executing route');
    }
  };

  const generateReadableRoute = (route) => {
    if (!route || !route.operations) return '';
    const truncateDenom = (denom) => {
      if (denom.length > 12) {
        return denom.slice(0, 7) + '...' + denom.slice(-5);
      }
      return denom;
    };
    const routeParts = route.operations.map((operation, index) => {
      const type = Object.keys(operation)[0];
      if (type === 'transfer') {
        const transfer = operation.transfer;
        return `Transfer ${truncateDenom(transfer.denomIn)} from ${transfer.fromChainID} to ${transfer.toChainID}`;
      } else if (type === 'swap') {
        const swap = operation.swap;
        return `Swap ${truncateDenom(swap.denomIn)} on ${swap.swapIn.swapVenue.name}`;
      }
    });
    return routeParts.join(' -> ');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFindRoute} className={styles.form}>
      <div className={styles.formGroup}>
          <label>Source Network:</label>
          <Select
            className="w-full"
            value={sourceAssetChainID}
            onChange={setSourceAssetChainID}
            options={chainOptions}
            placeholder="Search for a network ..."
          />
        </div>
        <div className={styles.formGroup}>
          <label>Source Token:</label>
          <Select
            className="w-full"
            value={sourceAssetDenom}
            onChange={setSourceAssetDenom}
            options={assetOptionsSource}
            placeholder="Search for a token ..."
          />
        </div>
        <div className={styles.formGroup}>
          <label>Destination Network:</label>
          <Select
            className="w-full"
            value={destAssetChainID}
            onChange={setDestAssetChainID}
            options={chainOptions}
            placeholder="Search for a network ..."
          />
        </div>
        <div className={styles.formGroup}>
          <label>Destination Token:</label>
          <Select
            className="w-full"
            value={destAssetDenom}
            onChange={setDestAssetDenom}
            options={assetOptionsDest}
            placeholder="Search for a token ..."
          />
        </div>
        <div className={styles.formGroup}>
          <label>Amount In:</label>
          <input
            type="text"
            value={amountIn}
            placeholder="1000000"
            onChange={(e) => setAmountIn(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button type="submit">Find Route</button>
      </form>
      {route && (
        <div className={styles.results}>
          <h1>We found a route!</h1>
          <br />
          <h2>Route Details</h2>
          <p>{generateReadableRoute(route)}</p>
          <button onClick={() => setIsRawOutputVisible(!isRawOutputVisible)}>
            {isRawOutputVisible ? 'Hide' : 'Show'} Raw Output
          </button>
          {isRawOutputVisible && (
            <pre>{JSON.stringify(route, null, 2)}</pre>
          )}
          <button onClick={handleExecuteRoute}>Execute Route</button>
        </div>
      )}
      <div className={styles.keplr}>
        <button onClick={connectKeplr} className="text-white">Connect Keplr</button>
        {connected && (
          <div>
            <h2 className="text-white">Connected Addresses</h2>
            <pre className="text-white">{JSON.stringify(addresses, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
