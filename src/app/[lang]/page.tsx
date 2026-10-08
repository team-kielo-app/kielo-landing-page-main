import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/site/SiteHeader";
import Footer from "@/components/Footer";
import LatestPosts from "@/components/site/LatestPosts";
import DownloadBand from "@/components/site/DownloadBand";
import JobCards from "@/components/site/JobCards";
import PhoneShot, { ScreenNote, ScreenTag } from "@/components/site/PhoneShot";
import { LANGUAGE_LIST, languageBySlug, SITE_URL } from "@/lib/languages";
import { LANGUAGE_PAGES, themeStyle } from "@/lib/language-pages";
import { landingCopy } from "@/lib/site-api";

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGE_LIST.map((l) => ({ lang: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const language = languageBySlug((await params).lang);
  if (!language) return {};
  const copy = await landingCopy(language);
  const url = `${SITE_URL}/${language.slug}`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: language.keywords,
    alternates: { canonical: url },
    openGraph: { url, title: copy.metaTitle, description: copy.metaDescription, siteName: "Kielo", type: "website" },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.metaDescription },
  };
}

export default async function LanguagePage({ params }: Props) {
  const language = languageBySlug((await params).lang);
  if (!language) notFound();
  const copy = await landingCopy(language);
  const page = LANGUAGE_PAGES[language.code];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div style={themeStyle(language.code)}>
      <main className="bg-[#FCFAF2] text-[#1F2330]">
        <section className="bg-[var(--tint)]">
          <SiteHeader language={language} />
          <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-end gap-12 px-4 pt-6 md:px-6 md:pt-10">
            <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5 pb-12 md:pb-16">
              <h1 className="m-0 text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.02] tracking-[-0.03em]">{page.headline}</h1>
              <p className="m-0 max-w-[580px] text-lg leading-normal text-[#3D4A60] md:text-[21px]">{copy.heroLine}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="#download" className="rounded-full bg-[var(--ink)] px-6 py-4 text-[17px] font-bold text-white hover:text-white hover:opacity-90">
                  Start learning {language.name}, free
                </Link>
                <Link href="#inside" className="rounded-full bg-white px-6 py-4 text-[17px] font-bold text-[var(--ink)] hover:text-[var(--ink)]">
                  See the app
                </Link>
              </div>
            </div>
            <div className="relative flex min-h-[440px] min-w-0 flex-[1_1_340px] items-end justify-end pr-2 md:min-h-[520px] md:pr-10">
              <div className="h-[420px] w-[230px] overflow-hidden rounded-t-[36px] border-[10px] border-b-0 border-[#1B1F27] bg-[#FAF8F3] md:h-[500px] md:w-[270px]">
                <PhoneShot screen={page.heroScreen} className="w-full" frame="border-0" sizes="270px" priority />
              </div>
              {page.heroScreen.shownIn !== language.code ? (
                <span className="absolute right-2 top-4 rounded-full bg-[#1F2330] px-3 py-1 text-xs font-bold text-white md:right-6">
                  Shown in {LANGUAGE_LIST.find((l) => l.code === page.heroScreen.shownIn)?.name}
                </span>
              ) : null}
              <Image
                src={page.mascot.src}
                alt=""
                width={page.mascot.width}
                height={page.mascot.height}
                sizes="190px"
                className="absolute bottom-0 left-0 w-[140px] md:w-[190px]"
              />
            </div>
          </div>
        </section>

        <section id="inside" className="mx-auto flex w-full max-w-[1240px] scroll-mt-6 flex-col gap-20 px-4 pb-10 pt-20 md:px-6 md:pt-24">
          <div className="flex max-w-[720px] flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--ink)]">Inside the app</span>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
              What learning {language.name} in Kielo looks like
            </h2>
            <p className="m-0 text-lg leading-normal text-[#4A5060]">
              Real screens from the app, with a note under each on exactly what is on it.
            </p>
          </div>

          {page.rows.map(({ screen, title, body }, i) => (
            <div key={screen.key} className={`flex flex-wrap items-center gap-14 ${i % 2 ? "flex-row-reverse" : ""}`}>
              <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
                <ScreenTag screen={screen} />
                <h3 className="m-0 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.12] tracking-[-0.02em]">{title}</h3>
                <p className="m-0 text-lg leading-relaxed text-[#4A5060]">{body}</p>
                <ScreenNote screen={screen} className="max-w-[520px]" />
              </div>
              <div className="relative flex min-w-[260px] flex-[0_1_320px] justify-center">
                <div className="absolute inset-x-0 inset-y-10 rounded-[40px] bg-[var(--tint)]" />
                <PhoneShot screen={screen} pageLanguage={language.code} sizes="270px" />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {page.more.map(({ screen, title }) => (
              <article key={screen.key} className="flex flex-col gap-2.5 rounded-3xl border border-[#E4E2EE] bg-white p-5">
                <ScreenTag screen={screen} />
                <h3 className="m-0 text-[21px] font-extrabold leading-tight">{title}</h3>
                <div className="flex h-[300px] justify-center overflow-hidden rounded-[18px] bg-[var(--tint)] pt-5">
                  <PhoneShot screen={screen} pageLanguage={language.code} className="w-[200px] self-start" frame="border-[6px] rounded-3xl" sizes="200px" />
                </div>
                <span className="text-sm leading-snug text-[#4A5060]">{screen.caption}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1240px] flex-col gap-7 px-4 py-16 md:px-6 md:py-20">
          <h2 className="m-0 text-[clamp(30px,3.4vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
            Sound like your week in {language.country}?
          </h2>
          <JobCards jobs={page.jobs} tinted />
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 md:px-6">
          <div className="flex flex-col gap-7 rounded-[32px] bg-[#1F2330] p-7 text-[#FCFAF2] md:p-14">
            <h2 className="m-0 text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
              {language.name} in {language.country}, briefly
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
              {page.facts.map((f) => (
                <div key={f.title} className="flex flex-col gap-2">
                  <span className="text-xl font-extrabold" style={{ color: page.theme.accentOnDark }}>{f.title}</span>
                  <span className="text-base leading-relaxed text-[#C9CBDA]">{f.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LatestPosts languages={[language]} />

        <section id="faq" className="mx-auto flex w-full max-w-[900px] scroll-mt-6 flex-col gap-3.5 px-4 pb-20 md:px-6">
          <h2 className="m-0 mb-2 text-[clamp(28px,3.4vw,40px)] font-extrabold tracking-[-0.02em]">
            Questions about learning {language.name} with Kielo
          </h2>
          {page.faq.map((f) => (
            <details key={f.q} className="group rounded-[18px] border border-[#E4E2EE] bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-[var(--ink)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="m-0 mt-3 text-[17px] leading-relaxed text-[#4A5060]">{f.a}</p>
            </details>
          ))}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
        </section>

        <DownloadBand title={page.closer} inverted />
      </main>
      <Footer language={language} />
    </div>
  );
}
