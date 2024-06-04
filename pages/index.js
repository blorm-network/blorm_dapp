import SwapForm from '../components/SwapForm';
import styles from '../styles/Home.module.css';
import NavBar from '@/components/NavBar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import Head from 'next/head';
import bg3 from '../public/background-3.png'
import Link from 'next/link';

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
  return (<>
    <Head>
      <title>BLORM</title>
    </Head>
    <div className={styles.container}>
      <div style={{ position: 'fixed', zIndex: '-1', opacity: '0.6', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.a}></div>
        <div id={styles.circle}></div>
      </div>
      <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", background: "transparent" }}>
        <NavBar />
        <div className={styles.title}>
          <h1 className={styles.mainHeading}>FORM</h1>
          <h1 className={styles.mainHeading}>BLOCKCHAIN</h1>
          <h1 className={styles.mainHeading}>INFORMATION</h1>
        </div>
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

      <div className={styles.section2}>
        <h1 className={styles.section2heading}>HOW BLORM WORKS</h1>
        <img src="/howblormworks.png" style={{ height: 'auto', width: '80vw' }} alt="diagram" className={styles.diagram} />
      </div>

      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: `url(${bg3.src})`,
        backgroundSize: 'cover',
      }}>
        <h1 className={styles.section3heading}>WELCOME TO<br />BLORM</h1>
        <h1 className={styles.section3subheading}>JOIN THE WAITLIST TO BE ONE OF THE FIRST TO<br />BLORM INFORMATION ONCHAIN.</h1>
        <form onSubmit={handleSubscribe} className={styles.waitlistInputMessage}>
          <input className={styles.waitlistInput} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='EMAIL ADDRESS →'></input>
          <button type="submit" className="hidden flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p>{message}</p>
        </form>
        <div className={styles.section3linkcontainer}>
          <Link href="https://x.com">
            <img
              className={styles.xlogo}
              src="/x-logo-white.png"
              alt="x logo"
            />
          </Link>
        </div>
        <hr></hr>
        <br></br>
        <Footer />
      </div>

    </div>
  </>
  );
}

