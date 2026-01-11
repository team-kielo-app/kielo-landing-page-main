import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Kielo",
  description:
    "Read Kielo's privacy policy to understand how we collect, use, and protect your personal data in compliance with GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className="bg-[#fcfaf2] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] text-center mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-center text-[#6B7280] mb-8">
              Last Updated: October 24, 2025
            </p>

            <div className="bg-[#E8E4F8] border border-[#898bdb]/30 rounded-xl p-4 mb-8">
              <p className="text-[#374151]">
                <strong className="text-[#898bdb]">GDPR Compliance:</strong> This
                Privacy Policy complies with the General Data Protection
                Regulation (GDPR) and other applicable data protection laws.
                Your privacy rights are protected.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                1. About Kielo
              </h2>
              <div className="bg-[#F8F6EC] rounded-xl p-4 space-y-2 text-[#374151]">
                <p>
                  <strong>Service Provider:</strong> Erminai Oy
                </p>
                <p>
                  <strong>Business ID:</strong> 3571359-6
                </p>
                <p>
                  <strong>Location:</strong> Helsinki, Finland
                </p>
                <p>
                  <strong>Contact:</strong>{" "}
                  <a
                    href="mailto:connect+privacy@kielo.app"
                    className="text-[#898bdb] hover:text-[#7678c9] transition-colors"
                  >
                    connect+privacy@kielo.app
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                2. Data We Collect
              </h2>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Email address for account creation and communication</li>
                <li>Display name for personalization</li>
                <li>Profile picture (optional)</li>
                <li>Language learning preferences</li>
              </ul>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                2.2 Automatically Collected Data
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Device information (type, OS version)</li>
                <li>Usage data (lessons completed, time spent)</li>
                <li>Performance data for app improvement</li>
              </ul>
              <h3 className="text-lg font-semibold text-[#374151] mt-6 mb-3">
                2.3 Voice and Conversation Data
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Voice recordings processed in real-time for speech recognition</li>
                <li>Conversation transcripts for learning analytics</li>
                <li>Voice recordings are not permanently stored</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                3. How We Use Your Data
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Providing and improving our language learning services</li>
                <li>Personalizing your learning experience</li>
                <li>Sending important service updates</li>
                <li>Analyzing usage patterns to improve features</li>
                <li>Ensuring security and preventing fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                4. Legal Basis for Processing
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>
                  <strong>Contract Performance:</strong> To provide you with our
                  services
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> To improve our services
                  and ensure security
                </li>
                <li>
                  <strong>Consent:</strong> For marketing communications and
                  optional features
                </li>
                <li>
                  <strong>Legal Obligations:</strong> To comply with applicable
                  laws
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                5. Data Retention
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-[#F8F6EC]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">
                        Data Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">
                        Retention Period
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-[#374151]">
                    <tr>
                      <td className="px-4 py-3">Account Data</td>
                      <td className="px-4 py-3">Until account deletion + 30 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Learning Progress</td>
                      <td className="px-4 py-3">Until account deletion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Voice Recordings</td>
                      <td className="px-4 py-3">24-48 hours (processing only)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Conversation Transcripts</td>
                      <td className="px-4 py-3">2 years or until account deletion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                6. Your Rights (GDPR)
              </h2>
              <div className="bg-[#E8E4F8] border border-[#898bdb]/30 rounded-xl p-4 mb-4">
                <p className="text-[#374151]">
                  <strong className="text-[#898bdb]">EU Residents:</strong> You
                  have the following rights under GDPR:
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>
                  <strong>Right to Access:</strong> Request a copy of your data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Correct inaccurate data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your data
                </li>
                <li>
                  <strong>Right to Portability:</strong> Receive data in a portable format
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to certain processing
                </li>
                <li>
                  <strong>Right to Restrict:</strong> Limit how we use your data
                </li>
              </ul>
              <p className="mt-4 text-[#374151]">
                To exercise these rights, contact{" "}
                <a
                  href="mailto:connect+privacy@kielo.app"
                  className="text-[#898bdb] hover:text-[#7678c9] transition-colors"
                >
                  connect+privacy@kielo.app
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                7. Data Security
              </h2>
              <div className="bg-[#ecfdf5] border border-[#10b981]/30 rounded-xl p-4 text-[#374151]">
                <p className="mb-3">
                  <strong className="text-[#10b981]">Security Measures:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AES-256 encryption at rest</li>
                  <li>TLS 1.3 encryption in transit</li>
                  <li>Multi-factor authentication</li>
                  <li>Regular security audits</li>
                  <li>24/7 monitoring</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                8. Third-Party Services
              </h2>
              <p className="mb-3 text-[#374151]">We use the following service providers:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Google Cloud Platform (EU region) for hosting</li>
                <li>AI speech processing services for voice recognition</li>
                <li>Email service providers for communications</li>
              </ul>
              <p className="mt-3 text-[#6B7280] text-sm">
                All third-party providers are GDPR-compliant and have Data
                Processing Agreements in place.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-[#374151]">
                Your data is primarily stored in the EU. When transferred outside
                the EEA, we ensure adequate protection through Standard
                Contractual Clauses or other approved mechanisms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                10. Contact Us
              </h2>
              <div className="bg-[#F8F6EC] rounded-xl p-4 space-y-2 text-[#374151]">
                <p>
                  <strong>Privacy inquiries:</strong>{" "}
                  <a
                    href="mailto:connect+privacy@kielo.app"
                    className="text-[#898bdb] hover:text-[#7678c9] transition-colors"
                  >
                    connect+privacy@kielo.app
                  </a>
                </p>
                <p>
                  <strong>General support:</strong>{" "}
                  <a
                    href="mailto:connect+support@kielo.app"
                    className="text-[#898bdb] hover:text-[#7678c9] transition-colors"
                  >
                    connect+support@kielo.app
                  </a>
                </p>
                <p className="text-[#6B7280] text-sm mt-3">
                  Response time: Within 30 days for GDPR requests
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
