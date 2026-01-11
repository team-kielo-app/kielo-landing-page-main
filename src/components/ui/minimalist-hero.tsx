"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextRotate } from "./text-rotate";
import KieloNav from "@/components/KieloNav";

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText?: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string | string[] | { prefix?: string; rotate: string[] };
    part2?: string | string[] | { prefix?: string; rotate: string[] };
    part3?: string | string[] | { prefix?: string; rotate: string[] };
    part4?: string | string[] | { prefix?: string; rotate: string[] };
  };
  socialLinks?: { icon: LucideIcon; href: string }[];
  locationText?: string;
  className?: string;
  showFooter?: boolean;
  height?: string;
  leftLogoSrc?: string;
}

// Helper component for social media icons
const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 transition-colors hover:text-gray-900"
  >
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks = [],
  locationText = "",
  className,
  showFooter = true,
  height,
  leftLogoSrc,
}: MinimalistHeroProps) => {
  const logoAltText = logoText ?? "Kielo Logo";
  const logoClassName = leftLogoSrc ? "h-12 md:h-auto" : "";
  const logoStyle = leftLogoSrc ? { maxHeight: "100px" } : undefined;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-start overflow-hidden font-sans",
        !height && "min-h-[80vh] xl:min-h-[60vh]",
        className
      )}
      style={height ? { height } : undefined}
    >
      {/* Header */}
      <KieloNav
        className="px-4 md:px-0"
        navLinks={navLinks}
        logoSrc={leftLogoSrc}
        logoAlt={logoAltText}
        logoClassName={logoClassName}
        logoStyle={logoStyle}
      />

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-[1280px] mt-8 grid-cols-1 items-center gap-12 px-8 xl:grid-cols-2 xl:gap-16">
        {/* Center Image with Circle */}
        <div className="relative order-1 flex h-auto items-center justify-center xl:order-2 overflow-visible py-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[250px] w-[250px] rounded-full bg-[var(--color-kielo-purple)] shadow-2xl md:h-[350px] md:w-[350px] xl:h-[400px] xl:w-[400px]"
          ></motion.div>
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-[220px] md:w-[300px] lg:w-[380px] xl:w-[500px] max-w-none object-contain"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
            }}
          />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-2 flex flex-col items-center xl:items-start text-center xl:order-1 xl:text-left"
        >
          <h1 className="text-3xl font-extrabold text-gray-700 md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl flex flex-col">
            {/* Part 1 */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 xl:justify-start">
              {typeof overlayText.part1 === "object" &&
                !Array.isArray(overlayText.part1) ? (
                <>
                  {overlayText.part1.prefix && (
                    <span className="mr-2">{overlayText.part1.prefix}</span>
                  )}
                  <TextRotate
                    texts={overlayText.part1.rotate}
                    mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={4000}
                  />
                </>
              ) : Array.isArray(overlayText.part1) ? (
                <TextRotate
                  texts={overlayText.part1}
                  mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[#FF8C42] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              ) : (
                <span className="whitespace-nowrap">{overlayText.part1}</span>
              )}
            </div>

            {/* Part 2 */}
            {overlayText.part2 && (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 xl:justify-start mt-2">
                {typeof overlayText.part2 === "object" &&
                  !Array.isArray(overlayText.part2) ? (
                  <>
                    {overlayText.part2.prefix && (
                      <span className="mr-2">{overlayText.part2.prefix}</span>
                    )}
                    <TextRotate
                      texts={overlayText.part2.rotate}
                      mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={4000}
                    />
                  </>
                ) : Array.isArray(overlayText.part2) ? (
                  <TextRotate
                    texts={overlayText.part2}
                    mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={4000}
                  />
                ) : (
                  <span className="whitespace-nowrap">{overlayText.part2}</span>
                )}
              </div>
            )}

            {/* Part 3 */}
            {overlayText.part3 && (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 xl:justify-start mt-2">
                {typeof overlayText.part3 === "object" &&
                  !Array.isArray(overlayText.part3) ? (
                  <>
                    {overlayText.part3.prefix && (
                      <span className="mr-2">{overlayText.part3.prefix}</span>
                    )}
                    <TextRotate
                      texts={overlayText.part3.rotate}
                      mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={4000}
                    />
                  </>
                ) : Array.isArray(overlayText.part3) ? (
                  <TextRotate
                    texts={overlayText.part3}
                    mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={4000}
                  />
                ) : (
                  <span className="whitespace-nowrap">{overlayText.part3}</span>
                )}
              </div>
            )}
            {/* Part 4 */}
            {overlayText.part4 && (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start mt-2">
                {typeof overlayText.part4 === "object" &&
                  !Array.isArray(overlayText.part4) ? (
                  <>
                    {overlayText.part4.prefix && (
                      <span className="mr-2">{overlayText.part4.prefix}</span>
                    )}
                    <TextRotate
                      texts={overlayText.part4.rotate}
                      mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={4000}
                    />
                  </>
                ) : Array.isArray(overlayText.part4) ? (
                  <TextRotate
                    texts={overlayText.part4}
                    mainClassName="text-white px-3 sm:px-3 md:px-4 bg-[var(--color-kielo-purple)] overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-xl"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={4000}
                  />
                ) : (
                  <span className="whitespace-nowrap">{overlayText.part4}</span>
                )}
              </div>
            )}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      {showFooter && (
        <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center space-x-4"
          >
            {socialLinks.map((link, index) => (
              <SocialIcon key={index} href={link.href} icon={link.icon} />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-sm font-medium text-gray-700"
          >
            {locationText}
          </motion.div>
        </footer>
      )}
    </div>
  );
};

