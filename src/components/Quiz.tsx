import { useMemo, useState } from "react";
import { CHAPTERS, WORDS, WORD_ORDER, type Word } from "../data";
import { sparkle, speak, speakTwice } from "../speech";
import Peshini from "./Peshini";

type Mode = "see" | "hear";
type Q = { answer: Word; options: Word[] };

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

function poolFor(chapterId: string): Word[] {
  if (chapterId === "all") return WORD_ORDER.map((h) => WORDS[h]).filter(Boolean);
  const set = new Set<string>();
  CHAPTERS.filter((c) => c.id === chapterId).forEach((c) =>
    c.scenes.forEach((s) => s.words.forEach((w) => set.add(w)))
  );
  return [...set].map((h) => WORDS[h]).filter(Boolean);
}

function makeQ(pool: Word[], n: number): Q {
  const answer = pool[Math.floor(Math.random() * pool.length)];
  const others = shuffle(pool.filter((w) => w.hanzi !== answer.hanzi)).slice(0, n - 1);
  return { answer, options: shuffle([answer, ...others]) };
}

export default function Quiz() {
  const [chapter, setChapter] = useState("all");
  const [mode, setMode] = useState<Mode>("see");
  const pool = useMemo(() => poolFor(chapter), [chapter]);
  const [q, setQ] = useState<Q>(() => makeQ(poolFor("all"), 3));
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const next = (p = pool) => {
    setPicked(null);
    const nq = makeQ(p, Math.min(p.length, p.length > 6 ? 3 : 2));
    setQ(nq);
    if (mode === "hear") setTimeout(() => speakTwice(nq.answer.hanzi), 300);
  };

  const changeChapter = (id: string) => {
    setChapter(id);
    next(poolFor(id));
  };

  const ask = () => {
    if (mode === "hear") return speakTwice(q.answer.hanzi);
    const names = q.options.map((o) => o.pinyin);
    const text = names.length === 2 ? `Is this ${names[0]} or ${names[1]}?` : `Is this ${names.slice(0, -1).join(", ")}, or ${names.at(-1)}?`;
    speak(text, "en", 0.85);
  };

  const pick = (w: Word) => {
    if (picked) return;
    setPicked(w.hanzi);
    if (w.hanzi === q.answer.hanzi) {
      sparkle();
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      speak(q.answer.hanzi);
    } else {
      setStreak(0);
      speak(`It's ${q.answer.pinyin}!`, "en", 0.85);
    }
  };

  const correct = picked === q.answer.hanzi;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {[{ id: "all", short: "All words", emoji: "🌈", color: "from-sky-200 to-pink-200" }, ...CHAPTERS.filter((c) => c.id.startsWith("c"))].map((c) => (
            <button
              key={c.id}
              onClick={() => changeChapter(c.id)}
              className={`rounded-full bg-gradient-to-r px-4 py-1.5 text-sm font-bold ${c.color} ${chapter === c.id ? "ring-4 ring-white shadow-lg" : "opacity-70"}`}
            >
              {c.emoji} {c.short}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["see", "hear"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setPicked(null);
              }}
              className={`rounded-2xl px-4 py-2 text-sm font-bold ${mode === m ? "bg-slate-800 text-white" : "bg-white text-slate-600 shadow"}`}
            >
              {m === "see" ? "👀 See it — pick the sound" : "👂 Hear it — pick the character"}
            </button>
          ))}
        </div>

        <div className="paper relative overflow-hidden rounded-[2rem] border-8 border-white bg-gradient-to-br from-amber-100 via-yellow-50 to-sky-100 p-6 text-center shadow-2xl">
          <div className="text-lg font-bold text-slate-500">
            {mode === "see" ? (
              <>
                Is this{" "}
                {q.options.map((o, i) => (
                  <span key={o.hanzi}>
                    <b className="text-rose-500">{o.pinyin}</b>
                    {i < q.options.length - 2 ? ", " : i === q.options.length - 2 ? " or " : "?"}
                  </span>
                ))}
              </>
            ) : (
              "Listen carefully… which one did you hear?"
            )}
          </div>

          {mode === "see" ? (
            <div key={q.answer.hanzi} className="glow-gold font-han animate-pop my-4 text-[8rem] font-black leading-none sm:text-[10rem]">
              {q.answer.hanzi}
            </div>
          ) : (
            <button onClick={ask} className="animate-pop my-6 inline-flex h-36 w-36 items-center justify-center rounded-full bg-white text-6xl shadow-xl hover:scale-105">
              🔊
            </button>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {q.options.map((o) => {
              const state = picked ? (o.hanzi === q.answer.hanzi ? "right" : o.hanzi === picked ? "wrong" : "dim") : "none";
              return (
                <button
                  key={o.hanzi}
                  onClick={() => pick(o)}
                  className={`min-w-28 rounded-3xl border-4 px-5 py-3 text-2xl font-extrabold shadow transition hover:-translate-y-1 ${
                    state === "right"
                      ? "border-emerald-400 bg-emerald-100"
                      : state === "wrong"
                        ? "border-rose-300 bg-rose-50 opacity-70"
                        : state === "dim"
                          ? "border-white bg-white opacity-50"
                          : "border-white bg-white"
                  }`}
                >
                  {mode === "see" ? o.pinyin : <span className="font-han text-4xl">{o.hanzi}</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-center gap-3">
            <button onClick={ask} className="rounded-full bg-sky-400 px-5 py-2 font-bold text-white hover:bg-sky-500">
              🔊 {mode === "see" ? "Ask me" : "Play again"}
            </button>
            {picked && (
              <button onClick={() => next()} className="animate-pop rounded-full bg-emerald-400 px-5 py-2 font-bold text-white hover:bg-emerald-500">
                Next ➜
              </button>
            )}
          </div>

          {picked && (
            <div className="animate-rise mt-4 text-xl font-extrabold">
              {correct ? (
                <span className="text-emerald-600">🎉 Great job! {q.answer.hanzi} = {q.answer.pinyin} = {q.answer.en} {q.answer.emoji}</span>
              ) : (
                <span className="text-rose-500">
                  Almost! It's <span className="font-han">{q.answer.hanzi}</span> {q.answer.pinyin} — {q.answer.en}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl bg-white p-5 text-center shadow-md">
          <Peshini className="mx-auto h-40" mood={picked ? (correct ? "wow" : "happy") : "happy"} />
          <div className="mt-2 text-3xl font-extrabold text-amber-500">⭐ {score}</div>
          <div className="text-sm text-slate-500">stars collected · streak {streak} 🔥</div>
          <div className="mt-2 flex flex-wrap justify-center text-xl">
            {Array.from({ length: Math.min(score, 20) }).map((_, i) => (
              <span key={i} className="animate-pop" style={{ animationDelay: `${i * 0.03}s` }}>
                ⭐
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-md">
          <div className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Word garden · {pool.length} words · tap for sound 🔊</div>
          <div className="grid max-h-96 grid-cols-4 gap-2 overflow-y-auto pr-1">
            {pool.map((w) => (
              <button
                key={w.hanzi}
                onClick={() => speakTwice(w.hanzi)}
                title={`${w.pinyin} — ${w.en}`}
                className="rounded-2xl bg-amber-50 p-2 text-center transition hover:-translate-y-0.5 hover:bg-amber-100"
              >
                <div className="font-han text-xl font-black">{w.hanzi}</div>
                <div className="truncate text-[10px] font-bold text-rose-500">{w.pinyin}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
