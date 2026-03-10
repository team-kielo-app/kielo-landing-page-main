import Link from "next/link";
import Image from "next/image";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";

const POSTS_PER_PAGE = 10;

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const allPosts = getBlogPosts();
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);

  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-10 flex items-center justify-center gap-2"
            >
              {/* Previous */}
              {safeCurrentPage > 1 ? (
                <Link
                  href={safeCurrentPage === 2 ? "/blog" : `/blog?page=${safeCurrentPage - 1}`}
                  className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-[#374151] hover:border-[#898bdb]/40 hover:text-[#898bdb] transition-colors font-medium text-sm"
                >
                  ← Prev
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg bg-gray-50 text-gray-300 border border-gray-100 font-medium text-sm cursor-not-allowed">
                  ← Prev
                </span>
              )}

              {/* Page numbers */}
              {(() => {
                const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  if (safeCurrentPage > 3) pages.push("ellipsis-start");
                  const start = Math.max(2, safeCurrentPage - 1);
                  const end = Math.min(totalPages - 1, safeCurrentPage + 1);
                  for (let i = start; i <= end; i++) pages.push(i);
                  if (safeCurrentPage < totalPages - 2) pages.push("ellipsis-end");
                  pages.push(totalPages);
                }

                return pages.map((page) => {
                  if (typeof page === "string") {
                    return (
                      <span
                        key={page}
                        className="px-2 py-2 text-gray-400 text-sm select-none"
                      >
                        …
                      </span>
                    );
                  }
                  const isActive = page === safeCurrentPage;
                  return (
                    <Link
                      key={page}
                      href={page === 1 ? "/blog" : `/blog?page=${page}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${isActive
                          ? "bg-[#898bdb] text-white shadow-sm"
                          : "bg-white shadow-sm border border-gray-200 text-[#374151] hover:border-[#898bdb]/40 hover:text-[#898bdb]"
                        }`}
                    >
                      {page}
                    </Link>
                  );
                });
              })()}

              {/* Next */}
              {safeCurrentPage < totalPages ? (
                <Link
                  href={`/blog?page=${safeCurrentPage + 1}`}
                  className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-[#374151] hover:border-[#898bdb]/40 hover:text-[#898bdb] transition-colors font-medium text-sm"
                >
                  Next →
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg bg-gray-50 text-gray-300 border border-gray-100 font-medium text-sm cursor-not-allowed">
                  Next →
                </span>
              )}
            </nav>
          )}

          {/* Post count info */}
          {totalPages > 1 && (
            <p className="mt-4 text-center text-sm text-[#6B7280]">
              Showing {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, allPosts.length)} of{" "}
              {allPosts.length} posts
            </p>
          )}

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
