import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogIndex from "@/components/site/BlogIndex";
import { LANGUAGE_LIST, languageBySlug, SITE_URL } from "@/lib/languages";
import { landingCopy } from "@/lib/site-api";

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGE_LIST.map((l) => ({ lang: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const language = languageBySlug((await params).lang);
  if (!language) return {};
  const copy = await landingCopy(language);
  const url = `${SITE_URL}/${language.slug}/blog`;
  return {
    title: `${language.blogTitle} - Kielo`,
    description: copy.blogIntro,
    alternates: { canonical: url },
    openGraph: { title: language.blogTitle, description: copy.blogIntro, url, siteName: "Kielo", type: "website", images: [`/${language.slug}/opengraph-image`] },
  };
}

export default async function BlogPage({ params }: Props) {
  const language = languageBySlug((await params).lang);
  if (!language) notFound();
  return <BlogIndex language={language} page={1} />;
}
