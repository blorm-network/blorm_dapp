// components/SolanaEthForm.js
import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Select from 'react-select';
import * as chains from 'viem/chains';
import styles from '../styles/SolanaEthForm.module.css';

const SolanaEthForm = () => {
  const { wallets } = useWallet();
  const [ethereumChains, setEthereumChains] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);
  const [amount, setAmount] = useState('');
  const [isSolToEth, setIsSolToEth] = useState(true);
  const [routeData, setRouteData] = useState(null);
  const [transferError, setTransferError] = useState(null);


  useEffect(() => {
    // Fetch Ethereum chains from viem
    const ethChains = Object.values(chains).map(chain => ({
      value: chain.id,
      label: chain.name
    }));
    setEthereumChains(ethChains);
  }, []);

  const handleTransfer = async () => {
    if (!selectedChain || !amount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      console.log('Selected Chain:', selectedChain);
      console.log('Amount:', amount);

      // Convert amount to the required format (e.g., Wei for Ethereum)
      const amountInWei = (parseFloat(amount) * 1e6).toString(); // Adjust conversion as needed

      const response = await fetch('/api/skip-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amountIn: amountInWei,
          sourceAssetDenom: isSolToEth ? 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' : '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC on Solana or Ethereum
          sourceAssetChainId: isSolToEth ? 'solana' : '1',
          destAssetDenom: isSolToEth ? '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC on Ethereum or Solana
          destAssetChainId: isSolToEth ? selectedChain.value.toString() : 'solana',
        }),
      });

      const routeResponse = await response.json();

      if (response.ok) {
        console.log('Route Data:', routeResponse);
        setRouteData(routeResponse);
        alert('Route found');
      } else {
        console.error('Transfer error:', routeResponse.error + ", " + routeResponse.message);
        setTransferError(routeResponse);
        console.log(routeResponse);
        alert('Transfer failed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Transfer failed');
    }
  };

  const handleSwapDirection = () => {
    setIsSolToEth(!isSolToEth);
    setSelectedChain(null); // Reset the selected chain
    setRouteData(null); // Reset the route data
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isSolToEth ? 'Solana to Ethereum Transfer' : 'Ethereum to Solana Transfer'}</h1>
      <button className={styles.connectButton} onClick={handleSwapDirection}>
        Swap to {isSolToEth ? 'Ethereum to Solana' : 'Solana to Ethereum'}
      </button>
      {transferError && (
        <div className="text-white m-5">
          <h2></h2>
          <p>Error {transferError.error}: {transferError.message}</p>
        </div>
      )}
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Amount:</label>
          <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Ethereum Chain:</label>
          <Select
            value={selectedChain}
            onChange={setSelectedChain}
            options={ethereumChains}
            isSearchable
            placeholder="Select a chain"
            className="w-full"
          />
        </div>
        <button className={styles.connectButton} onClick={handleTransfer}>Transfer</button>
      </div>
      {
        routeData && (
          <div className={styles.results}>
            <h2>Route Information</h2>
            <pre>{JSON.stringify(routeData, null, 2)}</pre>
          </div>
        )
      }
    </div >
  );
};

export default SolanaEthForm;
