import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { LearningLanguageCode } from "./languages";

export const OG_SIZE = { width: 1200, height: 630 };

// Bricolage Grotesque ExtraBold (SIL Open Font License), the site's display face.
const fontData = () => readFile(join(process.cwd(), "src/assets/fonts/BricolageGrotesque-ExtraBold.ttf"));

async function publicImage(path: string) {
  const bytes = await readFile(join(process.cwd(), "public", path));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

const FLAG_COLOURS: Record<LearningLanguageCode, { field: string; cross: string }> = {
  fi: { field: "#FFFFFF", cross: "#003580" },
  sv: { field: "#006AA7", cross: "#FECC02" },
};

function Flag({ code, size }: { code: LearningLanguageCode; size: number }) {
  const { field, cross } = FLAG_COLOURS[code];
  const bar = size * 0.2;
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: size,
        height: size,
        borderRadius: size,
        overflow: "hidden",
        background: field,
        border: "6px solid #FFFFFF",
        boxShadow: "0 8px 20px rgba(14,17,22,0.18)",
      }}
    >
      <div style={{ position: "absolute", left: size * 0.26, top: 0, width: bar, height: size, background: cross }} />
      <div style={{ position: "absolute", left: 0, top: size * 0.4, width: size, height: bar, background: cross }} />
    </div>
  );
}

/**
 * The link preview for a page: its headline beside the Kielo tile, the
 * page's flags and, on a language page, its mascot. No screenshots or
 * numbers, so it never goes out of date.
 */
export async function renderOgImage({
  headline,
  path,
  flags,
  tint,
  ink,
  mascot,
}: {
  headline: string;
  path: string;
  flags: LearningLanguageCode[];
  tint: string;
  ink: string;
  mascot?: string;
}) {
  const [logo, mascotSrc, font] = await Promise.all([
    publicImage("logo.png"),
    mascot ? publicImage(mascot) : undefined,
    fontData(),
  ]);
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FCFAF2", padding: 48, fontFamily: "Bricolage" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            borderRadius: 40,
            background: tint,
            padding: "52px 56px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: mascotSrc ? 690 : 900 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} width={84} height={84} alt="" style={{ borderRadius: 20 }} />
              <div style={{ display: "flex", gap: 10 }}>
                {flags.map((code) => (
                  <Flag key={code} code={code} size={56} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 68, lineHeight: 1.02, letterSpacing: -2.5, color: "#1F2330" }}>
              {headline}
            </div>
            <div style={{ display: "flex", fontSize: 30, color: ink }}>{path}</div>
          </div>
          {mascotSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mascotSrc}
              alt=""
              width={330}
              height={470}
              style={{ position: "absolute", right: 24, bottom: -8, objectFit: "contain", objectPosition: "bottom" }}
            />
          ) : null}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] },
  );
}
