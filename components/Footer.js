// components/Footer.js

import Link from 'next/link';

const Footer = () => {
    return (
        <div style={{ position: 'absolute', top: 'calc(100% - 7.5vh)', width: '100%', height: '7.5vh', opacity: "0.8", color: 'white', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>BLORM © 2024</span>
        </div>
    );
}

export default Footer;
