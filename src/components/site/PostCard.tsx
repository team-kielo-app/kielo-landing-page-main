import Link from "next/link";
import type { PostSummary } from "@/lib/site-api";
import type { SiteLanguage } from "@/lib/languages";
import Flag from "./Flag";

export function formatPostDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(d);
}

/** A post in a list: image, level and category, title, description. */
export default function PostCard({ post, language }: { post: PostSummary; language: SiteLanguage }) {
  return (
    <Link
      href={`/${language.slug}/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E4E2EE] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D6D3E6] hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--tint,#ECEBFB)]">
        {post.hero_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.hero_image_url}
            alt={post.hero_image_alt || post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-3 bg-gradient-to-br from-[var(--tint,#ECEBFB)] to-[#fcfaf2]">
            <Flag code={language.code} className="h-14 w-14 drop-shadow" />
            <span className="text-2xl font-extrabold text-[var(--ink,#4F52B8)]">{language.greeting}</span>
          </div>
        )}
      </div>
      <article className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-[#6A7080]">
          <span>{formatPostDate(post.published_at)}</span>
          {post.level ? <span className="rounded-full bg-[var(--tint,#ECEBFB)] px-2 py-0.5 text-xs text-[var(--ink,#3B3E9A)]">{post.level}</span> : null}
          {post.category ? <span className="text-xs text-[#6B7280]">· {post.category}</span> : null}
        </div>
        <h3 className="mb-0 line-clamp-2 text-xl font-bold text-[#1F2330] transition-colors group-hover:text-[var(--ink,#4F52B8)]">
          {post.title}
        </h3>
        <p className="mb-4 mt-2 line-clamp-3 flex-1 text-[#4A5060]">{post.description}</p>
        <span className="text-sm font-semibold text-[var(--ink,#4F52B8)]">Read more →</span>
      </article>
    </Link>
  );
}
