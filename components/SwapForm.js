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
  const [displayError, setDisplayError] = useState(null);
  const [routeTxs, setRouteTxs] = useState([]);


  useEffect(() => {
    const fetchChains = async () => {
      const skipClient = new SkipRouter();
      const resultChains = await skipClient.chains();
      // console.log("Fetched Chains:", resultChains);
      setChains(resultChains);
    };
    fetchChains();

    const fetchAssets = async () => {
      const res = await fetch('/api/chains/ibc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log("Fetched Assets:", data);
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
      // console.log("Source Asset Options set:", assetOptionsSource);
    }
  }, [sourceAssetChainID]);

  useEffect(() => {
    if (destAssetChainID && assets && destAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsDest(assets.chain_to_assets_map[destAssetChainID.value].assets.map(asset => ({
        value: asset.denom,
        label: asset.name + " (" + asset.denom + " / " + asset.symbol + " / " + asset.origin_denom + ")",
      })));
      // console.log("Source Asset Options set:", assetOptionsSource);
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
      setDisplayError("Key store in Keplr is changed. You may need to refetch the account info.");
    });
  }, []);

  const connectKeplr = async () => {
    if (!keplr) {
      setDisplayError("Please install Keplr extension");
      return;
    }
    try {
      const chainIds = route?.requiredChainAddresses || [sourceAssetChainID?.value, destAssetChainID?.value].filter(Boolean);
      if (chainIds.length < 2) {
        setDisplayError("Please select both source and destination chains or find a route first.");
        return;
      }
      await keplr.enable(chainIds);
      const addressMap = {};
      for (let chainId of chainIds) {
        const offlineSigner = keplr.getOfflineSigner(chainId);
        if (!offlineSigner) {
          setDisplayError(`Failed to get offline signer for chain ${chainId}`);
          return;
        }
        const accounts = await offlineSigner.getAccounts();
        addressMap[chainId] = accounts[0].address;
      }
      setAddresses(addressMap);
      setConnected(true);
    } catch (error) {
      console.error(error);
      setDisplayError("Failed to connect to Keplr");
    }
  };

  const handleFindRoute = async (e) => {
    e.preventDefault();
    if (!sourceAssetDenom || !sourceAssetChainID || !destAssetDenom || !destAssetChainID || !amountIn) {
      setDisplayError('Please fill in all fields.');
      return;
    }
    // console.log('Finding route with these details:', { sourceAssetDenom, sourceAssetChainID, destAssetDenom, destAssetChainID, amountIn });
    const requestBody = {
      sourceAssetDenom: sourceAssetDenom.value,
      sourceAssetChainID: sourceAssetChainID.value,
      destAssetDenom: destAssetDenom.value,
      destAssetChainID: destAssetChainID.value,
      amountIn,
      smartSwapOptions: { splitRoutes: true },
    };
    const res = await fetch('/api/route/ibc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (res.ok) {
      const data = await res.json();
      setRoute(data);
      setDisplayError(null);
    } else {
      const errorData = await res.json();
      setDisplayError('Error finding route: ' + errorData.error);
    }
  };

  useEffect(() => {
    // Runs once the route state has been updated
    if (route !== null) {
      handleGetRouteMessages();
    }
  }, [route]);

  const handleGetRouteMessages = async () => {
    if (!route) {
      setDisplayError('Please find a route first.');
      return;
    }
    if (!keplr) {
      setDisplayError("Please install Keplr extension");
      return;
    }

    await connectKeplr();

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

      // console.log(addressMap, signers);

      const routeWithAddresses = {
        ...route,
        addresses: {
          addressList: Object.values(addressMap),
        },
      };

      // console.log('Route object sending to API:', routeWithAddresses);

      const res = await fetch('/api/execute/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeWithAddresses),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Fetched messages:', data);
        setRouteTxs(data.txs);
      }
      else {
        const errorData = await res.json();
        setDisplayError('Error fetching route messages: ' + errorData.error);
        // console.log('Error fetching route messages:', errorData.error);
      }
    }
    catch (error) {
      setDisplayError('Error executing route: ' + error.message);
      // console.error(error);
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

        </div>
      )}
      <div className={styles.displayMessage}>
        {displayError && (
          <div>
            <h2>{displayError}</h2>
          </div>
        )}
        {connected && (
          <div>
            <h2 className="text-black text-left">Connected Addresses</h2>
            <pre className="text-black text-left text-xs">{JSON.stringify(addresses, null, 2)}</pre>
          </div>
        )}
        {routeTxs && (
          <div>
            <h2 className="text-black text-left">Route</h2>
            <div className="text-black text-left text-xs">
              {routeTxs.map((tx, index) => (
                <div key={index} className="tx">
                  {tx.cosmos_tx.path.map((item, index) => (
                    <div key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
