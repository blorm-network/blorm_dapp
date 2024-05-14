import Link from 'next/link';
import styles from '../styles/NavBar.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function NavBar() {
return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
            <img src="/path/to/logo.png" alt="Logo" />
            <h1>blorm</h1>
        </div>
        <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <ConnectButton />
        </div>
    </nav>
);
}