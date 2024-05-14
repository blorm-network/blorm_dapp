import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Hop } from '@hop-protocol/sdk';
import { Chain as hopChain } from '@hop-protocol/sdk';
import { send } from 'process';
import { FallbackProvider, JsonRpcProvider } from 'ethers'
import { useMemo } from 'react'
import { Chain, Client, Transport } from 'viem'
import { Config, useClient } from 'wagmi'
import { ethers } from 'ethers';

export function clientToProvider(client) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback') {
    const providers = (transport.transports).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId } = {}) {
  const client = useClient<Config>({ chainId })
  return useMemo(() => (client ? clientToProvider(client) : undefined), [client])
}
const HopProtocol = forwardRef(({ fromChain, toChain, token, amount, recipient }, ref) => {
    const provider = useEthersProvider();

    if (!provider) {
        return <div>Loading...</div>;
    }

    const account = provider.getSigner();
    
    const [transactionHash, setTransactionHash] = useState(null);


    const sendTransaction = useCallback(async () => {
        const hop = new Hop('mainnet', account);
        const bridge = hop.bridge('USDC');
        const { totalFee, estimatedReceived } = await bridge.getSendData(amount, 'ethereum', 'polygon');
        const needsApproval = await bridge.needsApproval(amount, 'ethereum');
        if (needsApproval) {
            const tx = await bridge.sendApproval(amount, 'ethereum', 'polygon');
            await tx.wait();
        }
        
        const tx = await bridge.send(amount, hopChain.Ethereum, hopChain.Polygon, {
            relayerFee: totalFee,
            recipient: recipient,
        });
        setTransactionHash(tx.hash);
    }, [fromChain, toChain, amount, account]);

    useEffect(() => {
        sendTransaction().catch(console.error);
    }, [sendTransaction]);

    useImperativeHandle(ref, () => ({
        sendTransaction,
    }));

    return (
        <div>
            <button onClick={sendTransaction}>Make Trade</button>
            {transactionHash ? (
                <p>Transaction hash: {transactionHash}</p>
            ) : (
                <p>Transaction is being processed...</p>
            )}
        </div>
    );
});

export default HopProtocol;