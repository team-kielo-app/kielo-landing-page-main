import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import styles from "../about/page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Data & GDPR - Kielo",
  description:
    "Learn about how Kielo handles your personal data and complies with GDPR regulations.",
};

export default function GDPRPage() {
  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Personal Data & GDPR</h1>
          <div className={styles.content}>
            <p className={styles.placeholder}>
              This is a placeholder for the Personal Data & GDPR page.
            </p>
            <div className={styles.placeholderBox}>
              <span className={styles.emoji}>🛡️</span>
              <p>GDPR compliance content coming soon...</p>
              <p className={styles.note}>
                Include information about data protection, user rights under
                GDPR, data processing, and how to exercise your rights.
              </p>
            </div>
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

