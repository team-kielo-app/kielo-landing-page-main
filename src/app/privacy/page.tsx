import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import styles from "../about/page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Kielo",
    description: "Read Kielo's privacy policy to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
    return (
        <>
            <div className="bg-[#fcfaf2] w-full flex justify-center p-8 md:p-12">
                <KieloNav />
            </div>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <div className={styles.content}>
                        <p className={styles.placeholder}>
                            This is a placeholder for the Privacy Policy.
                        </p>
                        <div className={styles.placeholderBox}>
                            <span className={styles.emoji}>🔒</span>
                            <p>Privacy policy content coming soon...</p>
                            <p className={styles.note}>
                                Include data collection practices, GDPR compliance, user rights, and contact information.
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
