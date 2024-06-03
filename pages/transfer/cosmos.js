import Link from 'next/link';
import SwapForm from '../../components/SwapForm';
import styles from '../../styles/TransferCosmos.module.css';

export default function Cosmos() {
  return (
    <div className={styles.container}>
        <Link href="/" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3vh' }}>
          <img src="/blorm-logo-white.png" alt="BLORM LOGO" style={{ width: '10vw', height: 'auto' }} />
          <h1 className={styles.mainHeading}>BLORM</h1>
        </Link>
        <h2 className={styles.subHeading}></h2>
        <p className={styles.description}></p>
        <SwapForm />
      </div>
  );
}
