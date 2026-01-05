'use client';

import React, { useEffect, useState } from 'react';

const SPARKLE_COUNT = 30; // Number of sparkles to generate

interface Sparkle {
    id: number;
    style: React.CSSProperties;
    char: string;
}

export const BackgroundSparkles = () => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        // Generate random sparkles only on the client side to match hydration
        const newSparkles = Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
            id: i,
            style: {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.3, // Random opacity between 0.3 and 0.8
                fontSize: `${Math.random() * 10 + 10}px`, // Random size between 10px and 20px
            },
            char: Math.random() > 0.5 ? '✦' : '✧',
        }));
        setSparkles(newSparkles);
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-10 h-full w-full">
            {sparkles.map((sparkle) => (
                <span
                    key={sparkle.id}
                    className="absolute text-gray-400 animate-pulse"
                    style={sparkle.style}
                >
                    {sparkle.char}
                </span>
            ))}
        </div>
    );
};
