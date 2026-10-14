import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORD = "CHANDRA";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Preloader({ onDone }) {
  const [text, setText] = useState(WORD);

  useEffect(() => {
    let timeout;
    let step = 0;
    const tick = setInterval(() => {
      step += 0.3;
      const solved = Math.floor(step);
      setText(
        WORD.split("")
          .map((ch, i) =>
            i < solved ? ch : LETTERS[Math.floor(Math.random() * LETTERS.length)]
          )
          .join("")
      );
      if (solved >= WORD.length) {
        clearInterval(tick);
        timeout = setTimeout(onDone, 500);
      }
    }, 50);
    return () => {
      clearInterval(tick);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[90] grid place-items-center bg-black"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div aria-hidden className="spotlight absolute inset-0" />
      <p
        aria-hidden
        className="silver-text relative font-display text-[15vw] font-black leading-none tracking-tight md:text-[10vw]"
      >
        {text}
      </p>
    </motion.div>
  );
}