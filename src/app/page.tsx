import Hero from "@/components/Hero";
import { LandingAccordionItem } from '@/components/ui/interactive-image-accordion';
import TikTokVideos from "@/components/TikTokVideos";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

import { BackgroundSparkles } from '@/components/ui/background-sparkles';

export default function Home() {
  return (
    <>
      <main className="bg-[#fcfaf2] relative">
        <BackgroundSparkles />
        <Hero />
        <LandingAccordionItem />
        <TikTokVideos />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
