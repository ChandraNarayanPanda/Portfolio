import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Play, Square } from "lucide-react";
import { introText } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

/* Your own recorded voice (best quality). Put the file in public/audio/
   Example: const AUDIO_SRC = "/audio/intro.mp3";
   Leave null to use the browser voice. */
const AUDIO_SRC = null;

const words = introText
  .split(/(\*\*[^*]+\*\*)/)
  .filter(Boolean)
  .flatMap((part) => {
    const bold = part.startsWith("**");
    const clean = bold ? part.slice(2, -2) : part;
    return clean
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, bold }));
  });

/* plain text for the voice, plus where each word starts */
const plain = words.map((x) => x.w).join(" ");
const starts = [];
{
  let pos = 0;
  words.forEach((x) => {
    starts.push(pos);
    pos += x.w.length + 1;
  });
}
const wordAt = (charPos) => {
  let idx = 0;
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] <= charPos) idx = i;
    else break;
  }
  return idx;
};

/* split into sentences (long speech gets cut off in some browsers) */
const sentences = [];
{
  const parts = plain.match(/[^.!?]+[.!?]+(\s|$)/g) || [plain];
  let cursor = 0;
  parts.forEach((p) => {
    const offset = plain.indexOf(p, cursor);
    sentences.push({ text: p.trim(), offset: offset < 0 ? cursor : offset });
    cursor = (offset < 0 ? cursor : offset) + p.length;
  });
}

const facts = [
  { label: "Education", value: "B.Tech CSE, final year" },
  { label: "College", value: "Gandhi Engineering College" },
  { label: "Build with", value: "React, Flask, FastAPI, Scikit-learn" },
  { label: "Looking for", value: "Entry-level Web Developer or AI/ML role" },
];

function Word({ children, bold, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.28em] inline-block ${bold ? "font-semibold text-white" : ""}`}
    >
      {children}
    </motion.span>
  );
}

const paraClass = "text-base leading-relaxed text-white/80 md:text-lg";

function RevealText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });
  return (
    <p ref={ref} className={paraClass}>
      {words.map((item, i) => (
        <Word
          key={i}
          bold={item.bold}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 4) / words.length)]}
        >
          {item.w}
        </Word>
      ))}
    </p>
  );
}

function PlainText() {
  return (
    <p className={paraClass}>
      {words.map((item, i) => (
        <span
          key={i}
          className={`mr-[0.28em] inline-block ${item.bold ? "font-semibold text-white" : ""}`}
        >
          {item.w}
        </span>
      ))}
    </p>
  );
}

/* the words light up while the voice speaks */
function SpeakingText({ active }) {
  return (
    <p className={paraClass} aria-live="off">
      {words.map((item, i) => {
        const state =
          i < active ? "text-white/90" : i === active ? "text-lime" : "text-white/30";
        return (
          <span
            key={i}
            className={`mr-[0.28em] inline-block transition-colors duration-150 ${state} ${
              item.bold ? "font-semibold" : ""
            }`}
          >
            {item.w}
          </span>
        );
      })}
    </p>
  );
}

function pickVoice() {
  const list = window.speechSynthesis.getVoices();
  return (
    list.find((v) => v.lang === "en-IN") ||
    list.find((v) => v.lang === "en-GB") ||
    list.find((v) => v.lang === "en-US") ||
    list.find((v) => v.lang.startsWith("en")) ||
    null
  );
}

export default function Intro() {
  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  /* ---------- voice intro ---------- */
  const [canSpeak] = useState(
    () =>
      Boolean(AUDIO_SRC) ||
      (typeof window !== "undefined" && "speechSynthesis" in window)
  );
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(-1);
  const runId = useRef(0);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);

  const level = useMotionValue(0);
  const photoScale = useTransform(level, [0, 1], [1, 1.035]);
  const ringScale = useTransform(level, [0, 1], [1, 1.1]);
  const ringOpacity = useTransform(level, [0, 1], [0.25, 0.9]);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.1 });

  const finish = useCallback(() => {
    setPlaying(false);
    setActive(-1);
    level.set(0);
  }, [level]);

  const stop = useCallback(() => {
    runId.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) audioRef.current.pause();
    finish();
  }, [finish]);

  const playTTS = (id) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const voice = pickVoice();
    let n = 0;
    const next = () => {
      if (runId.current !== id) return;
      if (n >= sentences.length) {
        finish();
        return;
      }
      const s = sentences[n];
      const u = new SpeechSynthesisUtterance(s.text);
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
      } else {
        u.lang = "en-IN";
      }
      u.rate = 0.95;
      u.onstart = () => {
        if (runId.current === id) setActive(wordAt(s.offset));
      };
      u.onboundary = (e) => {
        if (runId.current === id) setActive(wordAt(s.offset + e.charIndex));
      };
      u.onend = () => {
        n += 1;
        next();
      };
      u.onerror = () => {
        if (runId.current === id) finish();
      };
      synth.speak(u);
    };
    next();
  };

  const playRecorded = () => {
    if (!audioRef.current) {
      const a = new Audio(AUDIO_SRC);
      a.preload = "auto";
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const src = ctx.createMediaElementSource(a);
      const an = ctx.createAnalyser();
      an.fftSize = 256;
      src.connect(an);
      an.connect(ctx.destination);
      a.ontimeupdate = () => {
        if (a.duration) {
          setActive(
            Math.min(
              words.length - 1,
              Math.floor((a.currentTime / a.duration) * words.length)
            )
          );
        }
      };
      a.onended = finish;
      a.onerror = finish;
      audioRef.current = a;
      ctxRef.current = ctx;
      analyserRef.current = an;
    }
    ctxRef.current.resume();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(finish);
  };

  const toggleVoice = () => {
    if (playing) {
      stop();
      return;
    }
    runId.current += 1;
    const id = runId.current;
    setPlaying(true);
    setActive(0);
    if (AUDIO_SRC) playRecorded();
    else playTTS(id);
  };

  /* pulse the rings with the voice */
  useEffect(() => {
    if (!playing || reduce) return;
    let raf;
    const data = analyserRef.current
      ? new Uint8Array(analyserRef.current.frequencyBinCount)
      : null;
    const loop = (t) => {
      if (data && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < 24; i++) sum += data[i];
        level.set(Math.min(1, (sum / 24 / 255) * 1.6));
      } else {
        level.set(
          0.25 +
            0.5 * Math.abs(Math.sin(t * 0.012)) * (0.6 + 0.4 * Math.sin(t * 0.037))
        );
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduce, level]);

  /* stop when the visitor scrolls away */
  useEffect(() => {
    if (!inView && playing) stop();
  }, [inView, playing, stop]);

  /* warm up the browser voice list, and stop on leaving the page */
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.getVoices();
    const warm = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", warm);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", warm);
      window.speechSynthesis.cancel();
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mt-24 overflow-x-clip px-[3vw] md:mt-36"
    >
      <h2 className="font-display text-[14vw] font-black uppercase leading-[0.9] md:text-[7vw]">
        <span className="silver-text">About</span>{" "}
        <span className="font-serif font-normal normal-case italic text-white/80">
          me
        </span>
      </h2>

      <div className="mt-10 grid items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:gap-16">
        {/* Photo with the voice button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto w-full max-w-[340px] md:mx-0 md:max-w-none"
        >
          <div className="relative">
            {/* rings that pulse with the voice */}
            {playing && !reduce && (
              <>
                <motion.div
                  aria-hidden
                  style={{ scale: ringScale, opacity: ringOpacity }}
                  className="pointer-events-none absolute -inset-2 rounded-[2rem] border border-lime"
                />
                <motion.div
                  aria-hidden
                  style={{ scale: ringScale, opacity: ringOpacity }}
                  className="pointer-events-none absolute -inset-5 rounded-[2.4rem] border border-lime/40"
                />
              </>
            )}

            <motion.div
              style={reduce ? undefined : { scale: photoScale }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
            >
              {imgFailed ? (
                <div className="grid aspect-[1200/1607] w-full place-items-center p-6 text-center text-sm text-white/60">
                  Photo not found. Check the file name in public/images.
                </div>
              ) : (
                <img
                  src="/images/intro-casual.webp"
                  alt="Portrait of Chandra Narayan Panda"
                  width="1200"
                  height="1607"
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                  className="block h-auto w-full"
                />
              )}

              {canSpeak && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
                  <button
                    type="button"
                    onClick={toggleVoice}
                    aria-pressed={playing}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                      playing
                        ? "bg-white text-black"
                        : "animate-pulse bg-lime text-black hover:bg-white"
                    }`}
                  >
                    {playing ? (
                      <>
                        <Square size={14} /> Stop
                      </>
                    ) : (
                      <>
                        <Play size={14} /> Hear my intro
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Name + intro text, on the right */}
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            Hello, I'm
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
              variants={{
                hidden: reduce
                  ? { clipPath: "inset(0 0% 0 0)" }
                  : { clipPath: "inset(0 100% 0 0)" },
                show: {
                  clipPath: "inset(0 0% 0 0)",
                  transition: { duration: 1.6, ease: "easeInOut" },
                },
              }}
              className="mt-2 text-balance py-3 font-hand text-[15vw] font-semibold leading-[1.05] text-[#ece8df] md:text-[5.6vw]"
            >
              Chandra Narayan Panda
            </motion.h3>
          </motion.div>

          <svg
            aria-hidden
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            className="mt-1 h-3 w-48 md:w-72"
          >
            <motion.path
              d="M2 8 C 60 2, 120 11, 180 5 S 270 6, 298 4"
              fill="none"
              stroke="rgba(236,232,223,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 1.4 }}
            />
          </svg>

          <p className="mt-4 font-serif text-xl italic text-white/60 md:text-2xl">
            Aspiring Web Developer | AI/ML Enthusiast
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease }}
            className="mt-8 border-t border-white/10 pt-6"
          >
            {playing ? (
              <SpeakingText active={active} />
            ) : reduce ? (
              <PlainText />
            ) : (
              <RevealText />
            )}
          </motion.div>
        </div>
      </div>

      <ul className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 md:grid-cols-4">
        {facts.map((f) => (
          <li key={f.label}>
            <span className="block text-xs uppercase tracking-wider text-white/45">
              {f.label}
            </span>
            <span className="mt-2 block text-sm text-white/80">{f.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}