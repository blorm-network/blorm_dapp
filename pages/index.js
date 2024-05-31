// pages/index.js

import SwapForm from '../components/SwapForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        blorm
      </header>
      <main className={styles.main}>
        <h1 className={styles.mainHeading}>Introducing Blorm</h1>
        <h2 className={styles.subHeading}>Decentralized Asset Courier </h2>
        <p className={styles.description}>
         Blorm facilitates seamless token transfers across 50+ chains.</p>
        <SwapForm />
      </main>
    </div>
  );
}