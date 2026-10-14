import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, githubProfile } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

function Thumb({ project }) {
  if (!project.image) {
    return (
      <div
        aria-hidden
        className="grid aspect-video place-items-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]"
      >
        <span className="silver-text font-display text-[30vw] font-black leading-none md:text-[10vw]">
          {project.title[0]}
        </span>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10">
      <img
        src={project.image}
        alt={project.alt}
        width="1000"
        height="558"
        loading="lazy"
        className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur">
        Preview artwork
      </span>
    </div>
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

export default function Projects() {
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
              Projects from my coursework, training and self-study. Links appear
              here as soon as each project is published.
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

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-32">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}