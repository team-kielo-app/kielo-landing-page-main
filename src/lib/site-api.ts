import { SITE_LANGUAGES, type LearningLanguageCode, type SiteLanguage } from "./languages";

/**
 * Posts and page copy from the Kielo CMS (cms.kielo.app/api/v3/public/site),
 * read on the server. Every fetch is tagged with its language; publishing in
 * admin calls /api/revalidate, which expires that tag, and pages also
 * refresh every REVALIDATE_SECONDS on their own.
 */

const API_ORIGIN = (process.env.SITE_API_ORIGIN || "https://cms.kielo.app").replace(/\/+$/, "");
const REVALIDATE_SECONDS = 600;

export const siteTag = (code: LearningLanguageCode) => `site:${code}`;

export interface PostSummary {
  post_id: string;
  slug: string;
  title: string;
  description: string;
  hero_image_url: string;
  hero_image_alt: string;
  level: string;
  category: string;
  tags: string[];
  published_at?: string;
  updated_at: string;
}

export interface Post extends PostSummary {
  body_markdown: string;
  created_at: string;
}

export interface PostPage {
  posts: PostSummary[];
  total: number;
}

export interface LandingCopy {
  metaTitle: string;
  metaDescription: string;
  heroLine: string;
  blogIntro: string;
}

async function get<T>(path: string, code: LearningLanguageCode, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(`${API_ORIGIN}/api/v3/public/site${path}`);
  url.searchParams.set("learning_language_code", code);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  try {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS, tags: [siteTag(code)] },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`CMS ${res.status} for ${url.pathname}`);
    const body = (await res.json()) as { data?: T };
    return body.data ?? null;
  } catch (error) {
    console.error("site-api:", error instanceof Error ? error.message : error);
    // At build time a page still renders without the CMS (built-in copy, no
    // posts) and refreshes within REVALIDATE_SECONDS. Later, a failed refresh
    // must throw: Next keeps serving the last good page instead of replacing
    // it with an empty blog or a 404 for a live post.
    if (process.env.NEXT_PHASE === "phase-production-build") return null;
    throw error;
  }
}

export async function listPosts(code: LearningLanguageCode, page = 1, perPage = 10): Promise<PostPage> {
  const data = await get<PostPage>("/posts", code, {
    limit: String(perPage),
    offset: String((page - 1) * perPage),
  });
  return { posts: data?.posts ?? [], total: data?.total ?? 0 };
}

/** Every published post, for the sitemap and static generation. */
export async function allPosts(code: LearningLanguageCode): Promise<PostSummary[]> {
  const data = await get<PostPage>("/posts", code, { limit: "all" });
  return data?.posts ?? [];
}

export async function getPost(code: LearningLanguageCode, slug: string): Promise<Post | null> {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  return get<Post>(`/posts/${slug}`, code);
}

/** The language's page copy: what admin set, else the built-in copy. */
export async function landingCopy(lang: SiteLanguage): Promise<LandingCopy> {
  const data = await get<{ settings?: Partial<Record<string, unknown>> }>("/landing", lang.code);
  const s = data?.settings ?? {};
  const text = (key: string, fallback: string) =>
    typeof s[key] === "string" && (s[key] as string).trim() ? (s[key] as string).trim() : fallback;
  return {
    metaTitle: text("meta_title", lang.metaTitle),
    metaDescription: text("meta_description", lang.metaDescription),
    heroLine: text("hero_line", lang.heroLine),
    blogIntro: text("blog_intro", lang.blogIntro),
  };
}

export const languages = SITE_LANGUAGES;
