let voicesCache: SpeechSynthesisVoice[] = [];

function loadVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  voicesCache = window.speechSynthesis.getVoices();
}
if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice(lang: "zh" | "en") {
  const list = voicesCache.length ? voicesCache : window.speechSynthesis.getVoices();
  if (lang === "zh") {
    return list.find((v) => /zh[-_]CN/i.test(v.lang)) || list.find((v) => /^zh/i.test(v.lang));
  }
  return (
    list.find((v) => /en[-_]/i.test(v.lang) && /female|samantha|google us|zira|aria|jenny/i.test(v.name)) ||
    list.find((v) => /^en/i.test(v.lang))
  );
}

export const speechSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;

export function speak(text: string, lang: "zh" | "en" = "zh", rate = 0.7): Promise<void> {
  return new Promise((resolve) => {
    if (!speechSupported()) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "zh" ? "zh-CN" : "en-US";
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = lang === "en" ? 1.15 : 1.05;
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    u.onend = finish;
    u.onerror = finish;
    // safety timeout
    setTimeout(finish, 2500 + text.length * 250);
    window.speechSynthesis.speak(u);
  });
}

export function stopSpeech() {
  if (speechSupported()) window.speechSynthesis.cancel();
}

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Speak a word twice with a pause, following the "spoken twice + pause" rule */
export async function speakTwice(hanzi: string, cancelled: () => boolean = () => false) {
  await speak(hanzi);
  if (cancelled()) return;
  await wait(600);
  if (cancelled()) return;
  await speak(hanzi);
}

/** Soft "pop + sparkle" SFX via WebAudio */
let ctx: AudioContext | null = null;
export function sparkle() {
  try {
    ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;
    [880, 1320, 1760].forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.06);
      g.gain.linearRampToValueAtTime(0.08, now + i * 0.06 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.35);
      o.connect(g).connect(ctx!.destination);
      o.start(now + i * 0.06);
      o.stop(now + i * 0.06 + 0.4);
    });
  } catch {
    /* ignore */
  }
}
