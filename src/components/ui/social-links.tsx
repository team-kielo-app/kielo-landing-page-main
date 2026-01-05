"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Social {
    name: string
    image: string
    handle?: string
    url?: string
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
    socials: Social[]
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
    const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null)
    const [rotation, setRotation] = React.useState<number>(0)
    const [clicked, setClicked] = React.useState<boolean>(false)
    const [isMobile, setIsMobile] = React.useState<boolean>(false)

    // Check if mobile on mount and resize
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const animation = {
        scale: clicked ? [1, 1.3, 1] : 1,
        transition: { duration: 0.3 },
    }

    React.useEffect(() => {
        const handleClick = () => {
            setClicked(true)
            setTimeout(() => {
                setClicked(false)
            }, 200)
        }
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [clicked])

    return (
        <div
            className={cn("grid grid-cols-2 gap-8 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-10 md:gap-y-4", className)}
            {...props}
        >
            {socials.map((social, index) => {
                const Component = social.url ? 'a' : 'div';
                const linkProps = social.url ? {
                    href: social.url,
                    target: social.url.startsWith('mailto') ? undefined : "_blank",
                    rel: social.url.startsWith('mailto') ? undefined : "noopener noreferrer"
                } : {};

                return (
                    <div key={social.name}>
                        <Component
                            {...linkProps}
                            className={cn(
                                "group relative cursor-pointer py-2 transition-opacity duration-200 flex flex-col items-center justify-center",
                                hoveredSocial && hoveredSocial !== social.name
                                    ? "opacity-30"
                                    : "opacity-100"
                            )}
                            onMouseEnter={() => {
                                setHoveredSocial(social.name)
                                setRotation(Math.random() * 20 - 10)
                            }}
                            onMouseLeave={() => setHoveredSocial(null)}
                            onClick={() => {
                                setClicked(true)
                            }}
                        >
                            <span className="block text-2xl font-bold text-gray-600 group-hover:text-[var(--color-kielo-purple)] transition-colors duration-200 text-center">
                                {social.name}
                            </span>
                            {/* Mobile: Always show icon inline */}
                            {isMobile && (
                                <div className="flex flex-col items-center mt-3">
                                    <img
                                        src={social.image}
                                        alt={social.name}
                                        className="size-12"
                                    />
                                </div>
                            )}
                            {/* Desktop: Show on hover */}
                            {!isMobile && (
                                <AnimatePresence>
                                    {hoveredSocial === social.name && (
                                        <motion.div
                                            key="popup"
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none pb-4"
                                            initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {social.handle && (
                                                <span className="text-[var(--color-kielo-purple)] font-bold text-lg mb-2 whitespace-nowrap">
                                                    {social.handle}
                                                </span>
                                            )}
                                            <motion.img
                                                src={social.image}
                                                alt={social.name}
                                                className="size-20"
                                                animate={animation}
                                                style={{ rotate: rotation }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </Component>
                    </div>
                );
            })}
        </div>
    )
}

