import SwapForm from '../../components/SwapForm';
import styles from '../../styles/Transfer.module.css';
import Link from 'next/link';

export default function Transfer() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>INTRODUCING BLORMSPACE</h1>
      <h2 className={styles.subHeading}>Decentralized Asset Courier </h2>
      <p className={styles.description}>
        BLORMSPACE facilitates seamless token transfers across 100+ tokens and networks. <br /> Tokens are routed through the fastest and most cost-effective path of bridges and swaps.
      </p>
      <div className="flex justify-evenly mx-auto w-4/5">
        <div className="w-7/20 h-1/4 p-4 bg-white rounded shadow">
          <Link href="/transfer/cosmos" className="block w-full px-4 py-2 text-center text-white bg-black rounded hover:bg-gray-800">
              Transfer Tokens Within<br/>Cosmos
          </Link>
        </div>
        <div className="w-7/20 h-1/4 p-4 bg-white rounded shadow">
          <Link href="/transfer/soltoevm" className="block w-full px-4 py-2 text-center text-white bg-black rounded hover:bg-gray-800">
              Transfer USDC Between<br/>Solana and Ethereum
          </Link>
        </div>
      </div>
    </div>
  );
}
