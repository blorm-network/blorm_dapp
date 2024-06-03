// pages/_app.tsx
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from 'react';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const wallets = useMemo(() => [
    new PhantomWalletAdapter()
  ], []);

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <Component {...pageProps} />
      <Footer></Footer>
    </WalletProvider>
  );
}

export default MyApp;
