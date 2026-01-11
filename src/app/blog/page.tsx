import Link from "next/link";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
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
      <main className="bg-[#fcfaf2] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] text-center mb-8 tracking-tight">
              Blog
            </h1>

            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-6xl mb-4">📝</span>
              <p className="text-xl text-[#374151] mb-2">
                Blog posts coming soon...
              </p>
              <p className="text-sm text-[#6B7280] text-center max-w-md">
                Future MDX-based blog with Finnish learning tips, news, and
                updates.
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
