import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contact } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-lime focus:bg-white/[0.07]";

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
    <section id="contact" className="mt-28 px-[3vw] md:mt-44">
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
        <div>
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
                GitHub
              </span>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white transition hover:text-lime"
              >
                ChandraNarayanPanda <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wider text-white/40">
                Location
              </span>
              <span className="text-white">{contact.location}</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8"
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
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-lime px-6 py-3 text-sm font-medium text-black transition hover:bg-white"
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