import { OG_SIZE, renderOgImage } from "@/lib/og-image";
import { LANGUAGE_LIST, languageBySlug } from "@/lib/languages";
import { LANGUAGE_PAGES } from "@/lib/language-pages";

export const alt = "Kielo: learn the language of the place you live";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return LANGUAGE_LIST.map((l) => ({ lang: l.slug }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const language = languageBySlug((await params).lang) ?? LANGUAGE_LIST[0];
  const page = LANGUAGE_PAGES[language.code];
  return renderOgImage({
    headline: page.headline,
    path: `kielo.app/${language.slug}`,
    flags: [language.code],
    tint: page.theme.tint,
    ink: page.theme.ink,
    mascot: page.mascot.src.replace(/^\//, ""),
  });
}
