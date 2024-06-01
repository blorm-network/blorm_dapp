import { useState, useEffect } from 'react';
import { assets as allAssets, chains as allChains } from 'chain-registry';
import { chainRegistryChainToKeplr } from '@chain-registry/keplr';
import styles from '../styles/SwapForm.module.css';

export default function SwapForm() {
  const [keplr, setKeplr] = useState(null);
  const [sourceAssetDenom, setSourceAssetDenom] = useState('');
  const [sourceAssetChainID, setSourceAssetChainID] = useState('');
  const [destAssetDenom, setDestAssetDenom] = useState('');
  const [destAssetChainID, setDestAssetChainID] = useState('');
  const [amountIn, setAmountIn] = useState('');
  const [route, setRoute] = useState(null);
  const [addresses, setAddresses] = useState({});
  const [connected, setConnected] = useState(false);
  const [assets, setAssets] = useState([]);
  const [chains, setChains] = useState(allChains);

  useEffect(() => {
    const filteredAssets = allAssets.reduce((acc, asset) => {
      return acc.concat(asset.assets);
    }, []);
    setAssets(filteredAssets);
    console.log('Filtered assets:', filteredAssets);
  }, []);

  useEffect(() => {
    if (sourceAssetDenom) {
      const selectedAsset = assets.find(a => a.base === sourceAssetDenom);
      if (selectedAsset) {
        const assetChains = allChains.filter(chain => chain.chain_name === selectedAsset.chain_name);
        setChains(assetChains);
        console.log('Asset Chains:', assetChains);
      }
    } else {
      setChains(allChains);
    }
  }, [sourceAssetDenom, assets]);

  const connectKeplr = async () => {
    if (keplr) {
      const selectedChains = [
        chains.find(chain => chain.chain_id === sourceAssetChainID),
        chains.find(chain => chain.chain_id === destAssetChainID)
      ].filter(Boolean);

      if (selectedChains.length === 2) {
        await Promise.all(selectedChains.map(async (chain) => {
          const chainConfig = chainRegistryChainToKeplr(chain, allAssets);
          await keplr.experimentalSuggestChain(chainConfig);
        }));

        await keplr.enable(selectedChains.map(chain => chain.chain_id));

        const accountInfo = await Promise.all(
          selectedChains.map(async (chain) => {
            const key = await keplr.getKey(chain.chain_id);
            return { chainId: chain.chain_id, address: key.bech32Address };
          })
        );

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
    const res = await fetch('/api/find-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceAssetDenom,
        sourceAssetChainID,
        destAssetDenom,
        destAssetChainID,
        amountIn,
        smartSwapOptions: { splitRoutes: true },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setRoute(data);
      alert('Route found successfully!');
    } else {
      alert('Error finding route');
    }
  };

  const handleExecuteRoute = async () => {
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

  return (
    <div className={styles.container}>
      <button onClick={connectKeplr} className={styles.connectButton}>Connect Keplr Wallet</button>
      <form onSubmit={handleFindRoute} className={styles.form}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <label>
            Source Asset Denom:
            <select value={sourceAssetDenom} onChange={(e) => setSourceAssetDenom(e.target.value)}>
              <option value="" disabled>Select Source Asset Denom</option>
              {assets.map(asset => (
                <option key={asset.symbol} value={asset.symbol}>{asset.symbol}</option>
              ))}
            </select>
          </label>
          <label>
            Source Asset Chain ID:
            <select value={sourceAssetChainID} onChange={(e) => setSourceAssetChainID(e.target.value)} disabled={!sourceAssetDenom}>
              <option value="" disabled>Select Source Chain ID</option>
              {chains.map(chain => (
                <option key={chain.chain_id} value={chain.chain_id}>{chain.chain_id}</option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <hr />
        <br />
        <br />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <label>
            Destination Asset Denom:
            <select value={destAssetDenom} onChange={(e) => setDestAssetDenom(e.target.value)}>
              <option value="" disabled>Select Destination Asset Denom</option>
              {assets.map(asset => (
                <option key={asset.name} value={asset.name}>{asset.display}</option>
              ))}
            </select>
          </label>
          <label>
            Destination Asset Chain ID:
            <select value={destAssetChainID} onChange={(e) => setDestAssetChainID(e.target.value)} disabled={!destAssetDenom}>
              <option value="" disabled>Select Destination Chain ID</option>
              {chains.map(chain => (
                <option key={chain.chain_id} value={chain.chain_id}>{chain.chain_id}</option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <hr />
        <br />
        <br />
        <label>
          Amount In:
          <input
            type="text"
            value={amountIn}
            placeholder="1000000"
            onChange={(e) => setAmountIn(e.target.value)}
          />
        </label>
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
