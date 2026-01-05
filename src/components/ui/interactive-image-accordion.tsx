'use client';

import React, { useState } from 'react';

// --- Data for the image accordion ---
const accordionItems = [
    {
        id: 1,
        title: 'AI Conversation',
        imageUrl: 'images/speaking-carousel.jpg',
        bgColor: 'var(--color-kielo-purple)',
    },
    {
        id: 2,
        title: 'Real News',
        imageUrl: 'images/reading-carousel.jpg',
    },
    {
        id: 3,
        title: 'Smart Exercises',
        imageUrl: 'images/practicing-carousel.jpg',
    },
    {
        id: 4,
        title: 'Vocabulary Builder',
        imageUrl: 'images/vocabulary-carousel.jpg',
    },
    {
        id: 5,
        title: 'Progress Tracking',
        imageUrl: 'images/progress-carousel.jpg',
    },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
    item: {
        id: number;
        title: string;
        imageUrl: string;
        bgColor?: string;
    };
    isActive: boolean;
    onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
    return (
        <div
            className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer border-2 border-[var(--color-kielo-purple)] bg-[var(--color-kielo-purple)]
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
            onMouseEnter={onMouseEnter}
        >
            {/* Background Image */}
            <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/400x450/989bdb/ffffff?text=Image+Error';
                }}
            />


            {/* Caption Text */}
            <span
                className={`
          absolute text-[#fffefa] text-2xl font-bold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${isActive
                        ? 'bottom-2 left-1/2 -translate-x-1/2 rotate-0' // Active state: bottom-center, pushed lower
                        // Inactive state: centered vertically, rotated
                        : 'w-auto text-left top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90'
                    }
        `}
            >
                {item.title}
            </span>
        </div>
    );
};


// --- Main Component ---
export function LandingAccordionItem() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const [hasCompletedSequence, setHasCompletedSequence] = React.useState(false);
    const accumulatedScrollRef = React.useRef(0);
    const [isUserScrolling, setIsUserScrolling] = React.useState(false);
    const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        // Track when user scrolls to pause auto-flip
        const handleWheel = () => {
            setIsUserScrolling(true);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = setTimeout(() => {
                setIsUserScrolling(false);
            }, 2000);
        };

        window.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Auto-flip animation when idle
    React.useEffect(() => {
        if (!sectionRef.current || isUserScrolling) return;

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionInView = rect.top < windowHeight && rect.bottom > 0;

        // Only auto-flip if section is in view and not during manual scroll
        if (!sectionInView) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const totalItems = accordionItems.length;
                return (prev + 1) % totalItems; // Loop back to 0 after last item
            });
        }, 3000); // Change item every 3 seconds

        return () => clearInterval(interval);
    }, [isUserScrolling]);

    const handleItemHover = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div ref={sectionRef} className="bg-[#fcfaf2] font-sans flex justify-center" style={{ paddingTop: '0px' }}>
            <section className="w-full max-w-[1280px] px-8 py-12 md:py-24">
                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">

                    {/* Right Side: Text Content */}
                    <div className="w-full md:w-1/2 text-center md:text-right">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 leading-relaxed">
                            With real news, practical conversations, and smart quizzes, Kielo turns language learning into an immersive, fun experience.
                        </h2>
                    </div>

                    {/* Right Side: Image Accordion */}
                    <div className="w-full md:w-1/2">
                        <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
                            {accordionItems.map((item, index) => (
                                <AccordionItem
                                    key={item.id}
                                    item={item}
                                    isActive={index === activeIndex}
                                    onMouseEnter={() => handleItemHover(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

