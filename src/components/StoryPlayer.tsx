import { useEffect, useRef, useState } from "react";
import { ALL_SCENES, CHAPTERS, WORDS } from "../data";
import { sparkle, speak, speechSupported, stopSpeech, wait } from "../speech";
import Peshini from "./Peshini";
import { ToneStrip } from "./Tone";

type Phase = "idle" | "vo" | "word1" | "word2" | "yourturn";

export default function StoryPlayer() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [active, setActive] = useState(-1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [copied, setCopied] = useState(false);
  const runId = useRef(0);

  const scene = ALL_SCENES[sceneIdx];
  const activeWord = active >= 0 ? WORDS[scene.words[active]] : null;
  const isNight = /indigo-3/.test(scene.bg);

  useEffect(() => () => stopSpeech(), []);

  const stop = () => {
    runId.current++;
    stopSpeech();
    setPlaying(false);
    setPhase("idle");
  };

  const playFrom = async (start: number) => {
    const my = ++runId.current;
    const c = () => runId.current !== my;
    setPlaying(true);
    setStarted(true);
    for (let s = start; s < ALL_SCENES.length; s++) {
      if (c()) return;
      setSceneIdx(s);
      setActive(-1);
      setPhase("vo");
      await wait(700);
      if (c()) return;
      await speak(ALL_SCENES[s].vo, "en", 0.9);
      if (c()) return;
      const words = ALL_SCENES[s].words;
      for (let w = 0; w < words.length; w++) {
        if (c()) return;
        setActive(w);
        setPhase("word1");
        sparkle();
        await wait(350);
        await speak(words[w]);
        if (c()) return;
        await wait(500);
        setPhase("word2");
        await speak(words[w]);
        if (c()) return;
        setPhase("yourturn");
        await wait(1800);
      }
      if (c()) return;
      setPhase("idle");
      await wait(900);
    }
    setPlaying(false);
    setPhase("idle");
  };

  const goScene = (i: number) => {
    stop();
    setStarted(true);
    setSceneIdx(Math.max(0, Math.min(ALL_SCENES.length - 1, i)));
    setActive(-1);
  };

  const tapWord = async (i: number) => {
    stop();
    const my = runId.current;
    setActive(i);
    setPhase("word1");
    sparkle();
    await speak(scene.words[i]);
    if (runId.current !== my) return;
    await wait(500);
    setPhase("word2");
    await speak(scene.words[i]);
    if (runId.current !== my) return;
    setPhase("yourturn");
    await wait(1600);
    if (runId.current === my) setPhase("idle");
  };

  const copyPrompt = () => {
    navigator.clipboard?.writeText(scene.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="space-y-4">
      {/* Chapter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CHAPTERS.map((ch) => {
          const first = ALL_SCENES.findIndex((s) => s.chapter.id === ch.id);
          const on = scene.chapter.id === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => goScene(first)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition bg-gradient-to-r ${ch.color} ${
                on ? "ring-4 ring-white shadow-lg scale-105" : "opacity-70 hover:opacity-100"
              }`}
            >
              {ch.emoji} {ch.short}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-[2rem] border-8 border-white bg-gradient-to-br shadow-2xl paper ${scene.bg}`}
      >
        {/* stars at night */}
        {isNight &&
          Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-white animate-twinkle"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 45}%`, animationDelay: `${i * 0.3}s`, fontSize: 10 + (i % 3) * 5 }}
            >
              ✦
            </span>
          ))}

        {/* ground */}
        <div className="absolute inset-x-0 bottom-0 h-[18%] rounded-t-[50%] bg-white/40" />

        {/* floating props */}
        {scene.props.map((p, i) => (
          <span
            key={scene.id + p + i}
            className="absolute select-none animate-floaty drop-shadow-lg"
            style={{
              right: `${6 + (i % 2) * 16}%`,
              top: `${10 + Math.floor(i / 2) * 36 + (i % 2) * 8}%`,
              fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {p}
          </span>
        ))}

        {/* Peshini */}
        <div className="absolute bottom-[4%] left-[4%] h-[78%] animate-bounce-soft">
          <Peshini
            className="h-full w-auto drop-shadow-xl"
            mood={isNight && scene.id === 18 ? "sleepy" : phase === "word1" ? "wow" : "happy"}
            wave={phase !== "yourturn"}
          />
        </div>

        {/* Center word */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pl-[18%] pr-[22%]">
          {!started ? (
            <button
              onClick={() => playFrom(0)}
              className="animate-book-glow rounded-3xl bg-white/85 px-6 py-5 text-center shadow-xl transition hover:scale-105 sm:px-10 sm:py-8"
            >
              <div className="text-4xl sm:text-6xl">📖✨</div>
              <div className="mt-2 text-xl font-extrabold text-rose-500 sm:text-3xl">Open the Storybook!</div>
              <div className="text-sm text-slate-500 sm:text-base">Tap to start Peshini's adventure</div>
            </button>
          ) : activeWord ? (
            <div key={scene.id + "-" + active} className="flex flex-col items-center animate-pop">
              <div className="rounded-full bg-white/80 px-4 py-0.5 text-lg font-extrabold text-rose-500 sm:text-3xl">
                {activeWord.pinyin}
              </div>
              <div
                className="glow-gold font-han font-black leading-none"
                style={{ fontSize: activeWord.hanzi.length > 2 ? "clamp(3rem,11vw,8rem)" : "clamp(4rem,16vw,11rem)" }}
              >
                {activeWord.hanzi}
              </div>
              <div className="mt-1 flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-1 text-base font-bold sm:text-2xl">
                <span>{activeWord.emoji}</span> {activeWord.en}
              </div>
              <div className="mt-2 hidden sm:block">
                <ToneStrip pinyin={activeWord.pinyin} showLabel />
              </div>
            </div>
          ) : (
            <div key={scene.id} className="animate-rise text-center">
              <div className="text-sm font-bold uppercase tracking-widest text-slate-600/70 sm:text-base">
                Scene {scene.id} · {scene.chapter.short}
              </div>
              <div className="text-2xl font-extrabold text-slate-700 drop-shadow sm:text-5xl">{scene.title}</div>
            </div>
          )}
        </div>

        {/* overlay banner */}
        {started && scene.overlay && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rotate-[-2deg] rounded-2xl bg-rose-400 px-4 py-1 text-sm font-extrabold text-white shadow-lg sm:text-2xl">
            {scene.overlay}
          </div>
        )}

        {/* phase indicator */}
        {phase === "yourturn" && (
          <div className="absolute right-4 top-4 animate-pop rounded-2xl bg-emerald-400 px-3 py-1 text-sm font-extrabold text-white shadow-lg sm:text-xl">
            🗣️ Your turn! Say it!
          </div>
        )}
        {(phase === "word1" || phase === "word2") && (
          <div className="absolute right-4 top-4 rounded-2xl bg-white/85 px-3 py-1 text-xs font-bold text-slate-600 sm:text-base">
            🔊 Listen {phase === "word1" ? "1" : "2"}/2
          </div>
        )}

        {/* subtitle */}
        {started && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center px-4">
            <div className="max-w-[80%] rounded-2xl bg-slate-900/60 px-4 py-1.5 text-center text-xs font-semibold text-white backdrop-blur sm:text-lg">
              {scene.vo}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-3 shadow-md">
        <div className="flex items-center gap-2">
          <button onClick={() => goScene(sceneIdx - 1)} className="rounded-full bg-amber-100 px-4 py-2 text-xl font-bold hover:bg-amber-200" aria-label="Previous scene">
            ⏮
          </button>
          {playing ? (
            <button onClick={stop} className="rounded-full bg-rose-400 px-6 py-2 text-lg font-extrabold text-white shadow hover:bg-rose-500">
              ⏸ Pause
            </button>
          ) : (
            <button onClick={() => playFrom(sceneIdx)} className="rounded-full bg-emerald-400 px-6 py-2 text-lg font-extrabold text-white shadow hover:bg-emerald-500">
              ▶ Play
            </button>
          )}
          <button onClick={() => goScene(sceneIdx + 1)} className="rounded-full bg-amber-100 px-4 py-2 text-xl font-bold hover:bg-amber-200" aria-label="Next scene">
            ⏭
          </button>
        </div>
        <div className="flex flex-1 items-center gap-1 px-2" aria-label="progress">
          {ALL_SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goScene(i)}
              title={`Scene ${s.id}: ${s.title}`}
              className={`h-3 flex-1 rounded-full transition ${i === sceneIdx ? "bg-rose-400 scale-y-150" : i < sceneIdx ? "bg-amber-300" : "bg-slate-200"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setShowNotes((v) => !v)}
          className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-200"
        >
          🎬 {showNotes ? "Hide" : "Director's"} notes
        </button>
      </div>

      {!speechSupported() && (
        <p className="rounded-2xl bg-amber-100 p-3 text-sm">Your browser doesn't support speech — the story still plays visually.</p>
      )}

      {/* Word chips */}
      {scene.words.length > 0 && (
        <div className="rounded-3xl bg-white p-4 shadow-md">
          <div className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Tap a word to hear it twice</div>
          <div className="flex flex-wrap gap-2">
            {scene.words.map((w, i) => {
              const word = WORDS[w];
              return (
                <button
                  key={w + i}
                  onClick={() => tapWord(i)}
                  className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 transition hover:-translate-y-0.5 ${
                    i === active ? "border-amber-400 bg-amber-50 shadow" : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <span className="font-han text-2xl font-black text-slate-800">{word.hanzi}</span>
                  <span className="text-left leading-tight">
                    <span className="block text-sm font-bold text-rose-500">{word.pinyin}</span>
                    <span className="block text-xs text-slate-500">{word.en}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showNotes && (
        <div className="animate-rise rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-500">
                {scene.chapter.name} · Scene {scene.id}
              </div>
              <p className="mt-1 text-slate-700">{scene.prompt}</p>
              <p className="mt-2 text-sm text-slate-500">
                <b>VO:</b> “{scene.vo}”
              </p>
            </div>
            <button onClick={copyPrompt} className="shrink-0 rounded-full bg-violet-500 px-3 py-1.5 text-sm font-bold text-white hover:bg-violet-600">
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
