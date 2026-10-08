import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import BlogIndex, { POSTS_PER_PAGE } from "@/components/site/BlogIndex";
import { LANGUAGE_LIST, languageBySlug, SITE_URL } from "@/lib/languages";
import { landingCopy, listPosts } from "@/lib/site-api";

type Props = { params: Promise<{ lang: string; n: string }> };

// Pages added by new posts render on first visit, like new posts do.
export const dynamicParams = true;

export async function generateStaticParams() {
  const perLanguage = await Promise.all(
    LANGUAGE_LIST.map(async (l) => {
      const { total } = await listPosts(l.code, 1, 1);
      const pages = Math.ceil(total / POSTS_PER_PAGE);
      return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ lang: l.slug, n: String(i + 2) }));
    }),
  );
  return perLanguage.flat();
}

function pageNumber(n: string) {
  return /^[1-9][0-9]*$/.test(n) ? Number(n) : NaN;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, n } = await params;
  const language = languageBySlug(lang);
  const page = pageNumber(n);
  if (!language || !(page > 1)) return {};
  const copy = await landingCopy(language);
  const url = `${SITE_URL}/${language.slug}/blog/page/${page}`;
  return {
    title: `${language.blogTitle}, page ${page} - Kielo`,
    description: copy.blogIntro,
    alternates: { canonical: url },
    openGraph: { title: `${language.blogTitle}, page ${page}`, description: copy.blogIntro, url, siteName: "Kielo", type: "website", images: [`/${language.slug}/opengraph-image`] },
  };
}

export default async function BlogPageN({ params }: Props) {
  const { lang, n } = await params;
  const language = languageBySlug(lang);
  const page = pageNumber(n);
  if (!language || Number.isNaN(page)) notFound();
  if (page === 1) permanentRedirect(`/${language.slug}/blog`);
  return <BlogIndex language={language} page={page} />;
}
