import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import styles from "../about/page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - Kielo",
    description: "Read Kielo's terms of service for using our Finnish language learning application.",
};

export default function TermsPage() {
    return (
        <>
            <div className="bg-[#fcfaf2] w-full flex justify-center p-8 md:p-12">
                <KieloNav />
            </div>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <div className={styles.content}>
                        <p className={styles.placeholder}>
                            This is a placeholder for the Terms of Service.
                        </p>
                        <div className={styles.placeholderBox}>
                            <span className={styles.emoji}>📋</span>
                            <p>Terms of service coming soon...</p>
                            <p className={styles.note}>
                                Include usage terms, license agreement, limitations, and legal information.
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
