import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { siteTag } from "@/lib/site-api";
import type { LearningLanguageCode } from "@/lib/languages";

/**
 * Called by the Kielo CMS when a post or a page's copy is published, so the
 * language's pages refresh now (kielo-cms SiteRevalidator). Bearer
 * SITE_REVALIDATE_SECRET; body {learning_language_code, slugs}.
 */
export async function POST(request: Request) {
  const secret = process.env.SITE_REVALIDATE_SECRET || "";
  const given = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const givenBytes = Buffer.from(given);
  const secretBytes = Buffer.from(secret);
  const ok =
    secretBytes.length > 0 &&
    givenBytes.length === secretBytes.length &&
    timingSafeEqual(givenBytes, secretBytes);
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { learning_language_code?: string };
  const code = body.learning_language_code;
  if (code !== "fi" && code !== "sv") return Response.json({ error: "learning_language_code must be fi or sv" }, { status: 400 });

  revalidateTag(siteTag(code as LearningLanguageCode), { expire: 0 });
  return Response.json({ revalidated: siteTag(code as LearningLanguageCode) });
}
