import styles from './DownloadCTA.module.css';

export default function DownloadCTA() {
    return (
        <section id="download" className={styles.downloadCta}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    NOW AVAILABLE ON BOTH<br />
                    <span className={styles.highlight}>ANDROID AND iOS!</span>
                </h2>

                <div className={styles.badges}>
                    <a href="https://apps.apple.com/fi/app/kielo-learn-finnish-with-ai/id6749446603" aria-label="Download on App Store">
                        <img src="/app-store.svg" alt="Download on the App Store" className={styles.storeBadgeImage} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.kielo.app&hl=en" aria-label="Get it on Google Play">
                        <img src="/google-play.svg" alt="Get it on Google Play" className={styles.storeBadgeImage} />
                    </a>
                </div>


            </div>

            {/* Sparkle decorations */}
            <span className={styles.sparkle1}>✦</span>
            <span className={styles.sparkle2}>✧</span>
            <span className={styles.sparkle3}>✦</span>
            <span className={styles.sparkle4}>✦</span>
        </section>
    );
}
