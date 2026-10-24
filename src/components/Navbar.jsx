import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  /* blurred background once you leave the top */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight the section that is on screen */
  useEffect(() => {
    const els = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* mobile menu: Esc closes it, page does not scroll behind it */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[3vw] py-4 transition-colors duration-300 md:py-5 ${
          scrolled || open
            ? "border-b border-white/5 bg-black/70 backdrop-blur-md"
            : "bg-black/60 backdrop-blur md:bg-transparent md:backdrop-blur-none"
        }`}
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="relative z-50 font-display text-sm font-black tracking-[0.2em]"
        >
          CHANDRA
        </a>

        <nav aria-label="Primary" className="hidden gap-6 lg:flex xl:gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`text-[11px] font-medium uppercase tracking-wider transition hover:text-lime ${
                active === l.href ? "text-lime" : "text-white/85"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="relative z-50 grid size-11 place-items-center lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.header>

      {/* full-screen mobile menu (outside the header so it can cover the page) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-black/95 px-[6vw] pb-10 pt-24 backdrop-blur-md lg:hidden"
          >
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2.5"
                  >
                    <span className="text-xs tabular-nums text-lime">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[8vw] font-black uppercase leading-tight sm:text-5xl ${
                        active === l.href ? "text-lime" : "silver-text"
                      }`}
                    >
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="/resume.pdf"
              download="Chandra-Narayan-Panda-Resume.pdf"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.45 }}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-black"
            >
              <Download size={14} /> Resume
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}