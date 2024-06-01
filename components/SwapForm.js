import { useState, useEffect } from 'react';
import { assets as allAssets, chains as allChains } from 'chain-registry';
import { chainRegistryChainToKeplr } from '@chain-registry/keplr';
import Select from 'react-select';
import styles from '../styles/SwapForm.module.css';

export default function SwapForm() {
  // State variables
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
  const [chains, setChains] = useState(allChains);

  useEffect(() => {
    // Fetch and filter assets
    const filteredAssets = allAssets.reduce((acc, asset) => {
      return acc.concat(asset.assets);
    }, []);

    // Filter unique assets based on their symbol
    const uniqueAssets = Array.from(new Set(filteredAssets.map(a => a.symbol)))
      .map(symbol => {
        return filteredAssets.find(a => a.symbol === symbol);
      });

    // Set assets state
    setAssets(filteredAssets);
  }, []);

  useEffect(() => {
    // Update chains state based on selected source asset
    // Check if a source asset is selected
    if (sourceAssetDenom) {
      // Find the selected asset from the assets array
      const selectedAsset = assets.find(a => a.base === sourceAssetDenom.value);
      // If the selected asset is found
      if (selectedAsset) {
        // Filter the chains array to include only the chains with the same chain_name as the selected asset
        const assetChains = allChains.filter(chain => chain.name === selectedAsset.chain_name);
        // Update the chains state with the filtered chains
        setChains(assetChains);
      }
    } else {
      // If no source asset is selected, set the chains state to include all chains
      setChains(allChains);
    }
  }, [sourceAssetDenom, assets]);

  const connectKeplr = async () => {
    // Connect to Keplr wallet
    if (keplr) {
      const selectedChains = [
        chains.find(chain => chain.chain_id === sourceAssetChainID?.value),
        chains.find(chain => chain.chain_id === destAssetChainID?.value)
      ].filter(Boolean);

      if (selectedChains.length === 2) {
        // Suggest and enable selected chains
        await Promise.all(selectedChains.map(async (chain) => {
          const chainConfig = chainRegistryChainToKeplr(chain, allAssets);
          await keplr.experimentalSuggestChain(chainConfig);
        }));

        await keplr.enable(selectedChains.map(chain => chain.chain_id));

        // Get account info for selected chains
        const accountInfo = await Promise.all(
          selectedChains.map(async (chain) => {
            const key = await keplr.getKey(chain.chain_id);
            return { chainId: chain.chain_id, address: key.bech32Address };
          })
        );

        // Set addresses state and mark as connected
        const addressMap = accountInfo.reduce((acc, info) => {
          acc[info.chainId] = info.address;
          return acc;
        }, {});

        setAddresses(addressMap);
        setConnected(true);
      } else {
        alert('Please select both source and destination chains.');
      }
    } else {
      alert('Please install Keplr extension.');
    }
  };

  const handleFindRoute = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !sourceAssetDenom ||
      !sourceAssetChainID ||
      !destAssetDenom ||
      !destAssetChainID ||
      !amountIn
    ) {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Finding route with these details:', {sourceAssetDenom, sourceAssetChainID, destAssetDenom, destAssetChainID, amountIn})

    // Prepare request body
    const requestBody = {
      sourceAssetDenom: sourceAssetDenom.value,
      sourceAssetChainID: sourceAssetChainID.value,
      destAssetDenom: destAssetDenom.value,
      destAssetChainID: destAssetChainID.value,
      amountIn,
      smartSwapOptions: { splitRoutes: true },
    };
  
    // Send request to find route
    const res = await fetch('/api/find-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    if (res.ok) {
      const data = await res.json();
      setRoute(data);
      alert('Route found successfully!');
    } else {
      const errorData = await res.json();
      alert(`Error finding route: ${errorData.error}`);
    }
  };  

  const handleExecuteRoute = async () => {
    // Execute route
    const res = await fetch('/api/execute-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ route, addresses }),
    });

    if (res.ok) {
      alert('Route executed successfully!');
    } else {
      alert('Error executing route');
    }
  };

  // Prepare options for asset select
  const assetOptions = assets.map(asset => ({
    value: asset.base,
    label: asset.display + " (" + asset.symbol + ", " + asset.name + ", " + asset.base + ")",
  }));

  // Prepare options for chain select
  const chainOptions = chains.map(chain => ({
    value: chain.chain_id,
    label: chain.chain_id + " / " + chain.chain_name,
  }));

  return (
    <div className={styles.container}>
      <form onSubmit={handleFindRoute} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Source Token:</label>
          <Select
            className="w-full"
            value={sourceAssetDenom}
            onChange={setSourceAssetDenom}
            options={assetOptions}
            placeholder="Search for a token ..."
          />
        </div>
        <div className={styles.formGroup}>
          <label>Source Network:</label>
          <Select
            className="w-full"
            value={sourceAssetChainID}
            onChange={setSourceAssetChainID}
            options={chainOptions}
            placeholder="Search for a network ..."
            isDisabled={!sourceAssetDenom}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Source Token:</label>
          <Select
            className="w-full"
            value={destAssetDenom}
            onChange={setDestAssetDenom}
            options={assetOptions}
            placeholder="Search for a token ..."
          />
        </div>
        <div className={styles.formGroup}>
          <label>Source Network:</label>
          <Select
            className="w-full"
            value={destAssetChainID}
            onChange={setDestAssetChainID}
            options={chainOptions}
            placeholder="Search for a network ..."
            isDisabled={!sourceAssetDenom}
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
          defaultValue={1000000}
        />
        </div>
        <button type="submit">Find Route</button>
      </form>
      {route && (
        <div className={styles.results}>
          <h2>Route Details</h2>
          <pre>{JSON.stringify(route, null, 2)}</pre>
          <button onClick={handleExecuteRoute}>Execute Route</button>
        </div>
      )}
    </div>
  );
}
