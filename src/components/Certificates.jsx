import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { certificates } from "../data/content";
import CertLightbox from "./CertLightbox";

const ease = [0.22, 1, 0.36, 1];
const issuers = [...new Set(certificates.map((c) => c.issuer))];

function Ticket({ cert, index, onOpen }) {
  const featured = cert.featured;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay: (index % 2) * 0.08 }}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] transition-colors duration-300 hover:border-lime/40 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* light that follows the mouse */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(212,255,58,0.08), transparent 60%)",
        }}
      />
      {/* lime line that draws on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-lime transition-transform duration-700 group-hover:scale-x-100"
      />
      {/* big outlined number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-3 select-none font-display text-6xl font-black leading-none md:right-[calc(13rem+1.25rem)] md:text-8xl"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          color: "transparent",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`relative grid ${
          featured
            ? "md:grid-cols-[minmax(0,1fr)_18rem]"
            : "md:grid-cols-[minmax(0,1fr)_13rem]"
        }`}
      >
        {/* main part */}
        <div className="flex flex-col p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              {cert.issuer}
            </span>
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
              {cert.tag}
            </span>
          </div>

          <h3
            className={`mt-4 font-display font-black uppercase leading-[1.05] ${
              featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {cert.short}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-white/55">{cert.title}</p>

          {cert.skills.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills covered">
              {cert.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => onOpen(cert)}
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white/90 transition hover:border-lime hover:bg-lime hover:text-black"
            style={{ marginTop: "1.5rem" }}
          >
            View certificate <ArrowUpRight size={14} />
          </button>
        </div>

        {/* tear-off stub */}
        <div className="relative border-t border-dashed border-white/20 bg-white/[0.02] p-5 md:border-l md:border-t-0">
          <span
            aria-hidden
            className="absolute -left-3 -top-3 size-6 rounded-full border border-white/10 bg-black"
          />
          <span
            aria-hidden
            className="absolute -right-3 -top-3 size-6 rounded-full border border-white/10 bg-black md:-bottom-3 md:-left-3 md:right-auto md:top-auto"
          />

          <button
            type="button"
            onClick={() => onOpen(cert)}
            aria-label={`Open certificate: ${cert.title}`}
            className="block w-full overflow-hidden rounded-lg border border-white/10"
          >
            <img
              src={cert.image}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
          </button>

          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-white/40">
                Issued
              </dt>
              <dd className="mt-1 text-sm text-white/85">{cert.date}</dd>
            </div>
            {cert.valid && (
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-white/40">
                  Validity
                </dt>
                <dd className="mt-1 text-sm text-white/85">{cert.valid}</dd>
              </div>
            )}
            {cert.id && (
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-white/40">
                  Credential ID
                </dt>
                <dd className="mt-1 break-all font-mono text-[11px] text-white/70">
                  {cert.id}
                </dd>
              </div>
            )}
          </dl>

          {cert.verify && (
            <a
              href={cert.verify}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm text-lime transition hover:text-white"
            >
              Verify online <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default function Certificates() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="certificates" className="mt-28 px-[3vw] md:mt-44">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-[12vw] font-black uppercase leading-[0.95] md:text-[6vw]"
        >
          <span className="silver-text">Certified</span>{" "}
          <span className="font-serif font-normal normal-case italic text-white/80">
            skills
          </span>
        </motion.h2>

        <div className="max-w-md">
          <p className="text-sm leading-relaxed text-white/60">
            <span className="font-semibold text-lime">
              {String(certificates.length).padStart(2, "0")}
            </span>{" "}
            certificates in AI/ML, data and web development. Open any ticket to
            see the full certificate.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Issued by">
            {issuers.map((i) => (
              <li
                key={i}
                className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/60"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
        {certificates.map((c, i) => (
          <Ticket key={c.title} cert={c} index={i} onOpen={setOpen} />
        ))}
      </ul>

      <AnimatePresence>
        {open && <CertLightbox item={open} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}