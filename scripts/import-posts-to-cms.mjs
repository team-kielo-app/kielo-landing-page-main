#!/usr/bin/env node
/**
 * One-off: moves the MDX posts in public/blogs into the Kielo CMS (admin →
 * Website), where kielo.app now reads them. Uses the admin API, so it works
 * the same against a local stack and prod.
 *
 *   CMS_API_ORIGIN=http://localhost:8083 CMS_ADMIN_TOKEN=… CMS_DEVICE_TOKEN=… \
 *     node scripts/import-posts-to-cms.mjs [--lang fi] [--dir public/blogs] [--apply] [--update]
 *
 *   Swedish starter posts (drafts, for review in admin):
 *     node scripts/import-posts-to-cms.mjs --lang sv --dir content/swedish --apply
 *
 * Dry run unless --apply. Posts whose slug already exists are skipped, or
 * overwritten with --update. Images stay in this repo (public/blogs/images),
 * served by kielo.app at /blogs/images/….
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};

const ORIGIN = (process.env.CMS_API_ORIGIN || "http://localhost:8083").replace(/\/+$/, "");
const TOKEN = process.env.CMS_ADMIN_TOKEN || "";
const DEVICE = process.env.CMS_DEVICE_TOKEN || "kielo-landing-import";
const LANG = option("--lang", "fi");
const APPLY = flag("--apply");
const UPDATE = flag("--update");
const DIR = path.join(process.cwd(), option("--dir", "public/blogs"));

if (!TOKEN) {
  console.error("CMS_ADMIN_TOKEN is required (an admin's access token)");
  process.exit(1);
}

async function api(method, route, body) {
  const url = new URL(`${ORIGIN}/api/v3${route}`);
  url.searchParams.set("learning_language_code", LANG);
  const res = await fetch(url, {
    method,
    headers: {
      authorization: `Bearer ${TOKEN}`,
      "x-device-token": DEVICE,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${method} ${route}: ${res.status} ${json?.error?.message || text}`);
  return json.data ?? json;
}

async function existingSlugs() {
  const slugs = new Map();
  for (const status of ["draft", "published", "archived"]) {
    for (let offset = 0; ; offset += 100) {
      const page = await api("GET", `/site/posts?status=${status}&limit=100&offset=${offset}`);
      for (const p of page.posts) slugs.set(p.slug, p.post_id);
      if (page.posts.length < 100) break;
    }
  }
  return slugs;
}

/** The post as the CMS stores it: hero image and title out of the body. */
function toPost(file) {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  // The CMS takes ASCII slugs only; fold as its SlugFromTitle does (ä → a).
  const slug = String(data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, ""))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  let body = content.replace(/^\s+/, "");
  let heroAlt = "";
  const lead = body.match(/^!\[([^\]]*)\]\(([^)]*)\)\s*/);
  if (lead && lead[2] === data.image) {
    heroAlt = lead[1];
    body = body.slice(lead[0].length);
  }
  body = body.replace(/^#\s+[^\n]+\n+/, "");
  return {
    slug,
    title: String(data.title).trim(),
    description: String(data.description || "").trim(),
    body_markdown: body.trimEnd() + "\n",
    hero_image_url: data.image || "",
    hero_image_alt: heroAlt,
    level: data.level || "",
    category: data.category || "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: data.draft ? "draft" : "published",
    // A draft gets its date when someone publishes it in admin.
    ...(data.draft ? {} : { published_at: `${String(data.date).slice(0, 10)}T09:00:00Z` }),
    source: "import",
  };
}

const files = fs.readdirSync(DIR).filter((f) => /\.mdx?$/.test(f)).sort();
const existing = await existingSlugs();
let created = 0;
let updated = 0;
let skipped = 0;
for (const file of files) {
  const post = toPost(file);
  const id = existing.get(post.slug);
  if (id && !UPDATE) {
    skipped++;
    continue;
  }
  console.log(`${id ? "update" : "create"} ${LANG} ${post.slug} (${post.status}${post.published_at ? " " + post.published_at.slice(0, 10) : ""}, ${post.body_markdown.length} chars)`);
  if (!APPLY) continue;
  if (id) {
    await api("PATCH", `/site/posts/${id}`, post);
    updated++;
  } else {
    await api("POST", "/site/posts", post);
    created++;
  }
}
console.log(
  APPLY
    ? `done: ${created} created, ${updated} updated, ${skipped} already there`
    : `dry run: ${files.length - skipped} to write, ${skipped} already there (pass --apply)`,
);
