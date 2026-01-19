'use client';

import { useRef } from 'react';
import styles from './TikTokVideos.module.css';

interface VideoItem {
    src: string;
    poster?: string;
}

// Replace these with your actual TikTok video URLs (mp4 format)
const videos: VideoItem[] = [
    { src: 'https://storage.googleapis.com/kielo-social-media/social_media_daily_vocab_fi_metsa%CC%88.mp4' },
    { src: 'https://storage.googleapis.com/kielo-social-media/social_media_daily_vocab_fi_yleensa%CC%88.mp4' },
    { src: 'https://storage.googleapis.com/kielo-social-media/social_media_daily_vocab_fi_ta%CC%88rkea%CC%88.mp4' },
];

export default function TikTokVideos() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const handleMouseEnter = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            // First try playing with sound
            video.muted = false;
            video.play().catch(() => {
                // If browser blocks unmuted play, play muted as fallback
                video.muted = true;
                video.play().catch(err => console.error("Video play failed:", err));
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.muted = true; // Reset to muted for next hover
        }
    };

    return (
        <section className={styles.tiktokSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    SEE KIELO IN ACTION
                </h2>

                <div className={styles.videosGrid}>
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className={styles.videoCard}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <div className={styles.videoWrapper}>
                                <video
                                    ref={(el) => { videoRefs.current[index] = el; }}
                                    className={styles.video}
                                    src={video.src}
                                    poster={video.poster}
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className={styles.playOverlay}>
                                    <svg
                                        className={styles.playIcon}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sparkle decorations */}
            <span className={styles.sparkle1}>✦</span>
            <span className={styles.sparkle2}>✧</span>
            <span className={styles.sparkle3}>✦</span>
        </section>
    );
}
