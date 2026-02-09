"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface KieloNavProps {
  className?: string;
  navLinks?: { label: string; href: string }[];
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
  logoStyle?: React.CSSProperties;
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    style={{ margin: "0 24px" }}
    className="text-sm md:text-xl lg:text-2xl font-medium tracking-widest text-gray-600 transition-colors hover:text-gray-900"
  >
    {children}
  </Link>
);

const topBarVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

const middleBarVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomBarVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

export default function KieloNav({
  className = "",
  navLinks,
  logoSrc,
  logoAlt,
  logoClassName = "",
  logoStyle,
}: KieloNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();
  const barTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };
  const defaultNavLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "BLOG", href: "/blog" },
    { label: "DOWNLOAD", href: "/#download" },
  ];
  const resolvedNavLinks = navLinks ?? defaultNavLinks;
  const resolvedLogoSrc = logoSrc ?? "/logo.png";
  const resolvedLogoAlt = logoAlt ?? "Kielo Logo";
  const resolvedLogoStyle: React.CSSProperties = {
    maxHeight: "100px",
    height: "auto",
    width: "auto",
    ...(logoStyle ?? {}),
  };

  return (
    <header
      className={`z-30 flex w-full max-w-[1280px] items-center justify-between px-4 md:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/">
          <img
            src={resolvedLogoSrc}
            alt={resolvedLogoAlt}
            style={resolvedLogoStyle}
            className={`object-contain cursor-pointer${logoClassName ? ` ${logoClassName}` : ""
              }`}
          />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 md:space-x-8 lg:space-x-12">
        {resolvedNavLinks.map((link) => (
          <NavLink key={link.label} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-1.5 md:hidden p-2 z-50 relative"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <motion.span
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={topBarVariants}
          transition={barTransition}
          className="block h-0.5 w-6 bg-gray-800 origin-center"
        />
        <motion.span
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={middleBarVariants}
          transition={barTransition}
          className="block h-0.5 w-6 bg-gray-800"
        />
        <motion.span
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={bottomBarVariants}
          transition={barTransition}
          className="block h-0.5 w-6 bg-gray-800 origin-center"
        />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-[#fcfaf2] z-40 flex flex-col items-center justify-center space-y-8 md:hidden overflow-hidden"
          >
            {resolvedNavLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-2xl font-bold text-gray-800 hover:text-[var(--color-kielo-purple)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
