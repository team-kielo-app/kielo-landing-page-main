/**
 * The old Finnish blog URLs: /blog/2026-08-20-<slug> → /finnish/blog/<slug>.
 * The date prefix was the MDX file name; slugs are ASCII in the CMS
 * (kään → kaan), so the same folding happens here.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  let raw: string;
  try {
    raw = decodeURIComponent((await params).slug);
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const slug = raw
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
  // Relative, so the redirect never carries an internal host name.
  return new Response(null, { status: 308, headers: { Location: `/finnish/blog/${encodeURIComponent(slug)}` } });
}
