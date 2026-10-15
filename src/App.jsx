import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={finishLoading} />}
      </AnimatePresence>
      <Navbar ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Intro />
        <Marquee />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}