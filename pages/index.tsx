import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Swap from '../components/Swap';
import AssetTransfer from '../components/AssetTransfer';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blorm</title>
        <meta name="description" content="Blorm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <div className={styles.interface}>
        {/* <Swap /> */}
        <AssetTransfer />
      </div>
    </div>
  );
};

export default Home;
