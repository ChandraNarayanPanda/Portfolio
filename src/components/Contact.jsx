
import { useState, lazy, Suspense } from "react";
const Scene3D = lazy(() => import("./Scene3D"));
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { contact } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/30 outline-none transition focus:border-lime focus:bg-white/[0.07] md:text-sm";

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      className="relative isolate mt-28 px-[3vw] py-16 md:mt-44 md:py-24"
    >
      {/* animated glowing background */}
      {/* 3D floating shapes */}
<div
  aria-hidden
  className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
>
  <Suspense fallback={null}>
    <Scene3D />
  </Suspense>
</div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease }}
        className="font-display text-[14vw] font-black uppercase leading-[0.9] md:text-[7vw]"
      >
        <span className="silver-text">Let's</span>{" "}
        <span className="font-serif font-normal normal-case italic text-white/80">
          talk
        </span>
      </motion.h2>

      <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-16">
        <div className="min-w-0">
          <p className="max-w-md text-sm leading-relaxed text-white/60 md:text-base">
            I'm looking for an entry-level Web Developer role. If you have an
            opportunity or a question, send me a message.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <span className="block text-xs uppercase tracking-wider text-white/40">
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-white transition hover:text-lime"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wider text-white/40">
                Location
              </span>
              <span className="text-white">{contact.location}</span>
            </li>
          </ul>

          <p className="mt-8 text-xs uppercase tracking-wider text-white/40">
            Find me online
          </p>
          <div className="mt-3 flex items-center gap-3">
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
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className={iconBtn}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:p-8"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs text-white/60">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={update}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs text-white/60">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs text-white/60">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update}
                placeholder="How can I help?"
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-lime px-6 py-3 text-sm font-medium text-black transition hover:bg-white sm:w-auto"
          >
            Send message <ArrowUpRight size={14} />
          </button>
          <p className="mt-3 text-xs text-white/40">
            This opens your email app with the message ready to send.
          </p>
        </form>
      </div>
    </section>
  );
}