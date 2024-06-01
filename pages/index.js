import SwapForm from '../components/SwapForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
        <h1 className={styles.mainHeading}>Introducing Blorm</h1>
        <h2 className={styles.subHeading}>Decentralized Asset Courier </h2>
        <p className={styles.description}>
          Blorm facilitates seamless token transfers across 50+ chains.
        </p>
        <SwapForm />
        <h1 className={styles.mainHeading}>More Text</h1>
        <h2 className={styles.subHeading}>Here </h2>
        <p className={styles.description}>
          More text here
        </p>
      </div>
  );
}
