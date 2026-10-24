import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowDownLeft, Download } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const HERO_SRC = "/images/hero-suit.webp";
const ROBOT_SRC = "/images/robot-hero.webp";

function Actions({ arrow, mobile }) {
  return (
    <div className="flex items-center gap-3">
      {arrow && (
        <a
          href="#projects"
          aria-label="View my projects"
          className="grid size-11 place-items-center rounded-full border border-white/25 transition hover:bg-lime hover:text-black"
        >
          <ArrowDownLeft size={16} />
        </a>
      )}
      <a
        href="#contact"
        className={`rounded-full border px-5 py-2.5 text-sm italic transition hover:bg-lime hover:text-black ${
          mobile
            ? "border-white/30 bg-black/50 text-white backdrop-blur"
            : "border-white/20 text-white/80"
        }`}
      >
        Contact
      </a>
      <a
        href="/resume.pdf"
        download
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition hover:bg-white hover:text-black ${
          mobile
            ? "bg-lime font-medium text-black"
            : "border border-white/20 text-white/80 hover:bg-lime"
        }`}
      >
        <Download size={14} /> Resume
      </a>
    </div>
  );
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion();
  const boxRef = useRef(null);
  const touched = useRef(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rad = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 30 });
  const sy = useSpring(my, { stiffness: 260, damping: 30 });
  const sr = useSpring(rad, { stiffness: 200, damping: 24 });

  const mask = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}px ${sy}px, #000 55%, transparent 100%)`;

  const radiusFor = (rect) => Math.min(190, Math.max(100, rect.width * 0.3));

  const track = (e) => {
    if (reduce || !boxRef.current) return;
    if (e.pointerType === "touch") touched.current = true;
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rad.get() < 1) {
      sx.jump(x);
      sy.jump(y);
    }
    mx.set(x);
    my.set(y);
    rad.set(radiusFor(rect));
  };

  const leave = () => rad.set(0);

  /* Phones have no mouse, so the circle drifts over the face by itself
     until the visitor touches the photo. */
  useEffect(() => {
    if (reduce || !ready) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    let raf;
    const start = performance.now();
    const loop = (now) => {
      if (touched.current) return;
      const box = boxRef.current;
      if (box) {
        const w = box.clientWidth;
        const h = box.clientHeight;
        const t = (now - start) / 1000;
        mx.set(w * (0.5 + 0.2 * Math.sin(t * 0.9)));
        my.set(h * (0.3 + 0.1 * Math.sin(t * 1.3 + 1)));
        rad.set(Math.min(190, Math.max(100, w * 0.3)));
      }
      raf = requestAnimationFrame(loop);
    };
    const id = setTimeout(() => {
      raf = requestAnimationFrame(loop);
    }, 2200);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [ready, reduce, mx, my, rad]);

  return (
    <section
      id="home"
      className="relative h-svh min-h-[560px] overflow-hidden"
    >
      <div aria-hidden className="spotlight absolute inset-0" />

      {/* Headline + info row (no z-index here, so children layer against the photo) */}
      <div className="absolute inset-x-0 top-[15%] md:top-[30%]">
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

          {/* computer: buttons stay in this row */}
          <div className="hidden md:block">
            <Actions arrow />
          </div>
        </motion.div>
      </div>

      {/* Hero photo with the robot revealed by the cursor */}
      <div className="absolute bottom-[13vh] left-1/2 z-20 w-[88vw] max-w-[640px] -translate-x-1/2 md:bottom-[6vh] md:w-[42vw]">
        <motion.div
          ref={boxRef}
          onPointerEnter={track}
          onPointerMove={track}
          onPointerDown={track}
          onPointerLeave={leave}
          initial={{ y: "100%" }}
          animate={ready ? { y: 0 } : {}}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="relative"
        >
          <img
            src={HERO_SRC}
            alt="Chandra Narayan Panda in a black suit"
            width="1024"
            height="1053"
            fetchPriority="high"
            className="block h-auto w-full"
          />

          {!reduce && (
            <motion.img
              aria-hidden
              src={ROBOT_SRC}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
              style={{ WebkitMaskImage: mask, maskImage: mask }}
            />
          )}
        </motion.div>
      </div>

      {/* Soft fade at the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[22vh] bg-gradient-to-t from-black via-black/80 to-transparent"
      />

      {/* phone: Contact and Resume at the bottom, clear of the photo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 1.2 }}
        className="absolute inset-x-0 bottom-[4vh] z-30 flex justify-center px-[3vw] md:hidden"
      >
        <Actions mobile />
      </motion.div>
    </section>
  );
}