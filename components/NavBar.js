// components/NavBar.js

import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    return (
        <div className={styles.header}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img
                    className={styles.logo}
                    src="/blorm-logo-white.png"
                    alt="blorm logo"
                />
                <span className={styles.logoText}>blorm</span>
            </Link>
            <nav style={{ marginLeft: 'auto', paddingRight: '1rem', alignItems: "center", display: "flex" }}>
                <Link href="/transfer" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw'}}>
                    BLORMSPACE
                </Link>
                <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw'}}>
                    PHILOSOPHY
                </Link>
                <Link href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw' }}>
                    CONTACT
                </Link>
            </nav>
        </div>
    );
}

export default NavBar;
