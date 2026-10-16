import { TONE_INFO, tonesOf } from "../data";

const PATHS: Record<number, string> = {
  1: "M6 10 L38 10",
  2: "M6 30 Q22 26 38 8",
  3: "M6 16 Q18 36 26 32 Q34 28 38 10",
  4: "M6 8 Q22 14 38 32",
  5: "M20 20 L22 20",
};
const COLORS: Record<number, string> = { 1: "#0284c7", 2: "#059669", 3: "#d97706", 4: "#e11d48", 5: "#64748b" };

export function ToneCurve({ tone, size = 44 }: { tone: number; size?: number }) {
  return (
    <svg viewBox="0 0 44 40" width={size} height={(size * 40) / 44}>
      <rect x="1" y="1" width="42" height="38" rx="10" fill="white" opacity="0.7" />
      <path
        d={PATHS[tone]}
        stroke={COLORS[tone]}
        strokeWidth={tone === 5 ? 8 : 4}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ToneStrip({ pinyin, showLabel = false }: { pinyin: string; showLabel?: boolean }) {
  const tones = tonesOf(pinyin);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">
        {tones.map((t, i) => (
          <ToneCurve key={i} tone={t} size={36} />
        ))}
      </div>
      {showLabel && tones.length === 1 && (
        <div className={`text-xs font-bold ${TONE_INFO[tones[0]].color}`}>
          {TONE_INFO[tones[0]].name} · {TONE_INFO[tones[0]].gesture}
        </div>
      )}
    </div>
  );
}
