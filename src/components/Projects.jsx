import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, githubProfile } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

function Tilt({ children, badge }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(255,255,255,0.20), transparent 55%)`;

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set((0.5 - py) * 18);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-lime/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0b0b] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
          {children}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glare }}
          />
        </div>

        {badge && (
          <span
            className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur"
            style={{ transform: "translateZ(50px)" }}
          >
            {badge}
          </span>
        )}
      </motion.div>
    </div>
  );
}

function Thumb({ project }) {
  if (!project.image) {
    return (
      <Tilt>
        <div
          aria-hidden
          className="grid aspect-video place-items-center bg-gradient-to-br from-white/10 to-white/[0.02]"
        >
          <span className="silver-text font-display text-[30vw] font-black leading-none md:text-[10vw]">
            {project.title[0]}
          </span>
        </div>
      </Tilt>
    );
  }
  return (
    <Tilt badge={project.realShot ? null : "Preview artwork"}>
      <img
        src={project.image}
        alt={project.alt}
        width="1000"
        height="558"
        loading="lazy"
        className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </Tilt>
  );
}

function Card({ project, index }) {
  const flip = index % 2 === 1;
  const hasLinks = project.live || project.github;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease }}
      className="group grid items-center gap-8 md:grid-cols-2 md:gap-16"
    >
      <div className={flip ? "md:order-2" : "md:order-1"}>
        <Thumb project={project} />
      </div>

      <div className={flip ? "md:order-1" : "md:order-2"}>
        <p className="text-xs font-semibold tabular-nums text-lime">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 font-display text-3xl font-black uppercase leading-[1.05] md:text-5xl">
          {project.title}{" "}
          <em className="font-serif text-[0.9em] font-normal normal-case italic text-white/80">
            {project.accent}
          </em>
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-[15px]">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white"
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white/90 transition hover:bg-white hover:text-black"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
          )}
          {!hasLinks && (
            <span className="rounded-full border border-dashed border-white/25 px-4 py-2 text-xs text-white/50">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI / ML" },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="mt-28 md:mt-44">
      <div aria-hidden className="h-2 w-full bg-lime" />

      <div className="px-[3vw] pt-16 md:pt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[14vw] font-black uppercase leading-none md:text-[6vw]">
            <span className="silver-text">Selected</span>{" "}
            <span className="font-serif font-normal normal-case italic text-white/80">
              work
            </span>
          </h2>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/60">
              Web and AI/ML projects from my coursework, training and
              self-study, with source code and live demos where available.
            </p>
            <a
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2 text-sm font-medium text-black transition hover:bg-white"
            >
              All on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div
          className="mt-12 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Filter projects"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                filter === f.id
                  ? "border-lime bg-lime text-black"
                  : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-20 md:mt-16 md:gap-32">
          {visible.map((p, i) => (
            <Card key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}