import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Kielo",
  description:
    "Read Kielo's terms of service for using our Finnish language learning application, including EU consumer rights and subscription terms.",
  openGraph: {
    title: "Terms of Service - Kielo",
    description:
      "Read Kielo's terms of service for using our Finnish language learning application, including EU consumer rights and subscription terms.",
    url: "https://kielo.app/terms",
    siteName: "Kielo",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className="bg-[#fcfaf2] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] text-center mb-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-center text-[#6B7280] mb-8">
              Last Updated: October 19, 2025
            </p>

            <div className="bg-[#E8E4F8] border border-[#898bdb]/30 rounded-xl p-4 mb-8">
              <p className="text-[#374151]">
                <strong className="text-[#898bdb]">EU Consumer Rights:</strong>{" "}
                These Terms comply with EU consumer protection laws. As an EU
                consumer, you have specific rights including a 14-day
                cooling-off period for purchases.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                1. Company Information
              </h2>
              <div className="bg-[#F8F6EC] rounded-xl p-4 space-y-2 text-[#374151]">
                <p><strong>Service Provider:</strong> Erminai Oy</p>
                <p><strong>Business ID:</strong> 3571359-6</p>
                <p><strong>EU Headquarters:</strong> Helsinki, Finland</p>
                <p>
                  <strong>Contact:</strong>{" "}
                  <a href="mailto:connect+legal@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+legal@kielo.app
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                2. Acceptance of Terms
              </h2>
              <p className="text-[#374151] mb-4">
                By accessing or using the Kielo mobile application ("App"), you
                agree to be bound by these Terms of Service. If you do not agree,
                you may not access or use our Service.
              </p>
              <p className="text-[#374151]">
                These Terms constitute a legally binding agreement between you
                and Kielo App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                3. Service Description
              </h2>
              <p className="mb-3 text-[#374151]">
                Kielo is a language learning mobile application that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Interactive language learning lessons and exercises</li>
                <li>AI-powered conversation practice</li>
                <li>Progress tracking and personalized learning paths</li>
                <li>Vocabulary building tools</li>
                <li>Reading practice with various content types</li>
                <li>Daily learning goals and streak tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                4. Eligibility
              </h2>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                4.1 Age Requirements
              </h3>
              <p className="text-[#374151] mb-4">
                You must be at least 13 years old to use our Service. Users
                between 13-18 years old must have parental or guardian consent.
              </p>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                4.2 Account Responsibility
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                5. Subscription and Payment (EU Consumer Rights)
              </h2>
              <div className="bg-[#ecfdf5] border border-[#10b981]/30 rounded-xl p-4 mb-6">
                <p className="text-[#374151]">
                  <strong className="text-[#10b981]">
                    EU Consumer Right of Withdrawal:
                  </strong>{" "}
                  You have the right to withdraw from your purchase within 14
                  days without giving any reason.
                </p>
              </div>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                5.1 Premium Features
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#374151] mb-4">
                <li>Unlimited AI conversation practice</li>
                <li>Advanced learning analytics</li>
                <li>Offline content access</li>
                <li>Ad-free experience</li>
              </ul>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                5.2 Subscription Terms
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Subscriptions are billed in advance on a recurring basis</li>
                <li>Auto-renewal unless cancelled</li>
                <li>30 days notice of any price increases</li>
                <li>All prices include applicable VAT</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-[#374151] mb-4">
                The Service and its content are owned by Kielo App and protected
                by international copyright, trademark, and other intellectual
                property laws.
              </p>
              <p className="text-[#374151]">
                You retain ownership of content you upload. By uploading, you
                grant us a license to use, store, and display such content for
                providing the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                7. AI Services
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Voice data is processed in real-time for speech recognition</li>
                <li>Third-party AI services are used for natural language processing</li>
                <li>Conversation transcripts are stored to improve service quality</li>
                <li>Voice recordings are not permanently stored</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                8. Limitation of Liability
              </h2>
              <div className="bg-[#fef3c7] border border-[#f59e0b]/30 rounded-xl p-4 mb-4">
                <p className="text-[#374151]">
                  <strong className="text-[#d97706]">EU Consumer Protection:</strong>{" "}
                  Nothing in these Terms limits your rights as a consumer under
                  applicable EU law.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>We provide the Service "as is" without warranties</li>
                <li>We are not liable for indirect or consequential damages</li>
                <li>Total liability is limited to amounts paid in the preceding 12 months</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                9. Account Termination
              </h2>
              <p className="mb-3 text-[#374151]">You may terminate your account at any time by:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#374151] mb-4">
                <li>Using the account deletion feature in the App</li>
                <li>Contacting our support team</li>
              </ul>
              <p className="text-[#374151]">
                We may terminate accounts that violate these Terms or engage in
                fraudulent activity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                10. Dispute Resolution
              </h2>
              <p className="mb-4 text-[#374151]">
                EU consumers can access the European Commission's Online Dispute
                Resolution platform:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#898bdb] hover:text-[#7678c9] transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-[#374151]">
                These Terms are governed by the laws of Finland and EU law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                11. Contact Information
              </h2>
              <div className="bg-[#F8F6EC] rounded-xl p-4 space-y-2 text-[#374151]">
                <p>
                  <strong>Legal Inquiries:</strong>{" "}
                  <a href="mailto:connect+legal@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+legal@kielo.app
                  </a>
                </p>
                <p>
                  <strong>General Support:</strong>{" "}
                  <a href="mailto:connect+support@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+support@kielo.app
                  </a>
                </p>
                <p>
                  <strong>Billing Issues:</strong>{" "}
                  <a href="mailto:connect+billing@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+billing@kielo.app
                  </a>
                </p>
                <p className="text-[#6B7280] text-sm mt-3">
                  Business Hours: Monday-Friday, 9:00 AM - 6:00 PM CET
                </p>
              </div>
            </section>

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
