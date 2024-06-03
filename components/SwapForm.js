import { useState, useEffect } from 'react';
import Select from 'react-select';
import { SigningCosmosClient } from "@cosmjs/launchpad";
import { SkipRouter } from "@skip-router/core";
import styles from '../styles/SwapForm.module.css';
import { OfflineSigner, SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import customStyles from '../lib/reactSelectStyles';
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router';

export default function SwapForm() {
  const [keplr, setKeplr] = useState(null);
  const [sourceAssetDenom, setSourceAssetDenom] = useState(null);
  const [sourceAssetChainID, setSourceAssetChainID] = useState(null);
  const [destAssetDenom, setDestAssetDenom] = useState(null);
  const [destAssetChainID, setDestAssetChainID] = useState(null);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [amountInUSD, setAmountInUSD] = useState('');
  const [amountOutUSD, setAmountOutUSD] = useState('');
  const [amountBaseUSD, setAmountBaseUSD] = useState('');
  const [updatingFromAmountIn, setUpdatingFromAmountIn] = useState(false);
  const [updatingFromAmountOut, setUpdatingFromAmountOut] = useState(false);
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

  const router = useRouter();
  const isServer = typeof window === 'undefined';

  // Fetch chains and assets on page load
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
      console.log("Fetched Assets:", data);
      setAssets(data);
    };
    fetchAssets();
  }, []);

  // Set chain options once chains are fetched
  useEffect(() => {
    if (chains) {
      setChainOptions(chains.map(chain => ({
        value: chain.chainID,
        label: chain.chainName + " (" + chain.chainID + ")",
      })));
    }
  }, [chains]);

  // Format asset string for dropdown display
  const formatAssetPretty = (str) => {
    if (str.length <= 8) {
      return str;
    }
    if (str.includes('/')) {
      const [prefix, suffix] = str.split('/');
      return `${prefix}/${suffix.slice(0, 3)}...${suffix.slice(-5)}`;
    } else {
      return `${str.slice(0, 3)}...${str.slice(-5)}`;
    }
  };

  // Set asset options for source once assets are fetched for the dropdown
  useEffect(() => {
    if (sourceAssetChainID && assets && sourceAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsSource(assets.chain_to_assets_map[sourceAssetChainID.value].assets.filter(asset => asset.coingecko_id && asset.coingecko_id.trim() !== '').map(asset => {
        const formattedDenom = formatAssetPretty(asset.denom);
        const formattedSymbol = formatAssetPretty(asset.symbol);
        const formattedOriginDenom = formatAssetPretty(asset.origin_denom);

        return {
          value: asset.denom,
          label: `${asset.name} (${formattedSymbol} | ${formattedOriginDenom})`, // ${formattedDenom}
        };
      }));
      // console.log("Source Asset Options set:", assetOptionsSource);
    }
  }, [sourceAssetChainID, assets, setAssetOptionsSource]);

  // Set asset options for dest once assets are fetched for the dropdown
  useEffect(() => {
    if (destAssetChainID && assets && destAssetChainID.value in assets.chain_to_assets_map) {
      setAssetOptionsDest(assets.chain_to_assets_map[destAssetChainID.value].assets.map(asset => {
        const formattedDenom = formatAssetPretty(asset.denom);
        const formattedSymbol = formatAssetPretty(asset.symbol);
        const formattedOriginDenom = formatAssetPretty(asset.origin_denom);

        return {
          value: asset.denom,
          label: `${asset.name} (${formattedSymbol} | ${formattedOriginDenom})`, // ${formattedDenom}
        };
      }));
      // console.log("Destination Asset Options set:", assetOptionsdest);
    }
  }, [destAssetChainID, assets, setAssetOptionsDest]);

  const fetchPrice = async (coingeckoId) => {
    const url = '/api/coinGeckoPrice';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: coingeckoId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data[coingeckoId].usd;
    } else {
      throw new Error(data.error);
    }
  };
  
  // Fetch USD price for the source asset when amountIn or its denom/chainID changes
  useEffect(() => {
    const updateAmountInUSD = async () => {
      if (amountIn && sourceAssetDenom && sourceAssetChainID) {
        try {
          const assetInfo = assets.chain_to_assets_map[sourceAssetChainID.value].assets.find(
            (asset) => asset.denom === sourceAssetDenom.value
          );
          const coingeckoId = assetInfo.coingecko_id;
          const usdPrice = await fetchPrice(coingeckoId);
          setAmountInUSD(usdPrice);
          setAmountBaseUSD(amountIn * usdPrice);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    updateAmountInUSD();
  }, [amountIn, sourceAssetDenom, sourceAssetChainID]);
  
  // Fetch USD price for the destination asset when amountOut or its denom/chainID changes
  useEffect(() => {
    const updateAmountOutUSD = async () => {
      if (amountOut && destAssetDenom && destAssetChainID) {
        const assetInfo = assets.chain_to_assets_map[destAssetChainID.value].assets.find(
          (asset) => asset.denom === destAssetDenom.value
        );
        const coingeckoId = assetInfo.coingecko_id;
        try {
          const usdPrice = await fetchPrice(coingeckoId);
          setAmountOutUSD(usdPrice);
          setAmountBaseUSD(amountOut * usdPrice);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    updateAmountOutUSD();
  }, [amountOut, destAssetDenom, destAssetChainID]);
  
  // Convert amountIn to amountOut using the fetched USD prices
  useEffect(() => {
    if (sourceAssetDenom && sourceAssetChainID && amountInUSD && !updatingFromAmountOut) {
      if (amountIn && amountInUSD && amountOutUSD) {
        const convertedAmountOut = (amountIn * amountInUSD) / amountOutUSD;
        setUpdatingFromAmountIn(true);  // Set flag to indicate that amountOut is being updated
        setAmountOut(convertedAmountOut);
      }
    } 
  }, [amountInUSD, amountIn]);
  
  // Convert amountOut to amountIn using the fetched USD prices
  useEffect(() => {
    if (destAssetDenom && destAssetChainID && amountOutUSD && !updatingFromAmountIn) {
      if (amountOut && amountOutUSD && amountInUSD) {
        const convertedAmountIn = (amountOut * amountOutUSD) / amountInUSD;
        setUpdatingFromAmountOut(true);  // Set flag to indicate that amountIn is being updated
        setAmountIn(convertedAmountIn);
      }
    } 
  }, [amountOutUSD, amountOut]);
  
  // Reset the updating flags after state updates
  useEffect(() => {
    if (updatingFromAmountIn) {
      setUpdatingFromAmountIn(false);
    }
  }, [amountOut]);
  
  useEffect(() => {
    if (updatingFromAmountOut) {
      setUpdatingFromAmountOut(false);
    }
  }, [amountIn]);
  

  // Load Keplr on page load
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

  // Connect to Keplr
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

  // Find route between source and destination chains for token transfer
  // This function is called when the user submits the form and returns a route object
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

  // Fetch route messages once route is found
  // This function is called when the route state is updated and returns a list of messages
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

  // Execute route once route messages are fetched
  useEffect(() => {
    if (routeTxs) {
      handleSubmitRoute();
    }
  }, [routeTxs]);

  // Execute route once route messages are fetched
  // This function is called when the routeTxs state is updated and executes the route, it returns a transaction hash
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

  // Get the Cosmos address from Keplr
  async function getCosmosAddress(chainID) {
    const signer = await getKeplrSigner(chainID);
    const accounts = await signer.getAccounts();
    return accounts[0].address;
  }

  // Generate a human-readable route string for display / logging
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', marginLeft: '5px' }}>From:</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', backgroundColor: "#222222", padding: '20px', borderRadius: '30px', }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <input
                type="text"
                value={amountIn}
                placeholder="1000000"
                onChange={(e) => setAmountIn(e.target.value)}
                className={styles.amountInput}
              />
              {amountIn ? (
                <input
                  type="text"
                  value={amountBaseUSD + " USD"}
                  className={styles.amountUSDConversion}
                  readOnly
                />
              ) : null}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '1.5vh', marginBottom: '1.5vh' }}>
            <h1 style={{ flex: 1, fontSize: '1.5rem', fontWeight: 'bold', margin: 0, textAlign: 'left' }}>To:</h1>
            <span style={{ flex: 1, fontSize: '1.75rem', fontWeight: '800', textAlign: 'center' }}>
              ⇵
            </span>
            <div style={{ flex: 1 }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', backgroundColor: "#222222", padding: '20px', borderRadius: '30px', }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

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

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <input
                type="text"
                value={amountOut}
                placeholder="1000000"
                onChange={(e) => setAmountOut(e.target.value)}
                className={styles.amountInput}
              />
              {amountOut ? (
                <input
                  type="text"
                  value={amountBaseUSD + " USD"}
                  className={styles.amountUSDConversion}
                  readOnly
                />
              ) : null}
            </div>


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
