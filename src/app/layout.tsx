import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fcfaf2",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kielo.app"),
  title: "Kielo - Master Finnish Fast with AI-Powered Conversations",
  description:
    "Kielo is the best way to learn Finnish and prepare for your YKI test using immersive AI conversations. Practice speaking, grammar, and vocabulary instantly.",
  keywords: [
    "Finnish",
    "language learning",
    "AI",
    "Finland",
    "learn Finnish",
    "Finnish language",
    "Finnish language learning",
    "Finnish language app",
    "Finnish app",
    "language app",
    "YKI test",
    "YKI",
    "suomenkieli",
    "suomi",
    "suomen kieli",
    "suomenkielitutkimus"
  ],
  authors: [{ name: "Kielo" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    url: "https://kielo.app",
    siteName: "Kielo",
    locale: "en_US",
    type: "website",
    title: "Kielo - Master Finnish Fast with AI-Powered Conversations",
    description:
      "Kielo is the best way to learn Finnish and prepare for your YKI test using immersive AI conversations. Practice speaking, grammar, and vocabulary instantly.",
    images: [
      {
        url: "/og-image-optimized.png",
        width: 1200,
        height: 630,
        alt: "Kielo App - Master Finnish Fast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kielo - Master Finnish Fast with AI-Powered Conversations",
    description:
      "Kielo is the best way to learn Finnish and prepare for your YKI test using immersive AI conversations. Practice speaking, grammar, and vocabulary instantly.",
    images: ["/og-image-optimized.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${bricolage.className} page-wrapper`} suppressHydrationWarning>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="698f95ac-bf4c-4ef1-8d44-6fa601b23fb1"
          type="text/javascript"
          strategy="beforeInteractive"
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-6GC078XYTF"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6GC078XYTF');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
