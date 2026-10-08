import Link from "next/link";
import { listPosts, type PostSummary } from "@/lib/site-api";
import { LANGUAGE_PAGES } from "@/lib/language-pages";
import type { SiteLanguage } from "@/lib/languages";
import PostCard from "./PostCard";

/**
 * The newest posts from admin › Website. With one language, its posts and a
 * link to its blog; with several, the newest across them and a link to each.
 * Nothing at all when there are no posts.
 */
export default async function LatestPosts({ languages, count = 3 }: { languages: SiteLanguage[]; count?: number }) {
  const pages = await Promise.all(languages.map((l) => listPosts(l.code, 1, count)));
  const posts: { post: PostSummary; language: SiteLanguage }[] = pages
    .flatMap((page, i) => page.posts.map((post) => ({ post, language: languages[i] })))
    .sort((a, b) => (b.post.published_at ?? "").localeCompare(a.post.published_at ?? ""))
    .slice(0, count);
  if (posts.length === 0) return null;
  const single = languages.length === 1 ? languages[0] : undefined;
  return (
    <section id="blog" className="mx-auto flex w-full max-w-[1240px] scroll-mt-6 flex-col gap-6 px-4 pb-20 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="m-0 text-[clamp(30px,3.4vw,40px)] font-extrabold tracking-[-0.02em] text-[#1F2330]">
          {single ? `Learn ${single.name} on the blog` : "From the blog"}
        </h2>
        {single ? (
          <Link href={`/${single.slug}/blog`} className="font-bold text-[var(--ink,#4F52B8)] hover:underline">
            All {single.name} posts →
          </Link>
        ) : (
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => {
              const { ink, tint } = LANGUAGE_PAGES[l.code].theme;
              return (
                <Link
                  key={l.code}
                  href={`/${l.slug}/blog`}
                  className="rounded-full px-4 py-2.5 font-bold hover:opacity-90"
                  style={{ background: tint, color: ink }}
                >
                  {l.name} blog
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {posts.map(({ post, language }) => (
          <PostCard key={`${language.code}:${post.post_id}`} post={post} language={language} />
        ))}
      </div>
    </section>
  );
}
