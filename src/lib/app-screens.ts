/**
 * Real screenshots of the app, with a note saying exactly what is on each.
 * No mock-ups and no live data: when the app changes, replace the image and
 * its caption together.
 */

export type ScreenKey = "speak" | "read" | "watch" | "review" | "path" | "home";

export interface AppScreen {
  key: ScreenKey;
  tag: string;
  /** Dot colour next to the tag, the colour the feature uses in the app. */
  dot: string;
  src: string;
  alt: string;
  caption: string;
  /** Language the screenshot was taken in. */
  shownIn: "fi" | "sv";
}

export const FINNISH_SCREENS: Record<ScreenKey, AppScreen> = {
  speak: {
    key: "speak",
    tag: "Speak",
    dot: "#0EA5A8",
    src: "/images/app/speak-fi.png",
    alt: "Kielo conversation scenario: Musiikista puhuminen, A1, 3 minutes",
    caption: "Musiikista puhuminen · A1 · 3 min · culture, leisure: one of the scenarios in the app.",
    shownIn: "fi",
  },
  read: {
    key: "read",
    tag: "Read",
    dot: "#C2185B",
    src: "/images/app/read-fi.png",
    alt: "Kielo reader showing a Finnish news story with the passive voice explained",
    caption: "seurataan → passiivi, A2: explained inside a news story, not in a table.",
    shownIn: "fi",
  },
  watch: {
    key: "watch",
    tag: "Watch",
    dot: "#1F2330",
    src: "/images/app/watch-fi.png",
    alt: "KieloTV video with a Finnish word glossed on the frame",
    caption: "tunnelma (noun) → atmosphere, glossed on the frame it was spoken in.",
    shownIn: "fi",
  },
  review: {
    key: "review",
    tag: "Review",
    dot: "#6C5CE7",
    src: "/images/app/review-fi.png",
    alt: "Kielo review question on the Finnish verb hukkua with four options",
    caption: "hukkua · Recognise → Recall: the review queue, not a sample deck.",
    shownIn: "fi",
  },
  path: {
    key: "path",
    tag: "Path",
    dot: "#E9AE32",
    src: "/images/app/path-fi.png",
    alt: "Kielo course map for Everyday Finnish",
    caption: "Everyday Finnish · chapters and lessons to A2 · next: Sorry & You’re Welcome.",
    shownIn: "fi",
  },
  home: {
    key: "home",
    tag: "Home",
    dot: "#6C5CE7",
    src: "/images/app/home-fi.png",
    alt: "Kielo home screen with the daily plan, review and the Everyday Finnish course",
    caption: "A test account’s real home: its words, its fading reviews, its lessons. Nothing invented.",
    shownIn: "fi",
  },
};

/** The brand home's "app as it is" grid: every screen, with a line on what it is for. */
export const HOME_SCREENS: { screen: AppScreen; title: string; body: string }[] = [
  {
    screen: FINNISH_SCREENS.speak,
    title: "Rehearse the conversation before you have to have it.",
    body: "A scenario, a partner who answers at speaking speed, and a note afterwards on what to fix.",
  },
  {
    screen: FINNISH_SCREENS.read,
    title: "Real news, with every word one tap from an explanation.",
    body: "Articles simplified to your level. Tap a word and the grammar is explained in the sentence you met it in.",
  },
  {
    screen: FINNISH_SCREENS.watch,
    title: "Short videos with the vocabulary on the frame.",
    body: "Sound, glossary, save, next, all without leaving the clip.",
  },
  {
    screen: FINNISH_SCREENS.review,
    title: "It brings back the words you are about to lose.",
    body: "Recognise it first, produce it from memory second. The queue is built from what you actually met.",
  },
  {
    screen: FINNISH_SCREENS.path,
    title: "A course underneath, so the practice adds up.",
    body: "Chapters, not a feed. You can see where you are and what the next lesson is before you tap it.",
  },
  {
    screen: FINNISH_SCREENS.home,
    title: "Your day on one screen.",
    body: "The daily plan, the words that are fading, and where you are in your course.",
  },
];
