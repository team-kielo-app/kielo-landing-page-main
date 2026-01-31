import Link from "next/link";
import Image from "next/image";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Kielo",
  description:
    "Read articles about Finnish language learning, tips, cultural insights, and updates from the Kielo team.",
  openGraph: {
    title: "Blog - Kielo",
    description:
      "Read articles about Finnish language learning, tips, cultural insights, and updates from the Kielo team.",
    url: "https://kielo.app/blog",
    siteName: "Kielo",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
        <KieloNav />
      </div>
      <main className="bg-[#fcfaf2] min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] text-center mb-4 tracking-tight">
              Kielo Blog
            </h1>
            <p className="text-center text-[#6B7280] max-w-2xl mx-auto">
              Tips, guides, and stories to help you master the Finnish language.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-[#898bdb]/30 group flex flex-col h-full"
                >
                  {post.frontmatter.image && (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.image_alt || post.frontmatter.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <article className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-[#898bdb] mb-2 font-medium">
                      {post.frontmatter.date}
                    </div>
                    <h2 className="text-xl font-bold text-[#374151] mb-2 group-hover:text-[#898bdb] transition-colors line-clamp-2">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-[#6B7280] line-clamp-3 mb-4 flex-1">
                      {post.frontmatter.description}
                    </p>
                    <div className="mt-auto text-[#898bdb] font-medium text-sm flex items-center">
                      Read more <span className="ml-1">→</span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-2xl shadow-sm p-10 text-center">
                <p className="text-[#374151]">No posts found yet.</p>
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 text-center">
            <Link
              href="/"
              className="text-[#898bdb] hover:text-[#7678c9] font-medium inline-flex items-center transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
