import { useState } from "react";
import StoryPlayer from "./components/StoryPlayer";
import Quiz from "./components/Quiz";
import WordSheet from "./components/WordSheet";
import Peshini from "./components/Peshini";
import { stopSpeech } from "./speech";

type Tab = "story" | "sheet" | "quiz";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "story", label: "Watch the Story", emoji: "📖" },
  { id: "sheet", label: "Word Sheet · 99", emoji: "📋" },
  { id: "quiz", label: "Play & Review", emoji: "⭐" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("story");

  return (
    <div className="paper min-h-screen">
      <header className="relative overflow-hidden bg-gradient-to-br from-amber-200 via-rose-200 to-violet-200">
        <div className="pointer-events-none absolute inset-0">
          {["一", "人", "日", "月", "山", "爱", "花", "大"].map((c, i) => (
            <span
              key={c}
              className="font-han absolute animate-floaty font-black text-white/50"
              style={{ left: `${8 + i * 12}%`, top: `${15 + ((i * 29) % 60)}%`, fontSize: 28 + (i % 3) * 14, animationDelay: `${i * 0.5}s` }}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-4 pb-0 pt-6">
          <Peshini className="h-28 shrink-0 sm:h-36" />
          <div className="pb-6">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-800 sm:text-5xl">
              Peshini's <span className="text-rose-500">Mandarin</span> Adventure
            </h1>
            <p className="text-sm font-semibold text-slate-600 sm:text-lg">
              An animated storybook for ages 3–6 · 你好! Let's learn Chinese together.
            </p>
          </div>
        </div>
        <nav className="relative mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                stopSpeech();
                setTab(t.id);
              }}
              className={`shrink-0 rounded-t-3xl px-5 py-3 text-base font-extrabold transition ${
                tab === t.id ? "bg-[#fff8ee] text-slate-800" : "bg-white/40 text-slate-600 hover:bg-white/70"
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === "story" && <StoryPlayer />}
        {tab === "sheet" && <WordSheet />}
        {tab === "quiz" && <Quiz />}
      </main>

      <footer className="pb-8 text-center text-sm text-slate-400">
        Every word: shown on screen · spoken twice · pause to repeat 🗣️ · 再见 zài jiàn!
      </footer>
    </div>
  );
}
