import { skillRows } from "../data/content";

function Row({ items, reverse }) {
  const half = [...items, ...items];
  const full = [...half, ...half];
  return (
    <div className="flex overflow-hidden" aria-hidden="true">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {full.map((skill, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-[11px] font-medium tracking-wider text-white/60 md:px-10 md:text-xs">
              {skill}
            </span>
            <span className="text-white/25">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="mt-16 md:mt-24">
      <ul className="sr-only">
        {skillRows.flat().map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        {skillRows.map((row, i) => (
          <Row key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}