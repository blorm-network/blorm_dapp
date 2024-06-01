import SwapForm from '../../components/SwapForm';
import styles from '../../styles/Transfer.module.css';

export default function Cosmos() {
  return (
    <div className={styles.container}>
        <h1 className={styles.mainHeading}>BLORMSPACE: COSMOS</h1>
        <h2 className={styles.subHeading}> Swap tokens between Cosmos supported chains.</h2>
        <p className={styles.description}> </p>
        <SwapForm />
      </div>
  );
}
