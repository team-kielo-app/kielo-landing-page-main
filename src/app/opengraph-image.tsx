import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Kielo: learn Finnish or Swedish for the place you live";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Stop being the one they switch to English for.",
    path: "kielo.app",
    flags: ["fi", "sv"],
    tint: "#ECEBFB",
    ink: "#4F52B8",
    mascot: "images/mascot/ermin-coffee.png",
  });
}
