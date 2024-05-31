// components/SwapForm.js

import { useState } from 'react';
import styles from '../styles/SwapForm.module.css';

export default function SwapForm() {
  const [sourceAssetDenom, setSourceAssetDenom] = useState('');
  const [sourceAssetChainID, setSourceAssetChainID] = useState('');
  const [destAssetDenom, setDestAssetDenom] = useState('');
  const [destAssetChainID, setDestAssetChainID] = useState('');
  const [amountIn, setAmountIn] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [route, setRoute] = useState(null);

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
      body: JSON.stringify({ route }),
    });

    if (res.ok) {
      alert('Route executed successfully!');
    } else {
      alert('Error executing route');
    }
  };

  const handleSetMnemonic = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/set-mnemonic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mnemonic }),
    });

    if (res.ok) {
      alert('Mnemonic set successfully!');
    } else {
      alert('Error setting mnemonic');
    }
  };

  return (
    <div className={styles.container}>
      {/* ENTER MNEMONIC FORM
      <form onSubmit={handleSetMnemonic} className={styles.form}>
        <label>
          Mnemonic:
          <input
            type="text"
            value={mnemonic}
            placeholder="Enter your mnemonic here..."
            onChange={(e) => setMnemonic(e.target.value)}
          />
        </label>
        <button type="submit">Set Mnemonic</button>
      </form>
      */}
      <form onSubmit={handleFindRoute} className={styles.form}>
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
            <option value="noble-1">noble-1</option>
            <option value="cosmoshub-4">cosmoshub-4</option>
            <option value="osmosis-1">osmosis-1</option>
            {/* Add more options as needed */}
          </select>
        </label>
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
            <option value="celestia">celestia</option>
            <option value="cosmoshub-4">cosmoshub-4</option>
            <option value="osmosis-1">osmosis-1</option>
            {/* Add more options as needed */}
          </select>
        </label>
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
