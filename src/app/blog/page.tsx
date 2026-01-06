import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import styles from "../about/page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Kielo",
  description:
    "Read articles about Finnish language learning, tips, cultural insights, and updates from the Kielo team.",
};

export default function BlogPage() {
  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Blog</h1>
          <div className={styles.content}>
            <p className={styles.placeholder}>
              This is a placeholder for the Blog page.
            </p>
            <div className={styles.placeholderBox}>
              <span className={styles.emoji}>📝</span>
              <p>Blog posts coming soon...</p>
              <p className={styles.note}>
                Future MDX-based blog with Finnish learning tips, news, and
                updates.
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

