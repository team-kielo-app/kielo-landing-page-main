import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <span className={styles.logoText}>KIELO</span>
                    </div>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/blog" className={styles.navLink}>Blog</Link>
                    <Link href="#download" className={styles.navLink}>Download</Link>
                </nav>
            </div>
        </header>
    );
}
