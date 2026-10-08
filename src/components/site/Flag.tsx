import type { LearningLanguageCode } from "@/lib/languages";

/**
 * Round flags as SVG: emoji flags render as letter pairs on Windows.
 * Nordic crosses are offset towards the hoist, as on the real flags.
 */
export default function Flag({
  code,
  className = "",
  title,
}: {
  code: LearningLanguageCode;
  className?: string;
  title?: string;
}) {
  const colours = code === "fi" ? { field: "#FFFFFF", cross: "#003580" } : { field: "#006AA7", cross: "#FECC02" };
  return (
    <svg viewBox="0 0 36 36" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id={`flag-clip-${code}`}>
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-clip-${code})`}>
        <rect width="36" height="36" fill={colours.field} />
        <rect x="9" y="0" width="7" height="36" fill={colours.cross} />
        <rect x="0" y="14.5" width="36" height="7" fill={colours.cross} />
      </g>
      <circle cx="18" cy="18" r="17.25" fill="none" stroke="rgba(14,17,22,0.12)" strokeWidth="1.5" />
    </svg>
  );
}
