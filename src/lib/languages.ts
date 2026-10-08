/**
 * The languages kielo.app teaches, one page and one blog each
 * (/finnish, /swedish). Posts and the editable copy come from the Kielo CMS
 * (admin → Website, under the workspace language); what is here is the
 * built-in copy the CMS can override, and the facts that never change.
 */

export type LearningLanguageCode = "fi" | "sv";

export interface SiteLanguage {
  code: LearningLanguageCode;
  /** URL segment: kielo.app/finnish */
  slug: "finnish" | "swedish";
  name: string;
  flag: string;
  /** What the mascot says on the page. */
  greeting: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
  heroLine: string;
  blogTitle: string;
  blogIntro: string;
  keywords: string[];
  /** What a learner of this language is working towards, for page copy. */
  goals: string[];
  socials: SocialAccounts;
}

export interface SocialAccounts {
  tiktok: string;
  instagram: string;
  youtube: string;
}

export const SITE_LANGUAGES: Record<LearningLanguageCode, SiteLanguage> = {
  fi: {
    code: "fi",
    slug: "finnish",
    name: "Finnish",
    flag: "🇫🇮",
    greeting: "Moi!",
    country: "Finland",
    metaTitle: "Kielo – Learn Finnish for life in Finland",
    metaDescription:
      "Learn Finnish for life in Finland: rehearse conversations out loud, read real Finnish news at your level and review the words you are about to forget.",
    heroLine:
      "The Kela letter, the coffee room at work, your partner’s family table. Kielo is where you practise the Finnish they take, at your level, a few minutes a day.",
    blogTitle: "Learn Finnish: the Kielo blog",
    blogIntro: "Tips, guides, and stories to help you master the Finnish language.",
    keywords: [
      "learn Finnish",
      "Finnish language",
      "Finnish app",
      "YKI test",
      "YKI",
      "suomen kieli",
      "suomi",
      "Finnish for beginners",
    ],
    goals: ["YKI test", "work in Finland", "Finnish citizenship"],
    socials: {
      tiktok: "https://www.tiktok.com/@kielo.app.finland",
      instagram: "https://www.instagram.com/kielo.app",
      youtube: "https://www.youtube.com/@kielo_app/shorts",
    },
  },
  sv: {
    code: "sv",
    slug: "swedish",
    name: "Swedish",
    flag: "🇸🇪",
    greeting: "Hej!",
    country: "Sweden",
    metaTitle: "Kielo – Learn Swedish for life in Sweden",
    metaDescription:
      "Learn Swedish for life in Sweden: rehearse conversations out loud, read real Swedish news at your level and review the words you are about to forget.",
    heroLine:
      "The Försäkringskassan letter, fika with colleagues, small talk at pickup. Kielo is where you practise the Swedish they take, at your level, a few minutes a day.",
    blogTitle: "Learn Swedish: the Kielo blog",
    blogIntro: "Phrases, culture and grammar for life in Sweden, from fika to your first day at work.",
    keywords: [
      "learn Swedish",
      "Swedish language",
      "Swedish app",
      "SFI",
      "Swedish for immigrants",
      "svenska",
      "Swedish for beginners",
      "moving to Sweden",
    ],
    goals: ["SFI", "work in Sweden", "everyday life in Sweden"],
    socials: {
      tiktok: "https://www.tiktok.com/@kielo.app.swedish",
      instagram: "https://www.instagram.com/kielo.app.swedish",
      youtube: "https://www.youtube.com/@SwedishKielo/shorts",
    },
  },
};

export const LANGUAGE_LIST: SiteLanguage[] = [SITE_LANGUAGES.fi, SITE_LANGUAGES.sv];

export function languageBySlug(slug: string): SiteLanguage | undefined {
  return LANGUAGE_LIST.find((l) => l.slug === slug);
}

export const SITE_URL = "https://kielo.app";

export const STORE_LINKS = {
  appStore: "https://apps.apple.com/fi/app/kielo-learn-finnish-with-ai/id6749446603",
  googlePlay: "https://play.google.com/store/apps/details?id=com.kielo.app&hl=en",
};
