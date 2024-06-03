import SwapForm from '../components/SwapForm';
import styles from '../styles/Home.module.css';
import NavBar from '@/components/NavBar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    setMessage('SUBSCRIBING . . .');
    e.preventDefault();

    try {
        await setDoc(doc(db, 'mailing-list', uuid()), {
            email: email
        });
        setMessage('Subscribed successfully!');
    } catch (error) {
        console.log(error.message);
        setMessage('Failed to subscribe. Please try again.');
    }
};
  return (
    <div className={styles.container}>
      <div style={{ position: 'fixed', zIndex: '-1', opacity: '0.6', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.a}></div>
        <div id={styles.circle}></div>
      </div>
      <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", background: "transparent" }}>
        <NavBar />
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
        <h1 className={styles.section3heading}>WELCOME TO<br />BLORM</h1>
        <h1 className={styles.section3subheading}>JOIN THE WAITLIST TO BE ONE OF THE FIRST TO<br />BLORM INFORMATION ONCHAIN.</h1>
        <form onSubmit={handleSubscribe} className={styles.waitlistInput}>
          <input className={styles.waitlistInput} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='EMAIL ADDRESS →'></input>
          <button type="submit" className="hidden flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p>{message}</p>
        </form>
        <div className={styles.section3linkcontainer}>
          <span className={styles.section3link}>TWITTER</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
