"use client";

import React from "react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

const KieloHero = () => {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "BLOG", href: "/blog" },
    { label: "DOWNLOAD", href: "#download" },
  ];

  return (
    <MinimalistHero
      logoText="KIELO"
      navLinks={navLinks}
      mainText="With real news, practical conversations, and smart quizzes, Kielo turns language learning into an immersive, fun experience."
      readMoreLink="/about"
      imageSrc="/images/erminai.png"
      imageAlt="Kielo Mascot"
      overlayText={{
        part1: {
          prefix: "Master ",
          rotate: [
            "Speaking Finnish",
            "Reading Finnish",
            "Writing Finnish",
            "Listening to Finnish",
          ],
        },
        part2: "With AI-powered",
        part3: "Learning.",
      }}
      showFooter={false}
      leftLogoSrc="/logo.png"
      className="bg-[#fcfaf2]"
    />
  );
};

export default KieloHero;

