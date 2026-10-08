import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function isKieloHost(href: string) {
  try {
    const host = new URL(href).hostname;
    return host === "kielo.app" || host.endsWith(".kielo.app");
  } catch {
    return false;
  }
}

/**
 * A post body from the CMS. Plain Markdown (GitHub tables, lists): no MDX
 * and no raw HTML, so nothing an editor writes can run on kielo.app.
 */
export default function PostMarkdown({ source }: { source: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      components={{
        a: ({ href = "", children }) => {
          const external = /^https?:\/\//.test(href) && !isKieloHost(href);
          return (
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {children}
            </a>
          );
        },
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ src, alt }) => <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" />,
        table: ({ children }) => (
          <div className="not-prose my-8 overflow-x-auto rounded-xl border border-[#E8E4F8]">
            <table className="w-full text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-[#F3F0FC] px-4 py-3 font-semibold text-[#374151]">{children}</th>
        ),
        td: ({ children }) => <td className="border-t border-[#E8E4F8] px-4 py-3 text-[#374151]">{children}</td>,
      }}
    >
      {source}
    </Markdown>
  );
}
