// components/NavBar.js

import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    return (
        <div className={styles.header}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img
                    className={styles.logo}
                    src="blorm-logo-white.png"
                    alt="blorm logo"
                />
                <span className={styles.logoText}>blorm</span>
            </Link>
            <nav style={{ marginLeft: 'auto', paddingRight: '1rem', alignItems: "center", display: "flex" }}>
                <Link href="/About" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw'}}>
                    About
                </Link>
                <Link href="/Contact" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw' }}>
                    Contact
                </Link>
            </nav>
        </div>
    );
}

export default NavBar;
