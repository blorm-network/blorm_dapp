import { useIBCClient } from '../context/IBCClientContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const IBCTransferButton = ({ fromToken, toToken, amount }) => {
    const { client } = useIBCClient();

    const handleTransfer = async () => {
        if (!client) {
            console.log('IBC client is not initialized');
            return;
        }
        try {
            // Replace with actual IBC transfer logic
            // await client.transfer(fromToken, toToken, amount);
            console.log('Transfer successful');
        } catch (error) {
            console.error('Transfer failed:', error);
        }
    };

    return <button onClick={handleTransfer}>Swap</button>;
};
