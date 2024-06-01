import styles from '../../styles/SolToEth.module.css';
import React from 'react';
import dynamic from 'next/dynamic';
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const SolanaEthForm = dynamic(() => import('../../components/SolanaEthForm'), { ssr: false });

export default function SolToEvm() {
  return (
    <div className={styles.container}>
        <h1 className={styles.mainHeading}>BLORMSPACE: SOL / EVM</h1>
        <h2 className={styles.subHeading}> Swap USDC between Solana and EVM Chains.</h2>
        <p className={styles.description}> </p>
        <SolanaEthForm />
        <h1 className={styles.mainHeading}>More Text</h1>
        <h2 className={styles.subHeading}>Here </h2>
        <p className={styles.description}>
          More text here
        </p>
      </div>
  );
}
