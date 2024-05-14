import { useEffect } from 'react';
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const KeplrIntegration = () => {
  useEffect(() => {
    const connectKeplr = async () => {
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return;
      }

      await window.keplr.enable("cosmoshub-4");
      const offlineSigner = window.getOfflineSigner("cosmoshub-4");
      const accounts = await offlineSigner.getAccounts();
      const client = await SigningStargateClient.connectWithSigner(
        "https://rpc.cosmos.network",
        offlineSigner
      );

      console.log("Connected to Keplr:", accounts[0].address);
    };

    connectKeplr();
  }, []);

  return (
    <div>
      <h1>Keplr Wallet Integration</h1>
      <button onClick={connectKeplr}>Connect Keplr</button>
    </div>
  );
};

export default KeplrIntegration;
