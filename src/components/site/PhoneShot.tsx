import Image from "next/image";
import type { AppScreen } from "@/lib/app-screens";
import { SITE_LANGUAGES, type LearningLanguageCode } from "@/lib/languages";

const SHOT_WIDTH = 780;
const SHOT_HEIGHT = 1605;

/** The tag above a screen: the feature's colour dot and name. */
export function ScreenTag({ screen, className = "text-[#5C6473]" }: { screen: AppScreen; className?: string }) {
  return (
    <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] ${className}`}>
      <span className="h-2 w-2 rounded-full" style={{ background: screen.dot }} />
      {screen.tag}
    </span>
  );
}

/** "What is on the screen": the honest caption under a screenshot. */
export function ScreenNote({ screen, className = "" }: { screen: AppScreen; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 rounded-2xl border border-[#E7E2D8] bg-white px-4 py-3 ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5C6473]">What is on the screen</span>
      <span className="text-[15px] font-medium leading-snug text-[#1F2330]">{screen.caption}</span>
    </div>
  );
}

/**
 * A real app screenshot in a phone frame. When the screenshot was taken in
 * another language than the page's, it says so on the frame.
 */
export default function PhoneShot({
  screen,
  pageLanguage,
  className = "w-[270px]",
  frame = "border-[8px] rounded-[32px]",
  sizes = "270px",
  priority = false,
}: {
  screen: AppScreen;
  pageLanguage?: LearningLanguageCode;
  className?: string;
  frame?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const foreign = pageLanguage && screen.shownIn !== pageLanguage;
  return (
    <div className={`relative ${className}`}>
      <div className={`overflow-hidden border-[#1B1F27] bg-[#FAF8F3] shadow-[0_24px_50px_rgba(14,17,22,0.22)] ${frame}`}>
        <Image src={screen.src} alt={screen.alt} width={SHOT_WIDTH} height={SHOT_HEIGHT} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
      {foreign ? (
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1F2330] px-3 py-1 text-xs font-bold text-white">
          Shown in {SITE_LANGUAGES[screen.shownIn].name}
        </span>
      ) : null}
    </div>
  );
}
