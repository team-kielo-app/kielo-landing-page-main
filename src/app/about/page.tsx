import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Kielo",
  description:
    "Learn about Kielo, the AI-powered Finnish language learning app. Our mission is to make Finnish accessible and fun for everyone.",
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>About Kielo</h1>
          <div className={styles.content}>
            <p>
              We're two immigrants in Finland—one who passed the YKI test ✅,
              and one just starting their Finnish journey. Even after years of
              study, speaking Finnish in daily life is still a huge challenge.
              And when YLE shut down Kielokoulu, we felt the gap firsthand.
            </p>

            <p>
              That's why we're building Kielo 🚀: an AI-first, mobile-first
              language learning platform designed for people like us. We believe
              learning a language should be immersive, practical, and rooted in
              real life—not stuck in dusty textbooks.
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
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

