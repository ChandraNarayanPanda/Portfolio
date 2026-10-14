import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { introText } from "../data/content";

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

function RevealText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });
  return (
    <p ref={ref} className="text-base leading-relaxed text-white/85 md:text-lg">
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
    <p className="text-base leading-relaxed text-white/85 md:text-lg">
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

  return (
    <section id="about" className="relative px-[3vw] pt-24 md:pt-36">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-x-16 md:gap-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="silver-text font-display text-[22vw] font-black leading-none md:col-start-2 md:row-start-1 md:text-[9vw]"
        >
          Intro
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-[72vw] max-w-[340px] md:col-start-1 md:row-span-2 md:row-start-1 md:mx-0 md:w-full md:max-w-[400px]"
        >
          <img
            src="/images/intro-casual.webp"
            alt="Chandra Narayan Panda standing in a white linen shirt"
            width="864"
            height="1233"
            loading="lazy"
            className="block h-auto w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
          />
        </motion.div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:col-start-2 md:row-start-2 md:self-start md:p-8">
          {reduce ? <PlainText /> : <RevealText />}
        </div>
      </div>
    </section>
  );
}