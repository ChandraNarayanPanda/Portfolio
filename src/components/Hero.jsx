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

/* Line-up for the robot image (found by hand-tuning).
   X / Y are % of the box. Negative X = left, negative Y = up. */
const ROBOT_X = -0.25;
const ROBOT_Y = -0.25;
const ROBOT_SCALE = 1.005;

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

  /* Mouse: close the circle when the pointer leaves.
     Touch: keep it open where the finger lifted. */
  const leave = (e) => {
    if (e.pointerType === "touch") return;
    rad.set(0);
  };

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

      {/* Hero photo with the robot revealed by the cursor */}
      <div className="absolute bottom-[6vh] left-1/2 z-20 w-[92vw] max-w-[640px] -translate-x-1/2 md:w-[42vw]">
        <motion.div
          ref={boxRef}
          onPointerEnter={track}
          onPointerMove={track}
          onPointerDown={track}
          onPointerLeave={leave}
          initial={{ y: "100%" }}
          animate={ready ? { y: 0 } : {}}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="relative aspect-[1024/1053] w-full touch-pan-y"
        >
          <img
            src={HERO_SRC}
            alt="Chandra Narayan Panda in a black suit"
            width="1024"
            height="1053"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-contain object-bottom"
          />

          {!reduce && (
            /* The mask wrapper never moves, so the circle stays under the cursor.
               Only the inner image is shifted/scaled to line up with the hero photo. */
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ WebkitMaskImage: mask, maskImage: mask }}
            >
              <img
                src={ROBOT_SRC}
                alt=""
                className="absolute inset-0 h-full w-full object-contain object-bottom"
                style={{
                  transform: `translate(${ROBOT_X}%, ${ROBOT_Y}%) scale(${ROBOT_SCALE})`,
                  transformOrigin: "50% 100%",
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Soft fade at the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[22vh] bg-gradient-to-t from-black via-black/80 to-transparent"
      />
    </section>
  );
}