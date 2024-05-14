import { createContext, useContext, useState, useEffect } from 'react';
import { useWalletClient } from 'wagmi';

const IBCClientContext = createContext(null);

export const IBCClientProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const { data: walletClient } = useWalletClient();

    useEffect(() => {
        if (walletClient) {
            // Initialize your IBC client here with the walletClient
            const newClient = {}; // Placeholder for client initialization
            setClient(newClient);
        }
    }, [walletClient]);

    return (
        <IBCClientContext.Provider value={{ client }}>
            {children}
        </IBCClientContext.Provider>
    );
};

export const useIBCClient = () => useContext(IBCClientContext);