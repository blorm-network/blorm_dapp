// pages/_app.tsx
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from 'react';
import NavBar from '../components/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const wallets = useMemo(() => [
    new PhantomWalletAdapter()
  ], []);

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <NavBar></NavBar>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
