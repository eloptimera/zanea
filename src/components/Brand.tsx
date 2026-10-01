import { FORETAG } from "@/lib/foretag";

const STJARNA =
  "M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z";

export function Sparkle({
  className = "",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={STJARNA} fill={fill} />
    </svg>
  );
}

/** Ordbild: "zanea" med glitter som prick. */
export function Logo({ ljus = false, className = "" }: { ljus?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-display text-[1.7rem] leading-none ${
        ljus ? "text-white" : "text-brand"
      } ${className}`}
    >
      <span>zanea</span>
      <Sparkle className="mb-3 size-3.5 text-sun" />
      <span className="sr-only">{FORETAG.namn}</span>
    </span>
  );
}

/** Dekorativ bubbelgrupp (hero-objektet). Rent grafiskt – döljs för skärmläsare. */
export function Bubblor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 460" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="zb-stor" cx="34%" cy="26%" r="85%">
          <stop offset="0" stopColor="#e9f3ff" />
          <stop offset="0.28" stopColor="#8cc0ff" />
          <stop offset="0.7" stopColor="#2b6fe6" />
          <stop offset="1" stopColor="#0a2f8a" />
        </radialGradient>
        <radialGradient id="zb-mellan" cx="34%" cy="28%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#a9d0ff" />
          <stop offset="1" stopColor="#2f78ee" />
        </radialGradient>
        <radialGradient id="zb-gul" cx="34%" cy="28%" r="80%">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset="0.5" stopColor="#ffd95a" />
          <stop offset="1" stopColor="#f0a91c" />
        </radialGradient>
        <filter id="zb-mjuk" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <ellipse
        cx="205"
        cy="438"
        rx="150"
        ry="14"
        fill="#06226a"
        opacity="0.45"
        filter="url(#zb-mjuk)"
      />

      <g className="float" style={{ animationDuration: "6s" }}>
        <circle cx="200" cy="262" r="158" fill="url(#zb-stor)" />
        <ellipse
          cx="148"
          cy="170"
          rx="62"
          ry="34"
          fill="#fff"
          opacity="0.55"
          transform="rotate(-32 148 170)"
        />
        <path
          d="M70 300 A140 140 0 0 0 270 396"
          stroke="#bfe0ff"
          strokeOpacity="0.55"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      <g className="float" style={{ animationDuration: "4.4s", animationDelay: "-1.5s" }}>
        <circle cx="338" cy="104" r="58" fill="url(#zb-mellan)" />
        <ellipse
          cx="318"
          cy="82"
          rx="20"
          ry="11"
          fill="#fff"
          opacity="0.8"
          transform="rotate(-32 318 82)"
        />
      </g>

      <g className="float" style={{ animationDuration: "5.2s", animationDelay: "-2.4s" }}>
        <circle cx="76" cy="96" r="34" fill="url(#zb-mellan)" />
        <ellipse
          cx="65"
          cy="84"
          rx="12"
          ry="7"
          fill="#fff"
          opacity="0.85"
          transform="rotate(-32 65 84)"
        />
      </g>

      <g className="float" style={{ animationDuration: "3.8s", animationDelay: "-0.8s" }}>
        <circle cx="352" cy="344" r="30" fill="url(#zb-gul)" />
        <ellipse
          cx="343"
          cy="334"
          rx="10"
          ry="6"
          fill="#fff"
          opacity="0.85"
          transform="rotate(-32 343 334)"
        />
      </g>

      <g fill="#fff">
        <path className="twinkle" d={STJARNA} transform="translate(236 18) scale(1.6)" />
        <path
          className="twinkle"
          style={{ animationDelay: "-1.2s" }}
          d={STJARNA}
          transform="translate(8 214) scale(1.1)"
          fill="#ffd95a"
        />
        <path
          className="twinkle"
          style={{ animationDelay: "-2s" }}
          d={STJARNA}
          transform="translate(372 214) scale(0.9)"
        />
      </g>
    </svg>
  );
}
