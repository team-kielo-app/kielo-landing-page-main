import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Kielo",
  description:
    "Kielo was made by two immigrants in Finland: an app to practise Finnish and Swedish for the place you live, at your level.",
  openGraph: {
    title: "About Us - Kielo",
    description:
      "Kielo was made by two immigrants in Finland: an app to practise Finnish and Swedish for the place you live, at your level.",
    url: "https://kielo.app/about",
    siteName: "Kielo",
    type: "website",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#fcfaf2]">
        <SiteHeader />
      </div>
      <main className="bg-[#fcfaf2] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] text-center mb-8 tracking-tight">
              About Kielo
            </h1>

            <div className="space-y-6 text-[#374151] leading-relaxed">
              <p>
                We're two immigrants in Finland—one who passed the YKI test ✅,
                and one just starting their Finnish journey. Even after years of
                study, speaking Finnish in daily life is still a huge challenge.
                And when YLE shut down Kielokoulu, we felt the gap firsthand.
              </p>

              <p>
                That's why we're building Kielo 🚀: an AI-first, mobile-first
                language learning platform designed for people like us. We
                believe learning a language should be immersive, practical, and
                rooted in real life—not stuck in dusty textbooks.
              </p>

              <p>
                With AI + human creativity working together, we bring you fresh
                content every day, smart exercises, and authentic practice that
                fits into your busy life. Finnish is just the beginning—Swedish
                and more languages are next.
              </p>

              <p>
                Our mission? To make language learning not only effective, but
                exciting—so you can truly live the language ❤️.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="text-[#898bdb] hover:text-[#7678c9] font-medium inline-flex items-center transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
