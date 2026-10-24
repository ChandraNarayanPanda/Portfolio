import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Download, Mail } from "lucide-react";
import { contact, navLinks } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

const iconBtn =
  "grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white/80 transition hover:border-lime hover:bg-lime hover:text-black";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function useIndiaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const get = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(get());
    const id = setInterval(() => setTime(get()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useIndiaTime();
  const links = navLinks.filter((l) => l.href !== "#home");

  return (
    <footer className="relative isolate mt-28 overflow-hidden border-t border-white/10 px-[3vw] pt-16 md:mt-44 md:pt-24">
      {/* soft lime glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-full bg-lime/10 blur-3xl"
      />

      {/* call to action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease }}
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <h2 className="font-display text-[11vw] font-black uppercase leading-[0.95] md:text-[5vw]">
          <span className="silver-text block pb-[0.08em]">Have an opportunity?</span>
          <span className="block pb-[0.08em] font-serif font-normal normal-case italic text-lime">
            Let's build something together.
          </span>
        </h2>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-6 py-3 text-sm font-medium text-black transition hover:bg-white"
          >
            Email me <ArrowUpRight size={14} />
          </a>
          <a
            href="/resume.pdf"
            download="Chandra-Narayan-Panda-Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-6 py-3 text-sm text-white/90 transition hover:bg-white hover:text-black"
          >
            Resume <Download size={14} />
          </a>
        </div>
      </motion.div>

      {/* columns */}
      <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 md:mt-20 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/40">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {links.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-lg text-white/80 transition hover:text-lime"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-white/40">Connect</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconBtn}
            >
              <GithubIcon />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconBtn}
            >
              <LinkedinIcon />
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Email" className={iconBtn}>
              <Mail size={20} />
            </a>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="mt-5 block break-all text-sm text-white/60 transition hover:text-lime"
          >
            {contact.email}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-white/40">Based in</p>
          <p className="mt-4 text-lg text-white/80">{contact.location}</p>
          {time && (
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Local time {time} IST
            </p>
          )}
          <p className="mt-2 text-sm text-white/60">
            Open to Web Developer and AI/ML roles
          </p>
        </div>
      </div>

      {/* giant name, scales to the screen width */}
      <svg
        viewBox="0 0 1000 125"
        className="mt-14 block h-auto w-full md:mt-20"
        role="img"
        aria-label="Chandra Narayan Panda"
      >
        <defs>
          <linearGradient id="foot-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#b9bfcb" />
            <stop offset="1" stopColor="#4b505c" />
          </linearGradient>
        </defs>
        <text
          x="20"
          y="105"
          fontSize="100"
          fontWeight="900"
          textLength="960"
          lengthAdjust="spacingAndGlyphs"
          fill="url(#foot-face)"
          style={{ fontFamily: "'Archivo', 'Arial Black', sans-serif" }}
        >
          CHANDRA PANDA
        </text>
      </svg>

      {/* bottom bar */}
      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Chandra Narayan Panda. Built with React,
          Tailwind CSS and Framer Motion.
        </p>
        <a
          href="#home"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 transition hover:border-lime hover:bg-lime hover:text-black"
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}