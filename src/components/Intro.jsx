import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
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

export default function Intro() {
  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

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

      <div className="mt-10 grid items-center gap-10 md:mt-16 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:gap-16">
        {/* Photo: one photo, on the left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto w-full max-w-[340px] md:mx-0 md:max-w-none"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
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
            Web developer, final-year B.Tech CSE student
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease }}
            className="mt-8 border-t border-white/10 pt-6"
          >
            {reduce ? <PlainText /> : <RevealText />}
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