import styles from './Features.module.css';

const features = [
    {
        id: 'speaking',
        title: 'PRACTICE SPEAKING WITH AI',
        emoji: '🤖',
        description: 'AI Robot',
        size: 'medium',
    },
    {
        id: 'exercises',
        title: 'LEVEL-BASED EXERCISES',
        emoji: '🐻‍❄️',
        description: 'Bear studying',
        size: 'large',
    },
    {
        id: 'news',
        title: 'LEARN FINNISH WITH REAL NEWS',
        emoji: '📰',
        description: 'Bear reading newspaper',
        size: 'large',
    },
    {
        id: 'vocabulary',
        title: 'SMART VOCABULARY BUILDER',
        emoji: '🤖',
        description: 'Robot assistant',
        size: 'medium',
    },
];

export default function Features() {
    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* News Feature - Large Left */}
                    <div className={`${styles.card} ${styles.cardLarge} ${styles.cardCream}`}>
                        <div className={styles.cardImage}>
                            <div className={styles.placeholder}>
                                <span className={styles.emoji}>🐻‍❄️📰</span>
                                <span className={styles.label}>Bear reading newspaper</span>
                            </div>
                        </div>
                        <h3 className={styles.cardTitle}>
                            LEARN<br />
                            FINNISH<br />
                            WITH<br />
                            REAL NEWS
                        </h3>
                    </div>

                    {/* Speaking Feature - Top Middle */}
                    <div className={`${styles.card} ${styles.cardSmall} ${styles.cardCream}`}>
                        <div className={styles.cardImageSmall}>
                            <div className={styles.placeholder}>
                                <span className={styles.emoji}>🤖</span>
                            </div>
                        </div>
                        <h3 className={styles.cardTitleRight}>
                            PRACTICE<br />
                            SPEAKING<br />
                            WITH AI
                        </h3>
                    </div>

                    {/* Exercises Feature - Top Right */}
                    <div className={`${styles.card} ${styles.cardMedium} ${styles.cardPurple}`}>
                        <h3 className={styles.cardTitleTop}>
                            LEVEL-BASED<br />
                            EXERCISES
                        </h3>
                        <div className={styles.cardImageBottom}>
                            <div className={styles.placeholderPurple}>
                                <span className={styles.emoji}>🐻‍❄️✏️</span>
                            </div>
                        </div>
                    </div>

                    {/* Vocabulary Feature - Bottom */}
                    <div className={`${styles.card} ${styles.cardSmall} ${styles.cardCream}`}>
                        <div className={styles.cardImageSmall}>
                            <div className={styles.placeholder}>
                                <span className={styles.emoji}>🤖💡</span>
                            </div>
                        </div>
                        <h3 className={styles.cardTitleRight}>
                            SMART<br />
                            VOCABULARY<br />
                            BUILDER
                        </h3>
                    </div>

                    {/* Extra card - Bear writing */}
                    <div className={`${styles.card} ${styles.cardMedium} ${styles.cardPurple}`}>
                        <div className={styles.cardImageFull}>
                            <div className={styles.placeholderPurple}>
                                <span className={styles.emoji}>🐻‍❄️📝</span>
                                <span className={styles.label}>Bear writing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative sparkles */}
            <span className={styles.sparkle1}>✦</span>
            <span className={styles.sparkle2}>✦</span>
            <span className={styles.sparkle3}>✧</span>
        </section>
    );
}
