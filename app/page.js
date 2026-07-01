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
import ProcessTimeline from "./components/exprience/ProcessTimeline";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  useGSAP(
    () => {
      const sectionsToPin = [
        ".section-hero",
        ".section-skills",
        ".section-exprience",
      ];

      const allSections = [
        ".section-hero",
        ".section-skills",
        ".section-projects",
        ".section-exprience",
        ".section-contact",
      ];

      /* ---- PIN SECTIONS (all screen sizes) ---- */
      sectionsToPin.forEach((section, index) => {
        const startPosition = index === 0 ? "top top" : "center top";

        ScrollTrigger.create({
          trigger: section,
          start: startPosition,
          end: () => `+=${document.querySelector(section)?.offsetHeight || 0}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      /* ---- FADE OUT PREVIOUS SECTION ---- */
      allSections.forEach((section, index) => {
        if (index === 0) return;

        // Skip Projects fade-out on mobile (it's a tall scroll list)
        const isProjects = allSections[index - 1] === ".section-projects";

        gsap.to(allSections[index - 1], {
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: isProjects ? "top 50%" : "top bottom",
            end: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      /* ---- SCALE IN CURRENT SECTION (EXCEPT PROJECTS) ---- */
      allSections.forEach((section, index) => {
        if (index === 0 || section === ".section-projects") return;
        gsap.from(section, {
          scale: 0.92,
          borderRadius: "40px",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
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

      <section className="section-projects relative z-30 w-full rounded-t-[40px]">
        <Projects />
      </section>

      <section className="section-exprience relative z-40 min-h-screen w-full rounded-t-[40px] overflow-hidden">
        <div className="hidden md:block w-full">
          <Exprience />
        </div>
        <div className="block mb-16 md:hidden">
          <ProcessTimeline />
        </div>
      </section>

      <section className="section-contact relative z-50 min-h-screen rounded-t-[40px] overflow-hidden">
        <Contact />
      </section>

      {/* Footer stays normal — no overlap */}
      <section className="section-footer relative z-50 rounded-t-[40px] overflow-hidden">
        <Footer />
      </section>
    </div>
  );
}
