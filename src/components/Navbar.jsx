import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#services" },
  { label: "Project", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-black/60 px-[3vw] py-4 backdrop-blur md:absolute md:bg-transparent md:py-5 md:backdrop-blur-none"
    >
      <a
        href="#home"
        className="relative z-50 font-display text-sm font-black tracking-[0.2em]"
      >
        CHANDRA
      </a>

      <nav aria-label="Primary" className="hidden gap-7 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[11px] font-medium uppercase tracking-wider text-white/90 transition hover:text-lime"
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
        className="relative z-50 grid size-11 place-items-center md:hidden"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
                  className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/95 px-[3vw] py-4 backdrop-blur-md md:absolute md:border-0 md:bg-transparent md:py-5 md:backdrop-blur-none"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="silver-text font-display text-4xl font-black uppercase"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}