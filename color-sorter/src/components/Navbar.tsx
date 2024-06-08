import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link  href="/">Home</Link>
                </li>
                <li>
                    <Link href="/statistics">Statistics</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
