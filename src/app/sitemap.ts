import type { MetadataRoute } from "next";
import { LANGUAGE_LIST, SITE_URL } from "@/lib/languages";
import { allPosts } from "@/lib/site-api";

// Rebuilt with the blog: an hour at most behind a newly published post.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/gdpr`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const perLanguage = await Promise.all(
    LANGUAGE_LIST.map(async (language) => {
      const posts = await allPosts(language.code);
      return [
        { url: `${SITE_URL}/${language.slug}`, changeFrequency: "weekly" as const, priority: 0.9 },
        { url: `${SITE_URL}/${language.slug}/blog`, changeFrequency: "daily" as const, priority: 0.8 },
        ...posts.map((post) => ({
          url: `${SITE_URL}/${language.slug}/blog/${post.slug}`,
          lastModified: post.updated_at,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ];
    }),
  );
  return [...fixed, ...perLanguage.flat()];
}
