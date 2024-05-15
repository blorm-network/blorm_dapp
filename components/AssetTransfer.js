import React, { useEffect, useState } from 'react';
import { SkipRouter } from "@skip-router/core";
import styles from '../styles/AssetTransfer.module.css';

const AssetTransfer = () => {
  const [chains, setChains] = useState([]);
  const [assets, setAssets] = useState([]);
  const [fromChain, setFromChain] = useState('');
  const [toChain, setToChain] = useState('');
  const [token, setToken] = useState('');
  const client = new SkipRouter();

  useEffect(() => {
    const fetchChainsAndAssets = async () => {
      try {
        const fetchedChains = await client.chains({
          includeEVM: true,
          includeSVM: true,
          includeTestnets: true,
        });
        setChains(fetchedChains);

        const fetchedAssets = await client.assets({
          includeEvmAssets: true,
          includeCW20Assets: true,
          includeSvmAssets: true,
        });
        setAssets(fetchedAssets);
        console.log(fetchedChains);
        console.log(fetchedAssets);
      } catch (error) {
        console.error("Error fetching chains or assets:", error);
      }
    };

    fetchChainsAndAssets();
  }, []);

  const handleTransfer = async () => {
    console.log(fromChain, toChain, token)
    const request = [
      {
        source_asset_denom: token.denom,
        source_asset_chain_id: "axelar-dojo-1",
        dest_chain_id: "cosmoshub-4"
      },
      {
        source_asset_denom: "uusdc",
        source_asset_chain_id: "axelar-dojo-1",
        dest_chain_id: "osmosis-1"
      }
    ];
    

    try {
      const recommendations = await client.recommendAssets(request);
      console.log(recommendations);
      alert("Transfer recommendations: " + JSON.stringify(recommendations));
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  const chainOptions = Array.isArray(chains) ? chains.map(chain => (
    <option key={chain.chainID} value={chain.chainID}>
      {chain.name}
    </option>
  )) : [];

  const assetOptions = Object.keys(assets).reduce((acc, chainID) => {
    const chainAssets = assets[chainID];
    const options = chainAssets.map(asset => (
      <option key={asset.symbol} value={asset.name}>
        {asset.name}
      </option>
    ));
    return acc.concat(options);
  }, []);

  return (
    <div className={styles.panel}>
      <h2>Asset Transfer</h2>
      <div className={styles.field}>
        <label className={styles.label}>From Chain:</label>
        <select className={styles.select} value={fromChain} onChange={(e) => setFromChain(e.target.value)}>
          <option value="">Select a chain</option>
          {chainOptions}
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>To Chain:</label>
        <select className={styles.select} value={toChain} onChange={(e) => setToChain(e.target.value)}>
          <option value="">Select a chain</option>
          {chainOptions}
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Token:</label>
        <select className={styles.select} value={token} onChange={(e) => setToken(e.target.value)}>
          <option value="">Select a token</option>
          {assetOptions}
        </select>
      </div>
      <button className={styles.button} onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default AssetTransfer;
