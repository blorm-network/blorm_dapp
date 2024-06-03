import { useState, useEffect } from 'react';
import Select from 'react-select';
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { SkipRouter } from "@skip-router/core";
import styles from '../styles/SwapForm.module.css';
import { OfflineSigner, SigningStargateClient, StargateClient } from '@cosmjs/stargate';

const customStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#222222',
    borderRadius: '30px',
    color: 'white',
    borderColor: '#222222',
    '&:hover': {
      borderColor: '#222222',
    },
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'white',
    textAlign: 'center',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'white',
    textAlign: 'center',
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#222222',
    borderRadius: '30px',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: 'white',
    textAlign: 'center',
    backgroundColor: state.isFocused ? '#444444' : '#222222',
    '&:hover': {
      backgroundColor: '#444444',
    },
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    justifyContent: 'center',
  }),
};

export default function SwapForm() {
  const [keplr, setKeplr] = useState(null);
  const [sourceAssetDenom, setSourceAssetDenom] = useState(null);
  const [sourceAssetChainID, setSourceAssetChainID] = useState(null);
  const [destAssetDenom, setDestAssetDenom] = useState(null);
  const [destAssetChainID, setDestAssetChainID] = useState(null);
  const [amountIn, setAmountIn] = useState('');
  const [route, setRoute] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [connected, setConnected] = useState(false);
  const [assets, setAssets] = useState([]);
  const [chains, setChains] = useState([]);
  const [isRawOutputVisible, setIsRawOutputVisible] = useState(false);
  const [assetOptionsSource, setAssetOptionsSource] = useState([]);
  const [assetOptionsDest, setAssetOptionsDest] = useState([]);
  const [chainOptions, setChainOptions] = useState([]);
  const [displayError, setDisplayError] = useState(null);
  const [routeTxs, setRouteTxs] = useState(null);
  const [keplrSigner, setKeplrSigner] = useState(null);

  useEffect(() => {
    const fetchChains = async () => {
      const skipClient = new SkipRouter();
      const resultChains = await skipClient.chains();
      // console.log("Fetched Chains:", resultChains);
      setChains(resultChains);
    };
    fetchChains();

    const fetchAssets = async () => {
      const res = await fetch('/api/chains/ibc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log("Fetched Assets:", data);
      setAssets(data);
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    if (chains) {
      setChainOptions(chains.map(chain => ({
        value: chain.chainID,
        label: chain.chainName + " (" + chain.chainID + ")",
      })));
    }
  }, [chains]);

  useEffect(() => {
    if (sourceAssetChainID && assets && sourceAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsSource(assets.chain_to_assets_map[sourceAssetChainID.value].assets.map(asset => ({
        value: asset.denom,
        label: asset.name + " (" + asset.denom + " / " + asset.symbol + " / " + asset.origin_denom + ")",
      })));
      // console.log("Source Asset Options set:", assetOptionsSource);
    }
  }, [sourceAssetChainID]);

  useEffect(() => {
    if (destAssetChainID && assets && destAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsDest(assets.chain_to_assets_map[destAssetChainID.value].assets.map(asset => ({
        value: asset.denom,
        label: asset.name + " (" + asset.denom + " / " + asset.symbol + " / " + asset.origin_denom + ")",
      })));
      // console.log("Source Asset Options set:", assetOptionsSource);
    }
  }, [destAssetChainID]);

  useEffect(() => {
    const loadKeplr = async () => {
      if (typeof window !== 'undefined') {
        while (!window.keplr) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        setKeplr(window.keplr);
      }
    };
    loadKeplr();
    window.addEventListener("keplr_keystorechange", () => {
      setDisplayError("Key store in Keplr is changed. You may need to refetch the account info.");
    });
  }, []);

  const connectKeplr = async () => {
    if (!keplr) {
      setDisplayError("Please install Keplr extension");
      return;
    }
    try {
      const chainIds = route?.requiredChainAddresses || [sourceAssetChainID?.value, destAssetChainID?.value].filter(Boolean);
      if (chainIds.length < 2) {
        setDisplayError("Please select both source and destination chains or find a route first.");
        return;
      }
      await keplr.enable(chainIds);
      const addressMap = {};
      for (let chainId of chainIds) {
        const offlineSigner = keplr.getOfflineSigner(chainId);
        if (!offlineSigner) {
          setDisplayError(`Failed to get offline signer for chain ${chainId}`);
          return;
        }
        const accounts = await offlineSigner.getAccounts();
        addressMap[chainId] = accounts[0].address;
      }
      setAddresses(addressMap);
      setConnected(true);
    } catch (error) {
      console.error(error);
      setDisplayError("Failed to connect to Keplr");
    }
  };

  const handleFindRoute = async (e) => {
    e.preventDefault();

    setDisplayError(null);
    setRoute(null);
    setRouteTxs(null);
    setAddresses(null);

    if (!sourceAssetDenom || !sourceAssetChainID || !destAssetDenom || !destAssetChainID || !amountIn) {
      setDisplayError('Please fill in all fields.');
      return;
    }
    // console.log('Finding route with these details:', { sourceAssetDenom, sourceAssetChainID, destAssetDenom, destAssetChainID, amountIn });
    const requestBody = {
      sourceAssetDenom: sourceAssetDenom.value,
      sourceAssetChainID: sourceAssetChainID.value,
      destAssetDenom: destAssetDenom.value,
      destAssetChainID: destAssetChainID.value,
      amountIn,
    };
    const res = await fetch('/api/route/ibc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (res.ok) {
      const data = await res.json();
      setRoute(data);
      setDisplayError(null);

    } else {
      const errorData = await res.json();
      setDisplayError('Error finding route: ' + errorData.error);
    }
  };

  useEffect(() => {
    // Runs once the route state has been updated
    if (route !== null) {
      handleGetRouteMessages();
    }
  }, [route]);

  const handleGetRouteMessages = async () => {
    if (!route) {
      setDisplayError('Please find a route first.');
      return;
    }
    if (!keplr) {
      setDisplayError("Please install Keplr extension");
      return;
    }

    await connectKeplr();

    try {
      const chainIds = route.requiredChainAddresses;
      await keplr.enable(chainIds);

      const addressMap = {};
      const signers = {};
      const chainData = {};
      for (let chainId of chainIds) {
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        addressMap[chainId] = accounts[0].address;
        signers[chainId] = offlineSigner; // Store the offline signer
        chainData[chainId] = {
          address: accounts[0].address,
          signer: offlineSigner
        };
      }

      // console.log(addressMap, signers);

      const routeWithAddresses = {
        ...route,
        addresses: {
          addressList: Object.values(addressMap),
        },
      };

      // console.log('Route object sending to API:', routeWithAddresses);

      const res = await fetch('/api/execute/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeWithAddresses),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Fetched messages:', data);
        setRouteTxs(data.txs);

      }
      else {
        const errorData = await res.json();
        setDisplayError('Error fetching route messages: ' + errorData.error);
        // console.log('Error fetching route messages:', errorData.error);
      }
    }
    catch (error) {
      setDisplayError('Error executing route: ' + error.message);
      // console.error(error);
    }
  };

  useEffect(() => {
    if (routeTxs) {
      handleSubmitRoute();
    }
  }, [routeTxs]);

  const handleSubmitRoute = async () => {
    if (!route) {
      setDisplayError('Please find a route first.');
      return;
    } else if (!routeTxs) {
      setDisplayError('Please request route messages first.');
      return;
    }

    const transformedAddresses = Object.entries(addresses).map(([chainID, address]) => ({ chainID, address }));
    // console.log(transformedAddresses);

    const skipClient = new SkipRouter({
      getCosmosSigner: getKeplrSigner,
    });

    if (!route || !transformedAddresses) {
      console.error('Route or addresses are undefined');
      setDisplayError('Route or addresses are undefined');
      return;
    }

    try {
      await skipClient.executeRoute({
        route: route,
        userAddresses: transformedAddresses,
        onTransactionBroadcast: (txInfo) => {
          console.log(`Transaction broadcasted with tx hash: ${txInfo.txHash} on chain: ${txInfo.chainID}`);
          setDisplayError(`Transaction broadcasted with tx hash: ${txInfo.txHash} on chain: ${txInfo.chainID}`);
        },
        onTransactionTracked: (txInfo) => {
          console.log(`Transaction tracked with tx hash: ${txInfo.txHash} on chain: ${txInfo.chainID}`);
          setDisplayError(`Transaction tracked with tx hash: ${txInfo.txHash} on chain: ${txInfo.chainID}`);
        },
        onTransactionCompleted: (chainID, txHash, status) => {
          console.log(`Route completed with tx hash: ${txHash} & status: ${status.state}`);
          setDisplayError(`Route completed with tx hash: ${txHash} & status: ${status.state}`);
        }
      });
    } catch (error) {
      setDisplayError('Error executing route: ' + error.message);
      console.error(error);
    }
  };

  async function getKeplrSigner(chainID) {
    // Check if Keplr is installed
    if (!window.keplr) {
      throw new Error("Keplr is not installed")
    }

    // Request access to the Keplr wallet
    await window.keplr.enable(chainID);

    // Get the signer from Keplr
    const offlineSigner = window.getOfflineSigner(chainID);
    return offlineSigner;
  }

  async function getCosmosAddress(chainID) {
    const signer = await getKeplrSigner(chainID);
    const accounts = await signer.getAccounts();
    return accounts[0].address;
  }

  const generateReadableRoute = (route) => {
    if (!route || !route.operations) return '';
    const truncateDenom = (denom) => {
      if (denom.length > 12) {
        return denom.slice(0, 7) + '...' + denom.slice(-5);
      }
      return denom;
    };
    const routeParts = route.operations.map((operation, index) => {
      const type = Object.keys(operation)[0];
      if (type === 'transfer') {
        const transfer = operation.transfer;
        return `Transfer ${truncateDenom(transfer.denomIn)} from ${transfer.fromChainID} to ${transfer.toChainID}`;
      } else if (type === 'swap') {
        const swap = operation.swap;
        return `Swap ${truncateDenom(swap.denomIn)} on ${swap.swapIn.swapVenue.name}`;
      }
    });
    return routeParts.join(' -> ');
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <form onSubmit={handleFindRoute} className={styles.form}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '10px', marginLeft: '5px' }}>From:</h1>
          <div style={{ backgroundColor: "#222222", padding: '20px', borderRadius: '30px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <div className={styles.formGroup}>
              <Select
                styles={customStyles}
                value={sourceAssetChainID}
                onChange={setSourceAssetChainID}
                options={chainOptions}
                placeholder="SELECT NETWORK"
              />
            </div>
            <div className={styles.formGroup}>
              <Select
                styles={customStyles}
                value={sourceAssetDenom}
                onChange={setSourceAssetDenom}
                options={assetOptionsSource}
                placeholder="SELECT TOKEN"
                isDisabled={!sourceAssetChainID}
              />
            </div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: '800', textAlign: 'center', width: "100%", alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            ⇵
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '10px', marginLeft: '5px' }}>To:</h1>
          <div style={{ backgroundColor: "#222222", padding: '20px', borderRadius: '30px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <div className={styles.formGroup}>
              <Select
                styles={customStyles}
                value={destAssetChainID}
                onChange={setDestAssetChainID}
                options={chainOptions}
                placeholder="SELECT NETWORK"
              />
            </div>
            <div className={styles.formGroup}>
              <Select
                styles={customStyles}
                value={destAssetDenom}
                onChange={setDestAssetDenom}
                options={assetOptionsDest}
                placeholder="SELECT TOKEN"
                isDisabled={!destAssetChainID}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Amount In:</label>
            <input
              type="text"
              value={amountIn}
              placeholder="1000000"
              onChange={(e) => setAmountIn(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button type="submit">Transfer Tokens</button>
        </form>
      </div>
      {(route || displayError || routeTxs) && (
        <div className={styles.right}>
          <div className={styles.rightInner}>
            {route && (
              <div className={styles.results}>
                <h2 className="text-black text-left font-bold text-2xl">We found a route! 🙌</h2>
                <br />
                <p>{generateReadableRoute(route)}</p>
                <button onClick={() => setIsRawOutputVisible(!isRawOutputVisible)}>
                  {isRawOutputVisible ? 'Hide' : 'Show'} Raw Output
                </button>
                <div className="w-2/10">
                  {isRawOutputVisible && (
                    <span className="text-xs word-break w-9/10">{JSON.stringify(route, null, 2)}</span>
                  )}
                </div>
              </div>
            )}
            <div className={styles.displayMessage}>
              <h2 className="text-black text-left font-bold text-2xl">Details</h2>
              {connected && addresses && (
                <div>
                  <h2 className="text-black text-left font-bold text-xl">Connected Addresses</h2>
                  <span className="text-black text-left text-xs break-words">{JSON.stringify(addresses, null, 2)}</span>
                </div>
              )}
              {routeTxs && (
                <div>
                  <h2 className="text-black text-left font-bold text-xl">Route</h2>
                  <div className="text-black text-left text-xs">
                    {routeTxs.map((tx, index) => (
                      <div key={index} className="tx">
                        {tx.cosmos_tx.path.map((item, index) => (
                          <div key={index}>
                            {item}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {displayError && (
                <div>
                  <h2 className="text-black text-left font-bold text-xl">Error</h2>
                  <span className={styles.errorMessage}>{displayError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
