import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { introText } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

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

const facts = [
  { label: "Education", value: "B.Tech CSE, final year" },
  { label: "College", value: "Gandhi Engineering College" },
  { label: "Build with", value: "React, Tailwind CSS, Flask, FastAPI" },
  { label: "Looking for", value: "Entry-level Web Developer role" },
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

const paraClass =
  "text-base leading-relaxed text-white/85 md:columns-2 md:gap-14 md:text-lg";

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

/* ---------- stacked 3D name (scales to its column on every screen) ---------- */
const LAYERS = 14;
const DEPTH = 1.1;
const LINES = [
  { id: "n1", text: "CHANDRA", y: 170, len: 900 },
  { id: "n2", text: "NARAYAN", y: 360, len: 900 },
  { id: "n3", text: "PANDA", y: 550, len: 650 },
];

function Name3D({ reduce }) {
  const depth = Array.from({ length: LAYERS }, (_, k) => LAYERS - k);
  return (
    <svg
      viewBox="0 0 1000 600"
      className="block h-auto w-full"
      role="img"
      aria-label="Chandra Narayan Panda"
    >
      <defs>
        {LINES.map((l) => (
          <text
            key={l.id}
            id={l.id}
            x="20"
            y={l.y}
            fontSize="180"
            fontWeight="900"
            textLength={l.len}
            lengthAdjust="spacingAndGlyphs"
            style={{ fontFamily: "'Archivo', 'Arial Black', sans-serif" }}
          >
            {l.text}
          </text>
        ))}

        <linearGradient
          id="shine"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="200"
          y2="80"
        >
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          {!reduce && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-300 0"
              to="1200 0"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>

      {LINES.map((l) => (
        <g key={l.id}>
          {depth.map((i) => (
            <use
              key={i}
              href={`#${l.id}`}
              x={i * DEPTH}
              y={i * DEPTH}
              fill={`hsl(220 8% ${8 + (1 - i / LAYERS) * 24}%)`}
            />
          ))}
          {/* lime front face */}
          <use href={`#${l.id}`} fill="#d4ff3a" />
          {/* light sweep */}
          <use href={`#${l.id}`} fill="url(#shine)" />
        </g>
      ))}

      {/* dot after PANDA */}
      <circle cx="740" cy="535" r="20" fill="#d4ff3a" />
    </svg>
  );
}


export default function Intro() {
  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  /* gentle 3D tilt of the name with the mouse (computer only) */
  const nameRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = nameRef.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section
      id="about"
      className="relative mt-24 overflow-x-clip px-[3vw] md:mt-36"
    >
      <h2 className="font-display text-[14vw] font-black uppercase leading-[0.9] md:text-[7vw]">
        <span className="silver-text">About</span>{" "}
        <span className="font-serif font-normal normal-case italic text-white/80">
          me
        </span>
      </h2>

      <div className="mt-10 grid items-center gap-12 md:mt-16 md:grid-cols-2 md:gap-14">
        {/* Name (right on computer, top on phone) */}
        <motion.div
          ref={nameRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative min-w-0"
          style={{ perspective: 900 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-lime/10 blur-3xl"
          />
          <motion.div style={{ rotateX: srx, rotateY: sry }}>
            <Name3D reduce={reduce} />
          </motion.div>
          <p className="mt-4 font-serif text-xl italic text-white/70 md:text-2xl">
            Web developer, final-year B.Tech CSE student
          </p>
        </motion.div>

        {/* Photo (left on computer, below the name on phone) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-[360px] md:order-first md:ml-0 md:mr-auto"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-lime/10 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
            {imgFailed ? (
              <div className="grid aspect-[864/1233] w-full place-items-center p-6 text-center text-sm text-white/60">
                Photo not found. Check the file name in public/images.
              </div>
            ) : (
              <img
                src="/images/intro-casual.webp"
                alt="Chandra Narayan Panda standing in a white linen shirt"
                width="1200"
                height="1607"
                onError={() => setImgFailed(true)}
                className="block h-auto w-full"
              />
            )}
            <span aria-hidden className="absolute left-0 top-0 h-16 w-[2px] bg-lime" />
            <span aria-hidden className="absolute left-0 top-0 h-[2px] w-16 bg-lime" />
          </div>
        
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease }}
        className="mx-auto mt-16 max-w-5xl border-t border-white/15 pt-8 md:mt-24"
      >
        {reduce ? <PlainText /> : <RevealText />}
      </motion.div>

      <ul className="mx-auto mt-12 grid max-w-5xl gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 md:grid-cols-4">
        {facts.map((f) => (
          <li key={f.label}>
            <span className="block text-xs uppercase tracking-wider text-lime">
              {f.label}
            </span>
            <span className="mt-2 block text-sm text-white/80">{f.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}