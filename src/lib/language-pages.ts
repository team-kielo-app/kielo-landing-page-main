import type { CSSProperties } from "react";
import { FINNISH_SCREENS, type AppScreen } from "./app-screens";
import type { LearningLanguageCode } from "./languages";

/**
 * What /finnish and /swedish say beyond the CMS-editable lines: the
 * situations, the screens, the facts and the FAQ. Describe what the app does
 * today; no counts, ratings or exam promises.
 */

export interface JobCard {
  /** What the learner says about their week. */
  push: string;
  answer: string;
  feature: string;
}

export interface ScreenRow {
  screen: AppScreen;
  title: string;
  body: string;
}

export interface LanguagePage {
  theme: { ink: string; tint: string; accentOnDark: string };
  mascot: { src: string; width: number; height: number };
  headline: string;
  closer: string;
  heroScreen: AppScreen;
  rows: ScreenRow[];
  more: ScreenRow[];
  jobs: JobCard[];
  facts: { title: string; body: string }[];
  faq: { q: string; a: string }[];
}

export const LANGUAGE_PAGES: Record<LearningLanguageCode, LanguagePage> = {
  fi: {
    theme: { ink: "#12407A", tint: "#EAF0F8", accentOnDark: "#9FC1EE" },
    mascot: { src: "/images/mascot/ermin-coffee.png", width: 718, height: 900 },
    headline: "Finnish for the life you already have here.",
    closer: "Aloitetaan. Let’s start.",
    heroScreen: FINNISH_SCREENS.speak,
    rows: [
      {
        screen: FINNISH_SCREENS.speak,
        title: "Say it out loud before you need to.",
        body: "Pick a scenario, talk it through with a partner who answers in Finnish at speaking speed, and get a note afterwards on what to fix.",
      },
      {
        screen: FINNISH_SCREENS.read,
        title: "Read Finnish news without a dictionary tab.",
        body: "News stories simplified to your level. Tap any word and the grammar is explained in the sentence you met it in.",
      },
      {
        screen: FINNISH_SCREENS.watch,
        title: "Hear Finnish the way it is spoken.",
        body: "Short clips with the vocabulary on the frame. Sound, glossary, save and next, all without leaving the video.",
      },
    ],
    more: [
      { screen: FINNISH_SCREENS.path, title: "A course underneath, so it adds up.", body: "" },
      { screen: FINNISH_SCREENS.review, title: "The words you’re about to lose come back.", body: "" },
      { screen: FINNISH_SCREENS.home, title: "Your day on one screen.", body: "" },
    ],
    jobs: [
      {
        push: "They switch to English the moment I start.",
        answer: "Rehearse the exchange in a scenario until it stays in Finnish the whole way through.",
        feature: "Speak",
      },
      {
        push: "There’s a letter from Kela on the table.",
        answer: "Practise reading real Finnish at your level, with every word one tap from an explanation.",
        feature: "Read",
      },
      {
        push: "I sit quiet at my partner’s family table.",
        answer: "Short clips of everyday speech help listening come first.",
        feature: "Watch",
      },
      {
        push: "My YKI test has a date.",
        answer: "A course underneath and a daily review of what you’re forgetting. Use it alongside your exam preparation.",
        feature: "Path and Review",
      },
    ],
    facts: [
      {
        title: "Two official languages",
        body: "Finland has two official languages, Finnish and Swedish. Most people speak Finnish at work and in daily life; Swedish is common on the west coast and in Åland.",
      },
      {
        title: "Written and spoken Finnish differ",
        body: "Kirjakieli, the written standard, and puhekieli, everyday speech, are noticeably different: minä in writing, often mä when people talk.",
      },
      {
        title: "The YKI test",
        body: "YKI is the National Certificate of Language Proficiency. Finnish citizenship asks for an intermediate level in Finnish or Swedish.",
      },
    ],
    faq: [
      {
        q: "Is Kielo a YKI course?",
        a: "No. Kielo is daily practice: reading, listening and speaking at your level. If you have a test date, use it alongside a course or a teacher.",
      },
      {
        q: "Is Finnish really that hard?",
        a: "It is different rather than impossible. Finnish has many word endings, but it has no grammatical gender and is written the way it sounds.",
      },
      {
        q: "What level do I need to start?",
        a: "None. You can start from your first words, and Kielo places you higher if you already know some Finnish.",
      },
      { q: "Is Kielo free?", a: "You can start for free. Kielo Plus removes the daily limits." },
    ],
  },
  sv: {
    theme: { ink: "#0B5394", tint: "#FFF6D8", accentOnDark: "#F3C318" },
    mascot: { src: "/images/mascot/ermin-work.png", width: 671, height: 957 },
    headline: "Swedish for the life you’re building in Sweden.",
    closer: "Nu kör vi. Let’s go.",
    heroScreen: FINNISH_SCREENS.speak,
    rows: [
      {
        screen: FINNISH_SCREENS.speak,
        title: "Say it out loud before you need to.",
        body: "Pick a scenario, talk it through with a partner who answers in Swedish at speaking speed, and get a note afterwards on what to fix.",
      },
      {
        screen: FINNISH_SCREENS.read,
        title: "Read Swedish news without a dictionary tab.",
        body: "News stories simplified to your level. Tap any word and the grammar is explained in the sentence you met it in.",
      },
      {
        screen: FINNISH_SCREENS.review,
        title: "The words you’re about to lose come back.",
        body: "Recognise a word first, then produce it from memory. The review queue is built from the words you actually met.",
      },
    ],
    more: [
      { screen: FINNISH_SCREENS.path, title: "A course underneath, so it adds up.", body: "" },
      { screen: FINNISH_SCREENS.home, title: "Your day on one screen.", body: "" },
    ],
    jobs: [
      {
        push: "Everyone answers me in English.",
        answer: "Rehearse the exchange in a scenario until it stays in Swedish the whole way through.",
        feature: "Speak",
      },
      {
        push: "There’s a letter from Försäkringskassan.",
        answer: "Practise reading real Swedish at your level, with every word one tap from an explanation.",
        feature: "Read",
      },
      {
        push: "I forget the words I learned last week.",
        answer: "A short daily review brings back the words you are about to lose, from the texts you read.",
        feature: "Review",
      },
      {
        push: "I’m doing SFI and want more practice between classes.",
        answer: "A course underneath and a daily review of what you’re forgetting. Use it alongside SFI, not instead of it.",
        feature: "Path and Review",
      },
    ],
    facts: [
      {
        title: "SFI is there for you",
        body: "Svenska för invandrare (SFI) is a Swedish course for adult newcomers, run by your municipality.",
      },
      {
        title: "En and ett",
        body: "Every Swedish noun is en or ett, and it changes the words around it: en bil, bilen; ett hus, huset. Learn each noun with its article.",
      },
      {
        title: "Swedish is spoken in Finland too",
        body: "Swedish is also an official language of Finland, used on the west and south coasts and in Åland.",
      },
    ],
    faq: [
      {
        q: "Is Kielo an SFI course?",
        a: "No. Kielo is daily practice: reading, listening and speaking at your level. It works alongside SFI or any other course.",
      },
      {
        q: "I live in Finland. Can I learn Swedish here?",
        a: "Yes. Pick Swedish as your learning language in the app, wherever you live.",
      },
      {
        q: "What level do I need to start?",
        a: "None. You can start from your first words, and Kielo places you higher if you already know some Swedish.",
      },
      { q: "Is Kielo free?", a: "You can start for free. Kielo Plus removes the daily limits." },
    ],
  },
};

/** The language's colours as CSS variables (--ink, --tint) for a page's root element. */
export function themeStyle(code: LearningLanguageCode): CSSProperties {
  const { ink, tint } = LANGUAGE_PAGES[code].theme;
  return { "--ink": ink, "--tint": tint } as CSSProperties;
}
