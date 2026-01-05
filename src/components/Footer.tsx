import { SocialLinks } from '@/components/ui/social-links';

const socials = [
    {
        name: "Contact Us",
        image: "/email.png",
        handle: "connect@kielo.app",
        url: "mailto:connect@kielo.app"
    },
    {
        name: "TikTok",
        image: "/tiktok.png",
        handle: "@tiktok.kielo.app",
        url: "https://www.tiktok.com/@tiktok.kielo.app"
    },
    {
        name: "Instagram",
        image: "/instagram.png",
        handle: "@kielo.app",
        url: "https://instagram.com/kielo.app"
    },
    {
        name: "YouTube",
        image: "/youtube.png",
        handle: "@kielo_app",
        url: "https://youtube.com/@kielo_app"
    },
];

export default function Footer() {

    return (
        <footer className="w-full bg-[#fcfaf2] relative z-10 flex flex-col items-center px-4 md:px-8">
            <div className="w-full max-w-[1280px] py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                {/* Left Side: Mascot/QR Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <img
                        src="/images/scan-me.png"
                        alt="Scan Me"
                        className="w-full max-w-[400px] md:max-w-[500px] h-auto object-contain"
                    />
                </div>

                {/* Right Side: Links */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-8 md:gap-16">
                    <div className="w-full flex justify-center md:justify-start">
                        <SocialLinks socials={socials} className="justify-center md:justify-start gap-6 md:gap-10" />
                    </div>

                    <nav className="flex flex-col items-center md:items-start gap-3 md:gap-4">
                        <a href="/about" className="text-gray-600 hover:text-[var(--color-kielo-purple)] hover:underline font-bold text-xl md:text-3xl transition-colors duration-200">About Us</a>
                        <a href="/blog" className="text-gray-600 hover:text-[var(--color-kielo-purple)] hover:underline font-bold text-xl md:text-3xl transition-colors duration-200">Blog</a>
                    </nav>
                </div>
            </div>

            {/* Privacy Links - Centered */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pb-8 mt-12 md:mt-0 text-sm md:text-base font-medium text-gray-500">
                <a href="/privacy" className="hover:text-[var(--color-kielo-purple)] hover:underline transition-all duration-200">Privacy</a>
                <span className="opacity-50">•</span>
                <a href="/terms" className="hover:text-[var(--color-kielo-purple)] hover:underline transition-all duration-200">Terms</a>
                <span className="opacity-50">•</span>
                <a href="/gdpr" className="hover:text-[var(--color-kielo-purple)] hover:underline transition-all duration-200">Personal Data & GDPR</a>
            </div>

            {/* Copyright - Centered at bottom */}
            <p className="text-gray-500 text-sm opacity-60 pb-8 font-medium text-center">
                © {new Date().getFullYear()} Kielo. All rights reserved.
            </p>
        </footer>
    );
}
