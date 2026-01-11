import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kielo.app"),
  title: "Kielo - Master Finnish with AI-Powered Learning",
  description: "Learn Finnish with real news, practical conversations, and smart quizzes. Kielo turns language learning into an immersive, fun experience. Available on iOS and Android.",
  keywords: ["Finnish", "language learning", "AI", "Finland", "learn Finnish", "Finnish app", "language app"],
  authors: [{ name: "Kielo" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://kielo.app",
    siteName: "Kielo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Kielo hero preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Kielo" />
        <meta property="og:logo" content="https://kielo.app/logo.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="page-wrapper" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
