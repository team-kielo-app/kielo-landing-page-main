import Image from "next/image";
import Link from "next/link";
import { LANGUAGE_LIST, type SiteLanguage } from "@/lib/languages";
import FollowBand from "@/components/site/FollowBand";

const linkClass = "text-[#4A5060] hover:text-[#1F2330] hover:underline";

/** On a language's pages, that language's accounts; elsewhere, every language's. */
export default function Footer({ language }: { language?: SiteLanguage }) {
  const languages = language ? [language] : LANGUAGE_LIST;
  const other = language ? LANGUAGE_LIST.find((l) => l.code !== language.code) : undefined;
  return (
    <footer className="relative z-10 bg-[#FCFAF2]">
      <FollowBand languages={languages} />
      <div className="border-t border-[#ECEAE2]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-x-10 gap-y-5 px-4 py-8 text-[15px] text-[#6A7080] md:px-6">
          <span className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Kielo</span>
            {other ? (
              <Link href={`/${other.slug}`} className={linkClass}>
                Learning {other.name} instead?
              </Link>
            ) : null}
          </span>
          <a
            href="mailto:connect@kielo.app"
            className="group flex items-center gap-3 text-[#1F2330] hover:text-[#1F2330]"
          >
            <Image
              src="/email.png"
              alt=""
              width={80}
              height={80}
              className="h-10 w-10 -rotate-6 transition-transform duration-300 group-hover:rotate-0"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#6A7080]">Write to us</span>
              <span className="font-semibold group-hover:underline">connect@kielo.app</span>
            </span>
          </a>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/about" className={linkClass}>About</Link>
            <Link href="/privacy" className={linkClass}>Privacy</Link>
            <Link href="/terms" className={linkClass}>Terms</Link>
            <Link href="/gdpr" className={linkClass}>Personal data</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
