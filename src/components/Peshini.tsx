type Props = { className?: string; mood?: "happy" | "wow" | "sleepy"; wave?: boolean };

export default function Peshini({ className = "", mood = "happy", wave = true }: Props) {
  return (
    <svg viewBox="0 0 200 300" className={className} aria-label="Peshini">
      <defs>
        <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff8fa3" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff8fa3" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="100" cy="292" rx="52" ry="7" fill="#000" opacity="0.12" />
      {/* legs */}
      <rect x="76" y="232" width="18" height="44" rx="8" fill="#3b6fd8" />
      <rect x="106" y="232" width="18" height="44" rx="8" fill="#3b6fd8" />
      {/* sneakers */}
      <ellipse cx="82" cy="280" rx="17" ry="9" fill="#e5383b" />
      <ellipse cx="118" cy="280" rx="17" ry="9" fill="#e5383b" />
      <rect x="66" y="282" width="32" height="4" rx="2" fill="#fff" />
      <rect x="102" y="282" width="32" height="4" rx="2" fill="#fff" />
      {/* left arm */}
      <g>
        <path d="M62 170 Q40 200 48 228" stroke="#8d5524" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="48" cy="230" r="9" fill="#8d5524" />
      </g>
      {/* right arm (waving) */}
      <g className={wave ? "animate-wave" : ""}>
        <path d="M138 170 Q165 150 168 118" stroke="#8d5524" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="168" cy="114" r="10" fill="#8d5524" />
      </g>
      {/* t-shirt */}
      <path d="M60 165 Q100 150 140 165 L146 205 L54 205 Z" fill="#ffd23f" />
      {/* overalls */}
      <path d="M68 180 L132 180 L136 245 L64 245 Z" fill="#4a7fe8" />
      <rect x="72" y="160" width="9" height="28" rx="3" fill="#4a7fe8" />
      <rect x="119" y="160" width="9" height="28" rx="3" fill="#4a7fe8" />
      <circle cx="77" cy="186" r="4" fill="#ffd23f" />
      <circle cx="123" cy="186" r="4" fill="#ffd23f" />
      <rect x="88" y="198" width="24" height="18" rx="4" fill="#3b6fd8" />
      {/* neck */}
      <rect x="92" y="140" width="16" height="18" fill="#7a4a1f" />
      {/* hair puffs */}
      <circle cx="48" cy="52" r="28" fill="#1b1b1b" />
      <circle cx="152" cy="52" r="28" fill="#1b1b1b" />
      <circle cx="40" cy="44" r="8" fill="#2c2c2c" />
      <circle cx="160" cy="44" r="8" fill="#2c2c2c" />
      {/* bows */}
      <g fill="#e5383b">
        <path d="M66 70 l-14 -10 l0 20 z" />
        <path d="M66 70 l14 -10 l0 20 z" />
        <circle cx="66" cy="70" r="5" />
        <path d="M134 70 l-14 -10 l0 20 z" />
        <path d="M134 70 l14 -10 l0 20 z" />
        <circle cx="134" cy="70" r="5" />
      </g>
      {/* head */}
      <circle cx="100" cy="100" r="50" fill="#8d5524" />
      {/* hairline */}
      <path d="M52 92 Q58 48 100 46 Q142 48 148 92 Q130 66 100 66 Q70 66 52 92 Z" fill="#1b1b1b" />
      <circle cx="70" cy="62" r="7" fill="#1b1b1b" />
      <circle cx="88" cy="56" r="7" fill="#1b1b1b" />
      <circle cx="112" cy="56" r="7" fill="#1b1b1b" />
      <circle cx="130" cy="62" r="7" fill="#1b1b1b" />
      {/* eyes */}
      {mood === "sleepy" ? (
        <g stroke="#1b1b1b" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M72 102 Q80 108 88 102" />
          <path d="M112 102 Q120 108 128 102" />
        </g>
      ) : (
        <g>
          <ellipse cx="80" cy="102" rx="10" ry={mood === "wow" ? 13 : 11} fill="#1b1b1b" />
          <ellipse cx="120" cy="102" rx="10" ry={mood === "wow" ? 13 : 11} fill="#1b1b1b" />
          <circle cx="84" cy="97" r="4" fill="#fff" />
          <circle cx="124" cy="97" r="4" fill="#fff" />
          <circle cx="77" cy="107" r="2" fill="#fff" />
          <circle cx="117" cy="107" r="2" fill="#fff" />
        </g>
      )}
      {/* cheeks */}
      <circle cx="66" cy="118" r="11" fill="url(#cheek)" />
      <circle cx="134" cy="118" r="11" fill="url(#cheek)" />
      {/* mouth */}
      {mood === "wow" ? (
        <ellipse cx="100" cy="128" rx="7" ry="9" fill="#5c1a1a" />
      ) : (
        <path d="M86 122 Q100 138 114 122 Z" fill="#5c1a1a" stroke="#5c1a1a" strokeWidth="2" strokeLinejoin="round" />
      )}
    </svg>
  );
}
