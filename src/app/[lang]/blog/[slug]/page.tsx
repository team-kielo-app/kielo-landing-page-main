import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import Footer from "@/components/Footer";
import PostMarkdown from "@/components/site/PostMarkdown";
import { formatPostDate } from "@/components/site/PostCard";
import Flag from "@/components/site/Flag";
import { themeStyle } from "@/lib/language-pages";
import { LANGUAGE_LIST, languageBySlug, SITE_URL } from "@/lib/languages";
import { allPosts, getPost } from "@/lib/site-api";

type Props = { params: Promise<{ lang: string; slug: string }> };

// New posts render on first visit; publishing refreshes them (/api/revalidate).
export const dynamicParams = true;

export async function generateStaticParams() {
  const perLanguage = await Promise.all(
    LANGUAGE_LIST.map(async (l) => (await allPosts(l.code)).map((p) => ({ lang: l.slug, slug: p.slug }))),
  );
  return perLanguage.flat();
}

async function load(params: Props["params"]) {
  const { lang, slug } = await params;
  const language = languageBySlug(lang);
  if (!language) return null;
  const post = await getPost(language.code, slug);
  return post ? { language, post } : null;
}

const absolute = (url: string) => (url.startsWith("/") ? `${SITE_URL}${url}` : url);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await load(params);
  if (!found) return { title: "Post not found - Kielo" };
  const { language, post } = found;
  const url = `${SITE_URL}/${language.slug}/blog/${post.slug}`;
  return {
    title: `${post.title} - Kielo ${language.name} Blog`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: post.hero_image_url ? [absolute(post.hero_image_url)] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.hero_image_url ? [absolute(post.hero_image_url)] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const found = await load(params);
  if (!found) notFound();
  const { language, post } = found;
  const url = `${SITE_URL}/${language.slug}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    inLanguage: "en",
    about: `${language.name} language`,
    image: post.hero_image_url ? absolute(post.hero_image_url) : undefined,
    author: { "@type": "Organization", name: "Kielo", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Kielo", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  // A body that opens with the hero image or the title would show them twice.
  // Only the hero itself is dropped; a different opening image stays.
  const leadingImage = post.body_markdown.match(/^\s*!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)\s*/);
  const body = (
    leadingImage && post.hero_image_url && leadingImage[1] === post.hero_image_url
      ? post.body_markdown.slice(leadingImage[0].length)
      : post.body_markdown
  ).replace(/^\s*#\s+[^\n]+\n/, "");

  return (
    <div style={themeStyle(language.code)} className="bg-[#fcfaf2]">
      <SiteHeader language={language} />
      <main className="min-h-screen bg-[#fcfaf2] py-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
            <header className="mb-8 border-b border-gray-100 pb-8">
              <Link href={`/${language.slug}/blog`} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#898bdb] hover:text-[#7678c9]">
                ← <Flag code={language.code} className="h-4 w-4" /> {language.name} blog
              </Link>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#374151] sm:text-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
                <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
                {post.level ? <span className="rounded-full bg-[#EFEAFF] px-2 py-0.5 text-xs font-semibold text-[#3D2EAA]">{post.level}</span> : null}
                {post.category ? <span>· {post.category}</span> : null}
              </div>
            </header>
            {post.hero_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.hero_image_url} alt={post.hero_image_alt || post.title} className="mb-10 w-full rounded-xl" />
            ) : null}
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#374151] prose-p:text-[#374151] prose-a:text-[#898bdb] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#374151] prose-blockquote:rounded-r-lg prose-blockquote:border-l-[#898bdb] prose-blockquote:bg-[#E8E4F8] prose-blockquote:px-4 prose-blockquote:py-2 prose-img:rounded-xl prose-li:marker:text-[#898bdb] prose-hr:border-[#898bdb]/30">
              <PostMarkdown source={body} />
            </div>
            {post.tags.length > 0 ? (
              <ul className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-[#fcfaf2] px-3 py-1 text-sm text-[#6B7280]">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#EFEAFF] to-[#fcfaf2] p-8 text-center">
              <p className="mb-2 text-xl font-bold text-[#374151]">Practise this {language.name} with Kielo</p>
              <p className="mb-6 text-[#6B7280]">AI conversations, real news at your level and exercises built around your mistakes.</p>
              <Link href={`/${language.slug}#download`} className="inline-block rounded-full bg-[#898bdb] px-8 py-3 font-bold text-white shadow-md transition-colors hover:bg-[#7678c9] hover:shadow-lg">
                Download Kielo
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
}
