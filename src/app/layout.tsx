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
  title: "Kielo – Learn Finnish and Swedish for the place you live",
  description:
    "Learn Finnish or Swedish for the place you live: rehearse conversations out loud, read real news at your level and keep the words you are about to lose.",
  keywords: [
    "learn Finnish",
    "learn Swedish",
    "Finnish language app",
    "Swedish language app",
    "YKI test",
    "SFI",
    "language learning",
    "AI language tutor",
    "suomen kieli",
    "svenska",
  ],
  authors: [{ name: "Kielo" }],
  icons: {
    icon: [
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicons/site.webmanifest",
  itunes: {
    appId: "6749446603",
  },
  openGraph: {
    url: "https://kielo.app",
    siteName: "Kielo",
    locale: "en_US",
    type: "website",
    title: "Kielo – Learn Finnish and Swedish for the place you live",
    description:
      "Learn Finnish or Swedish for the place you live: rehearse conversations out loud, read real news at your level and keep the words you are about to lose.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kielo – Learn Finnish and Swedish for the place you live",
    description:
      "Learn Finnish or Swedish for the place you live: rehearse conversations out loud, read real news at your level and keep the words you are about to lose.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Script from "next/script";
import AppBanner from "@/components/AppBanner";

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
        <AppBanner />
      </body>
    </html>
  );
}
