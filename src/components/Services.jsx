import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { services } from "../data/content";

export default function Services() {
  return (
    <section id="services" className="mt-28 md:mt-40">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="px-[3vw] text-right font-display text-[13vw] font-black uppercase leading-[0.9] md:text-[7vw]"
      >
        <span className="silver-text block">What I</span>
        <span className="silver-text block opacity-70">Can do</span>
      </motion.h2>

      <ul className="mt-10 md:mt-14">
        {services.map((s, i) => (
          <li key={s.title} className="border-t border-white/10 last:border-b">
            <a
              href="#projects"
              className="group relative flex items-center gap-4 overflow-hidden px-[3vw] py-5 md:gap-8 md:py-6"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 group-active:scale-y-100"
              />
              <span className="relative w-8 text-base tabular-nums text-white transition-colors duration-300 group-hover:text-black group-focus-visible:text-black group-active:text-black md:w-12 md:text-xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex-1">
                <span className="block font-display text-sm font-black uppercase tracking-wide transition-colors duration-300 group-hover:text-black group-focus-visible:text-black group-active:text-black md:text-xl">
                  {s.title}
                </span>
                <span className="mt-1 hidden text-xs text-white/50 transition-colors duration-300 group-hover:text-black/70 group-focus-visible:text-black/70 md:block">
                  {s.stack}
                </span>
              </span>
              <ArrowDownRight
                aria-hidden
                className="relative text-lime transition-colors duration-300 group-hover:text-black group-focus-visible:text-black group-active:text-black"
                size={22}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}