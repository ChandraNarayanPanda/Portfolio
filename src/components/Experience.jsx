import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experience } from "../data/content";
import CertLightbox from "./CertLightbox";

const ease = [0.22, 1, 0.36, 1];

export default function Experience() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="experience" className="mt-28 px-[3vw] md:mt-44">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease }}
        className="font-display text-[12vw] font-black uppercase leading-[0.95] md:text-[6vw]"
      >
        <span className="silver-text">Hands-on</span>{" "}
        <span className="font-serif font-normal normal-case italic text-white/80">
          experience
        </span>
      </motion.h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
        Training and practical simulations where I applied what I learned.
      </p>

      <ol ref={listRef} className="relative mt-12 md:mt-16">
        <div
          aria-hidden
          className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10 md:left-[150px]"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : fill }}
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-lime md:left-[150px]"
        />

        {experience.map((e, i) => (
          <li
            key={e.role + e.period}
            className="relative pb-14 pl-10 last:pb-0 md:grid md:grid-cols-[150px_minmax(0,1fr)] md:pl-0"
          >
            <span
              aria-hidden
              className="absolute left-[6px] top-1.5 size-3 rounded-full bg-lime ring-4 ring-black md:left-[144px]"
            />

            <div className="mb-3 md:mb-0 md:pr-8 md:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                {e.period}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:ml-10 md:p-8"
            >
              <span className="inline-block rounded-full border border-lime/40 px-3 py-0.5 text-[10px] uppercase tracking-wider text-lime">
                {e.type}
              </span>

              <h3 className="mt-4 font-display text-2xl font-black uppercase leading-[1.05] md:text-4xl">
                {e.role}
              </h3>
              <p className="mt-2 font-serif text-lg italic text-white/70">
                {e.org}
                {e.platform ? ` · ${e.platform}` : ""}
              </p>

              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white/65">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                    />
                    {p}
                  </li>
                ))}
              </ul>

              {e.skills.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills used">
                  {e.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}

                            {e.docs && e.docs.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {e.docs.map((d) => (
                    <button
                      key={d.image}
                      type="button"
                      onClick={() => setOpen({ image: d.image, title: d.title })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white/90 transition hover:border-lime hover:bg-lime hover:text-black"
                    >
                      {d.label} <ArrowUpRight size={14} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {open && <CertLightbox item={open} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}