import Link from 'next/link';
import SwapForm from '../components/SwapForm';
import styles from '../styles/Transfer.module.css';
import Footer from '../components/Footer';

export default function Transfer() {
  return (
    <div className={styles.container}>
        <Link href="/" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3vh' }}>
          <img src="/blorm-logo-white.png" alt="BLORM LOGO" style={{ width: '5vw', height: 'auto' }} />
          <h1 className={styles.mainHeading}>BLORM</h1>
        </Link>

        <div className={styles.swapFormContainer}>
          <SwapForm />
        </div>
        
        <Footer/>
      </div>
  );
}
