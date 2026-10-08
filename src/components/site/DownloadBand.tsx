import Image from "next/image";
import { STORE_LINKS } from "@/lib/languages";

/** The closing call to download: store badges and the QR code. */
export default function DownloadBand({ title, inverted = false }: { title: string; inverted?: boolean }) {
  return (
    <section id="download" className="mx-auto w-full max-w-[1240px] scroll-mt-6 px-4 pb-24 md:px-6">
      <div
        className={`flex flex-wrap items-center gap-10 rounded-[32px] p-7 md:p-14 ${
          inverted ? "bg-[var(--ink)] text-white" : "border border-[#E4E2EE] bg-white text-[#1F2330]"
        }`}
      >
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.02em]">{title}</h2>
          <p className={`m-0 text-lg leading-normal ${inverted ? "text-[#DCE3EE]" : "text-[#4A5060]"}`}>
            Free to start. Kielo Plus removes the daily limits.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={STORE_LINKS.appStore} aria-label="Download on the App Store">
              <Image src="/app-store.svg" alt="Download on the App Store" width={150} height={50} className="h-[50px] w-auto" />
            </a>
            <a href={STORE_LINKS.googlePlay} aria-label="Get it on Google Play">
              <Image src="/google-play.svg" alt="Get it on Google Play" width={168} height={50} className="h-[50px] w-auto" />
            </a>
          </div>
        </div>
        <div className="hidden rounded-3xl bg-[#FCFAF2] p-3 sm:block">
          <Image src="/images/scan-me.png" alt="QR code to download Kielo" width={220} height={220} className="block h-auto w-[220px]" />
        </div>
      </div>
    </section>
  );
}
