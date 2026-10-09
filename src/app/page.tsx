import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/site/SiteHeader";
import Footer from "@/components/Footer";
import LatestPosts from "@/components/site/LatestPosts";
import DownloadBand from "@/components/site/DownloadBand";
import JobCards from "@/components/site/JobCards";
import Flag from "@/components/site/Flag";
import PhoneShot, { ScreenNote, ScreenTag } from "@/components/site/PhoneShot";
import { FINNISH_SCREENS, HOME_SCREENS } from "@/lib/app-screens";
import { LANGUAGE_LIST, SITE_URL, STORE_LINKS } from "@/lib/languages";
import type { JobCard } from "@/lib/language-pages";

const WHERE: Record<string, string> = {
  fi: "I live in Finland",
  sv: "I live in Sweden, or in Finland",
};

const JOBS: JobCard[] = [
  {
    push: "They always switch to English when I try.",
    answer: "Rehearse the exchange with a partner who keeps going in the language, then see what to fix.",
    feature: "Speak",
  },
  {
    push: "There’s a letter on the table I can’t read.",
    answer: "Read real texts at your level, with every word one tap from an explanation.",
    feature: "Read",
  },
  {
    push: "I sit quiet at my partner’s family table.",
    answer: "Short clips of everyday speech, with the words on the frame, so listening comes first.",
    feature: "Watch",
  },
  {
    push: "My application has a date on it.",
    answer: "A course underneath and reviews that bring back what you are about to forget, every day.",
    feature: "Path and Review",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kielo",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: "connect@kielo.app",
      sameAs: [...new Set(LANGUAGE_LIST.flatMap((l) => Object.values(l.socials)))],
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Kielo", url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` } },
    {
      "@type": "MobileApplication",
      name: "Kielo",
      operatingSystem: "iOS, Android",
      applicationCategory: "EducationalApplication",
      description: "Practise Finnish or Swedish for the place you live: conversations, news at your level and reviews.",
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      installUrl: [STORE_LINKS.appStore, STORE_LINKS.googlePlay],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <main className="bg-[#FCFAF2] text-[#1F2330]">
        <SiteHeader />

        <section className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center gap-14 px-4 pb-20 pt-6 md:px-6 md:pt-10">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <h1 className="m-0 text-[clamp(40px,6vw,76px)] font-extrabold leading-none tracking-[-0.035em]">
              Stop being the one they switch to English for.
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-normal text-[#4A5060] md:text-[21px]">
              Kielo is where you rehearse the conversation before you have it, read real news at your level, and keep the
              words you’re about to lose.
            </p>
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#6A7080]">What are you learning?</span>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
                {LANGUAGE_LIST.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.slug}`}
                    className="group flex items-center gap-3.5 rounded-[20px] border-2 border-[#E4E2EE] bg-white px-5 py-4 text-[#1F2330] transition-colors hover:border-[#9A9CE3] hover:text-[#1F2330]"
                  >
                    <Flag code={l.code} className="h-11 w-11 shrink-0" />
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[22px] font-extrabold leading-tight">{l.name}</span>
                      <span className="text-[15px] text-[#4A5060]">{WHERE[l.code]}</span>
                    </span>
                    <span className="text-[22px] text-[#4F52B8] transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </div>
            <span className="text-[15px] text-[#4A5060]">Free to start, on iPhone and Android.</span>
          </div>

          <div className="relative flex min-h-[560px] min-w-0 flex-[1_1_360px] justify-center md:min-h-[620px]">
            <div className="absolute top-20 aspect-square w-[460px] max-w-full rounded-full bg-[#9A9CE3]" />
            <PhoneShot
              screen={FINNISH_SCREENS.home}
              className="w-[260px] rotate-2 self-start md:w-[300px]"
              frame="border-[10px] rounded-[40px]"
              sizes="300px"
              priority
            />
            <Image
              src="/images/mascot/ermin-plus.webp"
              alt=""
              width={880}
              height={881}
              sizes="200px"
              className="absolute bottom-0 left-0 w-[150px] md:-left-2 md:w-[200px]"
            />
          </div>
        </section>

        <section id="app" className="scroll-mt-6 bg-[#1F2330] text-[#FCFAF2]">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-10 px-4 py-20 md:px-6 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex max-w-[700px] flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#B7B9F0]">The app as it is</span>
                <h2 className="m-0 text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                  Six screens, nothing mocked up.
                </h2>
              </div>
              <p className="m-0 max-w-[420px] text-[17px] leading-normal text-[#C9CBDA]">
                Every screenshot below is the real app, and the note under each says exactly what is on it.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-6">
              {HOME_SCREENS.map(({ screen, title, body }) => (
                <article key={screen.key} className="flex flex-col gap-2.5 rounded-[26px] bg-[#FAF8F3] p-6 text-[#1F2330]">
                  <ScreenTag screen={screen} />
                  <h3 className="m-0 text-[23px] font-extrabold leading-tight tracking-[-0.01em]">{title}</h3>
                  <p className="m-0 text-[15px] leading-normal text-[#4A5060]">{body}</p>
                  <div className="mt-1.5 flex h-[360px] justify-center overflow-hidden">
                    <PhoneShot screen={screen} className="w-[220px] self-start" frame="border-[6px] rounded-[26px]" sizes="220px" />
                  </div>
                  <ScreenNote screen={screen} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-4 py-20 md:px-6 md:py-24">
          <div className="flex max-w-[720px] flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#4F52B8]">Why people open Kielo</span>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Does any of this sound like your week?
            </h2>
          </div>
          <JobCards jobs={JOBS} />
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 md:px-6">
          <div className="flex flex-wrap items-center gap-10 rounded-[32px] bg-[#ECEBFB] p-7 md:p-14">
            <Image src="/images/mascot/ermin-hello.webp" alt="" width={406} height={512} sizes="180px" className="w-[140px] shrink-0 md:w-[180px]" />
            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-3.5">
              <h2 className="m-0 text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                Made by two immigrants in Finland.
              </h2>
              <p className="m-0 text-lg leading-relaxed text-[#3E4356]">
                Even after years of study, speaking the language in daily life was the hard part. Kielo is the practice we
                wanted: real language, at our level, and someone to rehearse with.
              </p>
              <Link href="/about" className="self-start font-bold text-[#4F52B8] hover:underline">
                Read our story →
              </Link>
            </div>
          </div>
        </section>

        <LatestPosts languages={LANGUAGE_LIST} />

        <DownloadBand title="Rehearse your next conversation tonight." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
        />
      </main>
      <Footer />
    </>
  );
}
