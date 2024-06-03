import SwapForm from '../components/SwapForm';
import styles from '../styles/Home.module.css';
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div style={{ position: 'fixed', zIndex: '-1', opacity: '0.6', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className={styles.a}></div>
        <div id={styles.circle}></div>
      </div>
      <div className="h-screen w-screen bg-transparent flex flex-col items-center justify-start">
        <h1 className={styles.mainHeading}>FORM<br />BLOCKCHAIN<br />INFORMATION</h1>
        <h2 className={styles.subHeading}>THE BLORM HAS BEGUN </h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </div>
          <div className={styles.card}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </div>
          <div className={styles.card}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </div>
        </div>
      </div>

      <hr style={{ width: '50%', backgroundColor: 'grey' }} />

      <div className="h-screen w-screen bg-white flex flex-col items-center justify-evenly">
        <h1 className={styles.section2heading}>HOW BLORM WORKS</h1>
          <img src="/blormdiagram.png" style={{ height: 'auto', width: '30vw' }} alt="diagram" className={styles.diagram} />
      </div>
      
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'radial-gradient(circle, #1A3F2D 0%, #12231D 100%)'
      }}>
        <h1 className={styles.section3heading}>WELCOME TO<br/>BLORM</h1>
        <h1 className={styles.section3subheading}>JOIN THE WAITLIST TO BE ONE OF THE FIRST TO<br/>BLORM INFORMATION ONCHAIN.</h1>
        <input className={styles.waitlistInput} placeholder='EMAIL ADDRESS →'></input>
        <div className={styles.section3linkcontainer}>
          <span className={styles.section3link}>TWITTER</span>
        </div>
      </div>

    </div>
  );
}
