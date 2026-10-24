import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function CertLightbox({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close certificate"
          className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-white/25 bg-black/60 text-white transition hover:bg-lime hover:text-black"
        >
          <X size={18} />
        </button>
        <img
          src={item.image}
          alt={`Certificate: ${item.title}`}
          className="mx-auto max-h-[78vh] w-auto max-w-full rounded-lg border border-white/10 bg-white"
        />
        <p className="mt-4 text-center text-sm text-white/70">{item.title}</p>
      </motion.div>
    </motion.div>
  );
}