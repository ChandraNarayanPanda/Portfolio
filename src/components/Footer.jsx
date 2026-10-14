import { contact } from "../data/content";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-white/10 px-[3vw] pb-10 pt-12 md:mt-44">
      <p className="silver-text font-display text-[11vw] font-black uppercase leading-[0.9] md:text-[7vw]">
        Chandra Narayan Panda
      </p>

      <div className="mt-10 flex flex-col gap-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Chandra Narayan Panda. Built with React, Tailwind CSS and Framer Motion.</p>
        <ul className="flex flex-wrap items-center gap-6">
          <li>
            <a href={`mailto:${contact.email}`} className="transition hover:text-lime">
              Email
            </a>
          </li>
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-lime"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="#" className="transition hover:text-lime">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}