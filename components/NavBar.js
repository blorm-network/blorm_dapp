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
                <span className={styles.logoText}>B L O R M</span>
            </Link>
            <nav style={{ marginLeft: 'auto', paddingRight: '1rem', alignItems: "center", display: "flex" }}>
                <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw'}}>
                    PHILOSOPHY
                </Link>
                <Link href="/twitter" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw' }}>
                    TWITTER
                </Link>
                <Link href="/transfer" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', marginLeft: '2vw' }}>
                    <button style={{ color: 'white', width: '12vw', backgroundColor:'#5E9865', fontSize: '1rem', padding: '.5rem', boxSizing: 'border-box', borderRadius: '20px' }}>
                    BLORMSPACE
                    </button>
                </Link>
            </nav>
        </div>
    );
}

export default NavBar;
