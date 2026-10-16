import { useMemo, useRef, useState } from "react";
import { CATS, WORDS, WORD_ORDER } from "../data";
import { speak, speakTwice, sparkle, stopSpeech, wait } from "../speech";
import { ToneStrip } from "./Tone";

export default function WordSheet() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [playingAll, setPlayingAll] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const runId = useRef(0);

  const list = useMemo(() => {
    return WORD_ORDER.map((h) => WORDS[h])
      .filter(Boolean)
      .filter((w) => (cat === "all" || w.cat === cat) && (!q || w.hanzi.includes(q) || w.pinyin.toLowerCase().includes(q.toLowerCase()) || w.en.toLowerCase().includes(q.toLowerCase())));
  }, [q, cat]);

  const stop = () => {
    runId.current++;
    stopSpeech();
    setPlayingAll(false);
    setCurrent(null);
  };

  const playOne = async (hanzi: string) => {
    stop();
    const my = runId.current;
    setCurrent(hanzi);
    sparkle();
    await speakTwice(hanzi, () => runId.current !== my);
    if (runId.current === my) setCurrent(null);
  };

  const playAll = async () => {
    if (playingAll) return stop();
    const my = ++runId.current;
    const cancelled = () => runId.current !== my;
    setPlayingAll(true);
    for (const w of list) {
      if (cancelled()) return;
      setCurrent(w.hanzi);
      sparkle();
      await speak(w.en, "en", 0.9);
      if (cancelled()) return;
      await speakTwice(w.hanzi, cancelled);
      if (cancelled()) return;
      await wait(500);
    }
    if (runId.current === my) {
      setPlayingAll(false);
      setCurrent(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-white p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: 门, mén, door…"
              className="w-full rounded-full border-2 border-amber-200 bg-amber-50 py-2 pl-10 pr-4 font-bold outline-none focus:border-amber-400"
            />
          </div>
          <button
            onClick={playAll}
            className={`rounded-full px-5 py-2 font-extrabold text-white shadow ${playingAll ? "bg-rose-400 hover:bg-rose-500" : "bg-emerald-400 hover:bg-emerald-500"}`}
          >
            {playingAll ? "⏸ Stop" : `▶ Play all ${list.length}`}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATS.map((c) => {
            const count = c.id === "all" ? WORD_ORDER.length : WORD_ORDER.filter((h) => WORDS[h]?.cat === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold ${cat === c.id ? "bg-slate-800 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {c.emoji} {c.label} · {count}
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-400">
          Showing {list.length} of {WORD_ORDER.length} words · tap any card to hear it twice 🔊
        </div>
      </div>

      {list.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-400">
          <div className="text-5xl">🔍</div>
          <div className="mt-2 font-bold">No words found — try another search!</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((w, i) => {
          const on = current === w.hanzi;
          return (
            <button
              key={w.hanzi}
              onClick={() => playOne(w.hanzi)}
              className={`group relative overflow-hidden rounded-3xl border-4 bg-white p-3 text-left shadow transition hover:-translate-y-1 hover:shadow-lg ${on ? "border-amber-400 bg-amber-50" : "border-white"}`}
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">#{WORD_ORDER.indexOf(w.hanzi) + 1}</span>
                <span className="text-2xl">{w.emoji}</span>
              </div>
              <div className={`font-han mt-1 text-5xl font-black leading-none ${on ? "animate-pop" : ""}`}>{w.hanzi}</div>
              <div className="mt-1 text-lg font-extrabold text-rose-500">{w.pinyin}</div>
              <div className="text-sm font-semibold text-slate-500">{w.en}</div>
              <div className="mt-2 flex items-center justify-between">
                <ToneStrip pinyin={w.pinyin} />
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg shadow ${on ? "bg-amber-400 text-white" : "bg-emerald-100 group-hover:bg-emerald-200"}`}>
                  {on ? "🔊" : "▶"}
                </span>
              </div>
              <span className="pointer-events-none absolute -right-2 -top-3 select-none text-6xl opacity-5 font-black">{i + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
