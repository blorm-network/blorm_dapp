// components/SwapForm.js

import { useState, useEffect } from 'react';
import { SigningCosmosClient } from '@cosmjs/launchpad';
import { assets, chains } from 'chain-registry';
import { chainRegistryChainToKeplr } from '@chain-registry/keplr';
import styles from '../styles/SwapForm.module.css';

export default function SwapForm() {
  const [keplr, setKeplr] = useState(null);
  const [validChains, setValidChains] = useState([]);
  const [sourceAssetDenom, setSourceAssetDenom] = useState('');
  const [sourceAssetChainID, setSourceAssetChainID] = useState('');
  const [destAssetDenom, setDestAssetDenom] = useState('');
  const [destAssetChainID, setDestAssetChainID] = useState('');
  const [amountIn, setAmountIn] = useState('');
  const [route, setRoute] = useState(null);
  const [addresses, setAddresses] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check for Keplr installation
    const checkKeplr = async () => {
      if (typeof window !== 'undefined' && window.keplr) {
        setKeplr(window.keplr);

        const validChains = chains.filter(chain => {
          const hasRequiredFields = chain.chain_id && chain.slip44 && chain.bech32_prefix && chain.currencies && chain.currencies.length > 0;
          if (!hasRequiredFields) {
            console.warn(`Skipping chain with missing info: ${JSON.stringify(chain)}`);
            return false;
          }
          try {
            const config = chainRegistryChainToKeplr(chain, assets);
            return !!config;
          } catch (error) {
            console.warn(`Skipping chain with invalid config: ${chain.chain_id} - ${error.message}`);
            return false;
          }
        });

        console.log("Valid Chains: ", validChains);

        setValidChains(validChains);
      }
    };

    checkKeplr();

    // Detect if Keplr becomes available after loading
    const documentStateChange = (event) => {
      if (event.target && event.target.readyState === 'complete') {
        checkKeplr();
      }
    };

    document.addEventListener('readystatechange', documentStateChange);
    return () => {
      document.removeEventListener('readystatechange', documentStateChange);
    };
  }, []);

  const connectKeplr = async () => {
    if (keplr) {
      await Promise.all(validChains.map(async (chain) => {
        const chainConfig = chainRegistryChainToKeplr(chain, assets);
        await keplr.experimentalSuggestChain(chainConfig);
      }));
      await keplr.enable(validChains.map(chain => chain.chain_id));
      const accountInfo = await Promise.all(
        validChains.map(async (chain) => {
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
                  <option value="uusdc">uusdc</option>
                  <option value="uatom">uatom</option>
                  <option value="uluna">uluna</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <label>
                Source Asset Chain ID:
                <select value={sourceAssetChainID} onChange={(e) => setSourceAssetChainID(e.target.value)}>
                  <option value="" disabled>Select Source Chain ID</option>
                  {validChains.map(chain => (
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
                  <option value="utia">utia</option>
                  <option value="uosmo">uosmo</option>
                  <option value="uluna">uluna</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <label>
                Destination Asset Chain ID:
                <select value={destAssetChainID} onChange={(e) => setDestAssetChainID(e.target.value)}>
                  <option value="" disabled>Select Destination Chain ID</option>
                  {validChains.map(chain => (
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

