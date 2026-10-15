import { motion } from "framer-motion";
import { ArrowDownLeft, Download } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function Hero({ ready }) {
  return (
    <section
      id="home"
      className="relative h-svh min-h-[560px] overflow-hidden"
    >
      <div aria-hidden className="spotlight absolute inset-0" />

      {/* Headline + info row (no z-index here, so children layer against the photo) */}
      <div className="absolute inset-x-0 top-[17%] md:top-[30%]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="silver-text relative z-10 select-none text-center font-display text-[15.5vw] font-black leading-none tracking-tight"
        >
          <span className="sr-only">
            Chandra Narayan Panda, Aspiring Web Developer and AI/ML Enthusiast,{" "}
          </span>
          PORTFOLIO
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="relative z-30 mt-3 flex flex-col items-center gap-4 px-[3vw] md:flex-row md:items-start md:justify-between"
        >
          <p className="text-center text-lg leading-snug md:max-w-[27vw] md:text-left md:text-2xl">
            <span className="font-semibold">Aspiring Web</span>{" "}
            <span className="font-serif italic text-white/80">Developer</span>
            <span className="mt-1 block font-serif text-base italic text-lime md:text-xl">
              AI/ML Enthusiast
            </span>
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#projects"
              aria-label="View my projects"
              className="grid size-11 place-items-center rounded-full border border-white/25 transition hover:bg-lime hover:text-black"
            >
              <ArrowDownLeft size={16} />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm italic text-white/80 transition hover:bg-lime hover:text-black"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/80 transition hover:bg-lime hover:text-black"
            >
              <Download size={14} /> Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Photo: wrapper handles position, motion.img handles the slide-up */}
      <div className="absolute bottom-[6vh] left-1/2 z-20 w-[92vw] max-w-[640px] -translate-x-1/2 md:w-[42vw]">
        <motion.img
          src="/images/hero-suit.webp"
          alt="Chandra Narayan Panda in a black suit"
          width="1024"
          height="1053"
          fetchPriority="high"
          initial={{ y: "100%" }}
          animate={ready ? { y: 0 } : {}}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="block h-auto w-full"
        />
      </div>

      {/* Soft fade at the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[22vh] bg-gradient-to-t from-black via-black/80 to-transparent"
      />
    </section>
  );
}