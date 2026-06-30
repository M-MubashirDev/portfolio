"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Exprience from "./components/exprience/Exprience";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";
import Skills from "./components/skill/Skills";
import Contact from "./components/contact-us/Contact";
import Footer from "./components/footer/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  useGSAP(
    () => {
      const sectionsToPin = [".section-hero", ".section-skills"];
      const allSections = [
        ".section-hero",
        ".section-skills",
        ".section-projects",
        ".section-exprience",
        ".section-contact",
      ];

      /* ---- PIN SECTIONS ---- */
      sectionsToPin.forEach((section, index) => {
        let startPosition = index === 0 ? "top top" : "center top";
        ScrollTrigger.create({
          trigger: section,
          start: startPosition,
          end: () => `+=${document.querySelector(section)?.offsetHeight || 0}`,
          pin: true,
          pinSpacing: false,
        });
      });

      /* ---- FADE OUT PREVIOUS SECTION ---- */
      allSections.forEach((section, index) => {
        if (index === 0) return;
        gsap.to(allSections[index - 1], {
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
      });

      /* ---- SCALE IN CURRENT SECTION (EXCEPT PROJECTS) ---- */
      allSections.forEach((section, index) => {
        if (index === 0 || section === ".section-projects") return; // Skip projects here to prevent transform breakages
        gsap.from(section, {
          scale: 0.92,
          borderRadius: "40px",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative w-full overflow-x-hidden bg-[#0a0a0a]"
    >
      <section className="section-hero relative z-10 min-h-screen">
        <Hero />
      </section>

      <section className="section-skills relative z-20 min-h-screen rounded-t-[40px] overflow-hidden">
        <Skills />
      </section>

      <section className="section-projects relative z-30 w-full">
        <Projects />
      </section>

      <section className="section-exprience relative z-40 min-h-screen rounded-t-[40px] overflow-hidden">
        <Exprience />
      </section>
      <section className="section-contact relative z-50 min-h-screen rounded-t-[40px] overflow-hidden">
        <Contact />
      </section>
      <section className="section-footer relative z-50 min-h-screen rounded-t-[40px] overflow-hidden">
        <Footer />
      </section>
    </div>
  );
}
