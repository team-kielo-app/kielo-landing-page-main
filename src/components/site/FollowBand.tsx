import Image from "next/image";
import type { SiteLanguage, SocialAccounts } from "@/lib/languages";
import Flag from "./Flag";

const PLATFORMS: { key: keyof SocialAccounts; name: string; icon: string; tilt: string; what: string }[] = [
  { key: "tiktok", name: "TikTok", icon: "/tiktok.png", tilt: "-rotate-6", what: "Short clips" },
  { key: "instagram", name: "Instagram", icon: "/instagram.png", tilt: "rotate-3", what: "Words and phrases" },
  { key: "youtube", name: "YouTube", icon: "/youtube.png", tilt: "-rotate-2", what: "Shorts" },
];

function handleOf(url: string) {
  return url.match(/@[^/]+/)?.[0] ?? `@${url.replace(/\/+$/, "").split("/").pop()}`;
}

/** The Kielo tile with a flag badge per language it stands for. */
function FlaggedLogo({ languages }: { languages: SiteLanguage[] }) {
  return (
    <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
      <Image src="/logo.png" alt="Kielo" width={112} height={112} className="h-full w-full -rotate-3 drop-shadow-[0_12px_18px_rgba(79,82,184,0.28)]" />
      {languages.map((l, i) => (
        <Flag
          key={l.code}
          code={l.code}
          title={l.name}
          className={`absolute h-9 w-9 rounded-full ring-[3px] ring-white md:h-10 md:w-10 ${i === 0 ? "-right-2 -top-2" : "-bottom-2 -right-3"}`}
        />
      ))}
    </div>
  );
}

/**
 * Where to follow Kielo: each platform once, with its 3D icon, and under it
 * the account for each language the page is about.
 */
export default function FollowBand({ languages }: { languages: SiteLanguage[] }) {
  const single = languages.length === 1 ? languages[0] : undefined;
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-16 md:px-6">
      <div className="flex flex-wrap items-center gap-8 rounded-[32px] bg-[var(--tint,#ECEBFB)] p-7 md:gap-12 md:p-12">
        <div className="flex min-w-0 flex-[1_1_300px] items-center gap-6">
          <FlaggedLogo languages={languages} />
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="m-0 text-[clamp(26px,3vw,34px)] font-extrabold leading-tight tracking-[-0.02em] text-[#1F2330]">
              {single ? `Kielo ${single.name}, between lessons` : "Kielo between lessons"}
            </h2>
            <p className="m-0 text-base leading-normal text-[#4A5060]">
              {single
                ? `Everyday ${single.name}, in clips you can watch on the bus.`
                : "Everyday Finnish and Swedish, in clips you can watch on the bus."}
            </p>
          </div>
        </div>

        <div className="grid min-w-0 flex-[2_1_520px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          {PLATFORMS.map((p) => {
            const accounts = languages.map((l) => ({ language: l, url: l.socials[p.key] }));
            const icon = (
              <Image
                src={p.icon}
                alt=""
                width={80}
                height={80}
                className={`h-12 w-12 shrink-0 sm:h-14 sm:w-14 ${p.tilt} drop-shadow-[0_10px_14px_rgba(14,17,22,0.18)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0`}
              />
            );
            const title = (
              <span className="flex flex-col sm:mt-1">
                <span className="text-lg font-extrabold leading-tight text-[#1F2330]">{p.name}</span>
                <span className="text-[13px] text-[#6A7080]">{p.what}</span>
              </span>
            );
            const cardClass = "group flex items-center gap-4 rounded-3xl bg-white p-4 sm:flex-col sm:items-start sm:gap-2 sm:p-5";
            if (single) {
              return (
                <a
                  key={p.key}
                  href={accounts[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} text-[#1F2330] transition-shadow hover:text-[#1F2330] hover:shadow-[0_14px_30px_rgba(14,17,22,0.10)]`}
                >
                  {icon}
                  <span className="flex min-w-0 flex-col gap-1 sm:gap-2">
                    {title}
                    <span className="truncate text-sm font-bold text-[var(--ink,#4F52B8)]">{handleOf(accounts[0].url)} →</span>
                  </span>
                </a>
              );
            }
            return (
              <div key={p.key} className={cardClass}>
                {icon}
                <span className="flex min-w-0 flex-1 flex-col gap-2 self-stretch sm:flex-none">
                  {title}
                  <span className="flex flex-col gap-1.5">
                    {accounts.map(({ language, url }) => (
                      <a
                        key={language.code}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Kielo ${language.name} on ${p.name}`}
                        className="flex min-w-0 items-center gap-2 rounded-full bg-[#F6F4EC] py-1 pl-1 pr-3 text-[13px] font-semibold text-[#1F2330] transition-colors hover:bg-[#ECEBFB] hover:text-[#1F2330]"
                      >
                        <Flag code={language.code} className="h-5 w-5 shrink-0" />
                        <span className="truncate">{handleOf(url)}</span>
                      </a>
                    ))}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
