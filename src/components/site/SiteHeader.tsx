import Link from "next/link";
import Image from "next/image";
import { LANGUAGE_LIST, type SiteLanguage } from "@/lib/languages";
import Flag from "./Flag";

function navFor(language?: SiteLanguage) {
  if (!language) {
    return [
      ...LANGUAGE_LIST.map((l) => ({ label: l.name, href: `/${l.slug}` })),
      { label: "The app", href: "/#app" },
      { label: "Blog", href: "/#blog" },
    ];
  }
  return [
    { label: "Inside the app", href: `/${language.slug}#inside` },
    { label: "Blog", href: `/${language.slug}/blog` },
    { label: "FAQ", href: `/${language.slug}#faq` },
  ];
}

/** Top bar: on a language's pages, a switch to the other language and that page's sections. */
export default function SiteHeader({ language }: { language?: SiteLanguage }) {
  const links = navFor(language);
  const other = language ? LANGUAGE_LIST.find((l) => l.code !== language.code) : undefined;
  const download = language ? `/${language.slug}#download` : "/#download";
  return (
    <header className="relative z-30 mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center gap-3 md:gap-4">
        <Link href="/" aria-label="Kielo home" className="shrink-0">
          <Image src="/logo.png" alt="Kielo" width={48} height={48} className="h-10 w-10 md:h-12 md:w-12" priority />
        </Link>
        {language && other ? (
          <Link
            href={`/${other.slug}`}
            title={`Switch to ${other.name}`}
            className="flex items-center gap-2 rounded-full border border-[#E4E2EE] bg-white py-1.5 pl-1.5 pr-3 text-[15px] font-bold text-[#1F2330] hover:text-[#1F2330]"
          >
            <Flag code={language.code} className="h-6 w-6" />
            {language.name}
            <span className="hidden text-xs font-semibold text-[#6A7080] sm:inline">· {other.name}?</span>
          </Link>
        ) : null}
      </div>

      <nav className="hidden items-center gap-7 text-base font-semibold md:flex">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-[#1F2330] hover:text-[var(--ink,#4F52B8)]">
            {l.label}
          </Link>
        ))}
        <Link
          href={download}
          className="rounded-full bg-[var(--ink,#1F2330)] px-5 py-3 text-[#FCFAF2] hover:text-white hover:opacity-90"
        >
          Get the app
        </Link>
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <Link href={download} className="whitespace-nowrap rounded-full bg-[var(--ink,#1F2330)] px-4 py-2.5 text-[15px] font-bold text-[#FCFAF2] hover:text-white">
          Get the app
        </Link>
        <details className="group relative">
          <summary
            aria-label="Menu"
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[#E4E2EE] bg-white [&::-webkit-details-marker]:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2330" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
            </svg>
          </summary>
          <div className="absolute right-0 top-14 flex w-56 flex-col rounded-2xl border border-[#E4E2EE] bg-white p-2 shadow-lg">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-xl px-4 py-3 text-base font-semibold text-[#1F2330] hover:bg-[#F4F2EA]">
                {l.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
