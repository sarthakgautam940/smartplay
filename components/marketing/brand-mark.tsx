/**
 * Smartplay brand wordmark.
 *
 * The wordmark IS the logo. No icon tile, no play-button glyph.
 * "smart" in the surface-appropriate neutral, "play" in signal lime.
 * Set in Space Grotesk, tight (-0.04em) — same language as the hero headline.
 *
 * Optional drawn-on dot accent — purely decorative, hand-sketch feel.
 */
export function BrandWordmark({
  className = "",
  tone = "dark",
  size = "sm",
  accent = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  accent?: boolean;
}) {
  const sizeClass =
    size === "lg"
      ? "text-[2.35rem]"
      : size === "md"
        ? "text-[1.65rem]"
        : "text-[1.2rem]";

  return (
    <span
      className={`relative inline-flex items-baseline leading-none ${className}`}
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 600,
        letterSpacing: "-0.042em",
      }}
    >
      <span
        className={sizeClass}
        style={{
          color: tone === "dark" ? "var(--on-pitch-1)" : "var(--on-chalk-1)",
        }}
      >
        smart
      </span>
      <span
        className={sizeClass}
        style={{
          color: "var(--lime)",
        }}
      >
        play
      </span>
      {accent && (
        <svg
          aria-hidden="true"
          className="glyph-sketch absolute -right-4 -top-2"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <line
            x1="7"
            y1="2"
            x2="7"
            y2="12"
            stroke="var(--lime)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="7"
            x2="12"
            y2="7"
            stroke="var(--lime)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="3.4"
            y1="3.4"
            x2="10.6"
            y2="10.6"
            stroke="var(--lime)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line
            x1="10.6"
            y1="3.4"
            x2="3.4"
            y2="10.6"
            stroke="var(--lime)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      )}
    </span>
  );
}

// Back-compat alias so existing imports keep working while we migrate call sites.
export const BrandLockup = BrandWordmark;
export const BrandMark = BrandWordmark;
