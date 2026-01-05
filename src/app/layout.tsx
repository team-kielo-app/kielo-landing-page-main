import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kielo - Master Finnish with AI-Powered Learning",
  description: "Learn Finnish with real news, practical conversations, and smart quizzes. Kielo turns language learning into an immersive, fun experience. Available on iOS and Android.",
  keywords: ["Finnish", "language learning", "AI", "Finland", "learn Finnish", "Finnish app", "language app"],
  authors: [{ name: "Kielo" }],
  openGraph: {
    title: "Kielo - Master Finnish with AI-Powered Learning",
    description: "Learn Finnish with real news, practical conversations, and smart quizzes. Available on iOS and Android.",
    url: "https://kielo.app",
    siteName: "Kielo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kielo - Master Finnish with AI-Powered Learning",
    description: "Learn Finnish with real news, practical conversations, and smart quizzes.",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="page-wrapper">
        {children}
      </body>
    </html>
  );
}
