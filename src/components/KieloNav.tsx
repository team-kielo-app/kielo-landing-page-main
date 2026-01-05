'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KieloNavProps {
    className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        style={{ margin: '0 24px' }}
        className="text-sm md:text-xl lg:text-2xl font-medium tracking-widest text-gray-600 transition-colors hover:text-gray-900"
    >
        {children}
    </a>
);

export default function KieloNav({ className = '' }: KieloNavProps) {
    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'ABOUT', href: '/about' },
        { label: 'BLOG', href: '/blog' },
        { label: 'DOWNLOAD', href: '/#download' },
    ];

    return (
        <header className={`z-30 flex w-full max-w-[1280px] items-center justify-between mt-10 py-4 ${className}`}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <a href="/">
                    <img src="/logo.png" alt="Kielo Logo" style={{ maxHeight: '160px', height: 'auto', width: 'auto' }} className="object-contain cursor-pointer" />
                </a>
            </motion.div>
            <div className="flex items-center space-x-4 md:space-x-8 lg:space-x-12">
                {navLinks.map((link) => (
                    <NavLink key={link.label} href={link.href}>
                        {link.label}
                    </NavLink>
                ))}
            </div>
        </header>
    );
}
