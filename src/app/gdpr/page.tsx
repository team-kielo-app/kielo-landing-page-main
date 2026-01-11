import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Agreement - Kielo",
  description:
    "Kielo's Data Processing Agreement (DPA) governing the processing of personal data in compliance with Article 28 of the GDPR.",
};

export default function GDPRPage() {
  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className="bg-[#fcfaf2] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] text-center mb-4 tracking-tight">
              Data Processing Agreement
            </h1>
            <p className="text-center text-[#6B7280] mb-8">
              Last Updated: August 11, 2025
            </p>

            <div className="bg-[#E8E4F8] border border-[#898bdb]/30 rounded-xl p-4 mb-8">
              <p className="text-[#374151]">
                <strong className="text-[#898bdb]">
                  GDPR Article 28 Compliance:
                </strong>{" "}
                This Data Processing Agreement (DPA) governs the processing of
                personal data by Kielo App and complies with Article 28 of the
                General Data Protection Regulation (GDPR).
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                1. Parties and Definitions
              </h2>
              <div className="bg-[#F8F6EC] rounded-xl p-4 space-y-2 text-[#374151]">
                <p><strong>Data Controller:</strong> The User of Kielo App services</p>
                <p><strong>Data Processor:</strong> Kielo App</p>
                <p><strong>Sub-processors:</strong> Third-party service providers engaged by Kielo App</p>
                <p><strong>Processing:</strong> Any operation performed on personal data (GDPR Article 4(2))</p>
                <p><strong>Personal Data:</strong> Any information relating to an identifiable natural person (GDPR Article 4(1))</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                2. Scope and Duration
              </h2>
              <p className="text-[#374151]">
                This DPA applies to the processing of personal data by Kielo App
                on behalf of users in the context of providing language learning
                services. The agreement remains in effect for the duration of the
                service relationship.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                3. Nature and Purpose of Processing
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li><strong>Service Provision:</strong> Delivering language learning services and customer support</li>
                <li><strong>Personalization:</strong> Customizing learning experiences based on progress</li>
                <li><strong>Analytics:</strong> Improving service quality through anonymized usage analytics</li>
                <li><strong>Communication:</strong> Sending service-related notifications</li>
                <li><strong>Security:</strong> Ensuring platform security and preventing fraud</li>
              </ul>
            </section>

            <section className="mb-8 overflow-x-auto">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                4. Categories of Data Subjects and Personal Data
              </h2>
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-[#F8F6EC]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Personal Data</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-[#374151]">
                  <tr>
                    <td className="px-4 py-3 align-top">App Users</td>
                    <td className="px-4 py-3 align-top">Email, display name, profile picture, learning preferences</td>
                    <td className="px-4 py-3 align-top">Contract performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Learning Progress</td>
                    <td className="px-4 py-3 align-top">Lesson completion, vocabulary progress, daily streaks</td>
                    <td className="px-4 py-3 align-top">Contract performance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Conversation Practice</td>
                    <td className="px-4 py-3 align-top">Voice recordings (temporary), transcripts, performance scores</td>
                    <td className="px-4 py-3 align-top">Legitimate interests</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Technical Data</td>
                    <td className="px-4 py-3 align-top">Session tokens, error logs, security logs</td>
                    <td className="px-4 py-3 align-top">Legitimate interests</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                5. Security Measures
              </h2>
              <div className="bg-[#ecfdf5] border border-[#10b981]/30 rounded-xl p-4">
                <p className="mb-3 text-[#374151]">
                  <strong className="text-[#10b981]">Technical and Organizational Security:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                  <li><strong>Encryption:</strong> AES-256 at rest, TLS 1.3 in transit</li>
                  <li><strong>Access Controls:</strong> Multi-factor authentication, role-based access</li>
                  <li><strong>Network Security:</strong> Firewalls, intrusion detection</li>
                  <li><strong>Data Backup:</strong> Regular encrypted backups with geographic separation</li>
                  <li><strong>Incident Response:</strong> 24/7 monitoring and response procedures</li>
                </ul>
              </div>
              <p className="italic text-[#6B7280] text-sm mt-3">Reference: GDPR Article 32</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                6. Sub-processors
              </h2>
              <div className="bg-[#fef3c7] border border-[#f59e0b]/30 rounded-xl p-4 mb-4">
                <p className="text-[#374151] mb-3">
                  <strong className="text-[#d97706]">Current Sub-processors:</strong>
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#f59e0b]/30 border border-[#f59e0b]/30 rounded-lg overflow-hidden">
                    <thead className="bg-[#fef3c7]">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#92400e] uppercase">Sub-processor</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#92400e] uppercase">Service</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-[#92400e] uppercase">Location</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#fffbeb] divide-y divide-[#f59e0b]/30 text-[#374151]">
                      <tr>
                        <td className="px-3 py-2">Google Cloud Platform</td>
                        <td className="px-3 py-2">Cloud hosting</td>
                        <td className="px-3 py-2">EU (Europe-west1)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">AI Speech Service</td>
                        <td className="px-3 py-2">Voice recognition</td>
                        <td className="px-3 py-2">EU/EEA</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Email Provider</td>
                        <td className="px-3 py-2">Transactional emails</td>
                        <td className="px-3 py-2">EU</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[#92400e] text-sm mt-3">
                  We provide 30 days notice of any new sub-processors.
                </p>
              </div>
              <p className="italic text-[#6B7280] text-sm">Reference: GDPR Article 28(2)</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                7. Data Subject Rights
              </h2>
              <div className="bg-[#E8E4F8] border border-[#898bdb]/30 rounded-xl p-4 mb-4">
                <p className="text-[#374151]">
                  <strong className="text-[#898bdb]">GDPR Articles 15-22:</strong> We assist users with:
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li><strong>Access:</strong> User data exports within 30 days</li>
                <li><strong>Rectification:</strong> Update personal information anytime</li>
                <li><strong>Erasure:</strong> Account deletion with data purging</li>
                <li><strong>Portability:</strong> Machine-readable data export</li>
                <li><strong>Objection:</strong> Opt-out mechanisms for analytics</li>
              </ul>
              <p className="mt-4 text-[#374151]">
                Contact{" "}
                <a href="mailto:connect+privacy@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                  connect+privacy@kielo.app
                </a>{" "}
                for assistance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                8. Data Breach Notification
              </h2>
              <p className="mb-3 text-[#374151]">In case of a personal data breach, Kielo App will:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li>Notify affected users within 72 hours</li>
                <li>Provide details about the breach and affected data</li>
                <li>Describe measures taken to address the breach</li>
                <li>Assist with regulatory notifications as required</li>
              </ul>
              <p className="italic text-[#6B7280] text-sm mt-3">Reference: GDPR Article 33-34</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                9. Data Retention
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-[#374151]">
                <li><strong>Account Data:</strong> Until deletion + 30 days</li>
                <li><strong>Learning Progress:</strong> Until account deletion</li>
                <li><strong>Voice Recordings:</strong> 24-48 hours (processing only)</li>
                <li><strong>Conversation Data:</strong> 2 years or until account deletion</li>
                <li><strong>Support Tickets:</strong> 3 years for quality assurance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#374151] border-b border-gray-200 pb-3 mb-4">
                10. Contact Information
              </h2>
              <div className="bg-[#F8F6EC] rounded-xl p-4 space-y-2 text-[#374151]">
                <p>
                  <strong>Data Protection Officer:</strong>{" "}
                  <a href="mailto:connect+privacy@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+privacy@kielo.app
                  </a>
                </p>
                <p>
                  <strong>Legal Department:</strong>{" "}
                  <a href="mailto:connect+legal@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+legal@kielo.app
                  </a>
                </p>
                <p>
                  <strong>Security Team:</strong>{" "}
                  <a href="mailto:connect+security@kielo.app" className="text-[#898bdb] hover:text-[#7678c9] transition-colors">
                    connect+security@kielo.app
                  </a>
                </p>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="font-semibold mb-2">Response Times:</p>
                  <ul className="list-disc pl-6 space-y-1 text-[#6B7280]">
                    <li>GDPR requests: Within 30 days</li>
                    <li>Security incidents: Within 24 hours</li>
                    <li>General inquiries: Within 48 hours</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <p className="italic text-[#374151]">
                This Data Processing Agreement complies with GDPR Article 28 and
                forms a legally binding addendum to our Terms of Service.
              </p>
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
