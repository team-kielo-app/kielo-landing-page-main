import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import Footer from "@/components/Footer";
import PostCard from "@/components/site/PostCard";
import Flag from "@/components/site/Flag";
import { themeStyle } from "@/lib/language-pages";
import { LANGUAGE_LIST, type SiteLanguage } from "@/lib/languages";
import { landingCopy, listPosts } from "@/lib/site-api";

export const POSTS_PER_PAGE = 10;

/** One page of a language's blog: /<lang>/blog, then /<lang>/blog/page/<n>. */
export default async function BlogIndex({ language, page: requested }: { language: SiteLanguage; page: number }) {
  const [copy, { posts, total }] = await Promise.all([
    landingCopy(language),
    listPosts(language.code, requested, POSTS_PER_PAGE),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  if (requested > totalPages) notFound();
  const page = requested;
  const other = LANGUAGE_LIST.find((l) => l.code !== language.code)!;
  const pageHref = (n: number) => `/${language.slug}/blog${n > 1 ? `/page/${n}` : ""}`;

  return (
    <div style={themeStyle(language.code)} className="bg-[#fcfaf2]">
      <SiteHeader language={language} />
      <main className="min-h-screen bg-[#fcfaf2] py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl bg-white p-6 text-center shadow-sm sm:p-10">
            <Flag code={language.code} className="mx-auto mb-4 h-12 w-12" />
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-[#374151] sm:text-4xl">{language.blogTitle}</h1>
            <p className="mx-auto max-w-2xl text-[#6B7280]">{copy.blogIntro}</p>
            <Link
              href={`/${other.slug}/blog`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#fcfaf2] px-4 py-1.5 text-sm font-semibold text-[#374151] transition hover:bg-[#EFEAFF]"
            >
              <Flag code={other.code} className="h-5 w-5" />
              Learning {other.name}? Read the {other.name} blog
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.post_id} post={post} language={language} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-[#374151]">The first {language.name} posts are on their way.</p>
              <p className="mt-2 text-[#6B7280]">Meanwhile, the app has {language.name} lessons and news at your level.</p>
            </div>
          )}

          {totalPages > 1 ? (
            <nav aria-label="Blog pages" className="mt-12 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {page > 1 ? (
                  <Link href={pageHref(page - 1)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:border-[#898bdb] hover:text-[#898bdb]">
                    ← Newer
                  </Link>
                ) : null}
                <span className="px-3 text-sm text-[#6B7280]">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link href={pageHref(page + 1)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:border-[#898bdb] hover:text-[#898bdb]">
                    Older →
                  </Link>
                ) : null}
              </div>
              <p className="text-sm text-[#9CA3AF]">{total} posts</p>
            </nav>
          ) : null}
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
}
