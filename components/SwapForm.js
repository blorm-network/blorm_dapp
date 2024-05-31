// components/SwapForm.js

import { useState } from 'react';

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
    <div>
      <form onSubmit={handleSetMnemonic}>
        <label>
          Mnemonic:
          <input
            type="text"
            value={mnemonic}
            placeholder='Enter your mnemonic here...'
            onChange={(e) => setMnemonic(e.target.value)}
          />
        </label>
        <button type="submit">Set Mnemonic</button>
      </form>
      <form onSubmit={handleFindRoute}>
        <label>
          Source Asset Denom:
          <input
            type="text"
            value={sourceAssetDenom}
            placeholder='uusdc'
            onChange={(e) => setSourceAssetDenom(e.target.value)}
          />
        </label>
        <label>
          Source Asset Chain ID:
          <input
            type="text"
            value={sourceAssetChainID}
            placeholder='noble-1'
            onChange={(e) => setSourceAssetChainID(e.target.value)}
          />
        </label>
        <label>
          Destination Asset Denom:
          <input
            type="text"
            value={destAssetDenom}
            placeholder='utia'
            onChange={(e) => setDestAssetDenom(e.target.value)}
          />
        </label>
        <label>
          Destination Asset Chain ID:
          <input
            type="text"
            value={destAssetChainID}
            placeholder='celestia'
            onChange={(e) => setDestAssetChainID(e.target.value)}
          />
        </label>
        <label>
          Amount In:
          <input
            type="text"
            value={amountIn}
            placeholder='1000000'
            onChange={(e) => setAmountIn(e.target.value)}
          />
        </label>
        <button type="submit">Find Route</button>
      </form>
      {route && (
        <div>
          <h2>Route Details</h2>
          <pre>{JSON.stringify(route, null, 2)}</pre>
          <button onClick={handleExecuteRoute}>Execute Route</button>
        </div>
      )}
    </div>
  );
}
