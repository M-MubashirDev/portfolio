"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projectsData = [
  {
    id: "01",
    title: "NEO CART",
    subtitle: "GLASSY E-COMMERCE",
    descLine1: "High fidelity architectural layouts featuring",
    descLine2: "custom minimalist UI components and fake API.",
    coreTech: ["React", "Node.js", "MongoDB"],
    allTech: ["Tailwind CSS", "Redux Toolkit", "Stripe", "Express"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "#",
  },
  {
    id: "02",
    title: "AETHER ARCHIVE",
    subtitle: "HEADLESS ENGINE",
    descLine1: "Distributed asset management mapping system",
    descLine2: "optimized for real-time asset delivery streams.",
    coreTech: ["React", "Express", "PostgreSQL"],
    allTech: ["Mantine UI", "Google Calendar API", "Docker", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "#",
  },
  {
    id: "03",
    title: "KINETIC MATRIX",
    subtitle: "WEBGPU ACCELERATION",
    descLine1: "Complex algorithmic matrix transformations",
    descLine2: "rendered natively over low-overhead threads.",
    coreTech: ["Next.js", "Three.js", "Node.js"],
    allTech: ["WGSL", "Tailwind CSS", "Zustand", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "#",
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Mobile setup (simple static cards)
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray(".mobile-project-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      // Desktop setup
      // Desktop setup
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray(".project-panel");

        // Hide initial overlay states
        gsap.set(panels.slice(1), { opacity: 0, visibility: "hidden" });

        // 1. INDEPENDENT PROGRESS BAR TRACKER (Always Synced to absolute scroll position)
        gsap.to(".global-progress-fill", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top top",
            end: () => `+=${panels.length * 120}%`, // Matches the exact end length below
            scrub: true, // Tied directly to the active viewport position
          },
        });

        // 2. MASTER STRUCTURAL PANEL PIN TIMELINE
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top top",
            end: () => `+=${panels.length * 120}%`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) {
            // First panel entrance sequence on page enter
            masterTl
              .fromTo(
                panel.querySelector(".p-bg-image"),
                { opacity: 0, scale: 1.1 },
                { opacity: 0.22, scale: 1, duration: 0.5 },
                0,
              )
              .fromTo(
                [
                  panel.querySelector(".p-title"),
                  panel.querySelector(".p-subtitle"),
                ],
                { clipPath: "inset(100% 0 0 0)", y: 30 },
                {
                  clipPath: "inset(0% 0 0% 0)",
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                },
                0.3,
              )
              .fromTo(
                panel.querySelectorAll(".meta-reveal"),
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
                0.5,
              );
            return;
          }

          const prevPanel = panels[index - 1];

          // Outgoing Panel Fade Out Phase
          masterTl
            .to(prevPanel.querySelectorAll(".meta-reveal, .p-subtitle"), {
              opacity: 0,
              y: -15,
              duration: 0.3,
            })
            .to(
              prevPanel.querySelector(".p-title"),
              {
                clipPath: "inset(100% 0 0 0)",
                y: -30,
                duration: 0.3,
              },
              "<",
            )
            .to(
              prevPanel.querySelector(".p-bg-image"),
              {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
              },
              "<",
            )
            .to(prevPanel, {
              opacity: 0,
              visibility: "hidden",
              duration: 0.01,
            });

          // Incoming Panel Sequence
          masterTl
            .set(panel, { visibility: "visible", opacity: 1 })

            // Image Appears
            .fromTo(
              panel.querySelector(".p-bg-image"),
              { opacity: 0, scale: 1.08 },
              { opacity: 0.22, scale: 1, duration: 0.45 },
            )

            // Main Bold Typographic Stamp Reveals
            .fromTo(
              [
                panel.querySelector(".p-title"),
                panel.querySelector(".p-subtitle"),
              ],
              { clipPath: "inset(100% 0 0 0)", y: 40 },
              {
                clipPath: "inset(0% 0 0% 0)",
                y: 0,
                duration: 0.5,
                stagger: 0.08,
              },
              "-=0.1",
            )

            // Supporting metadata staggers in
            .fromTo(
              panel.querySelectorAll(".meta-reveal"),
              { opacity: 0, y: 20 },
              {
                opacity: (i, el) => {
                  if (el.classList.contains("tech-tag-aux")) return 0.35;
                  return 1;
                },
                y: 0,
                duration: 0.4,
                stagger: 0.04,
              },
              "-=0.2",
            );

          // Resting layout cushion block
          masterTl.to({}, { duration: 0.5 });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full main-container bg-[#0a0a0a] text-white select-none"
    >
      {/* DESKTOP ART DIRECTION TRACKER */}
      <div
        ref={scrollTrackRef}
        className="hidden md:block relative h-screen w-full overflow-hidden"
      >
        {/* Soft Global Base Flow Lighting Overlay */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        {/* Global Progress Bar Tracking Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-40">
          <div className="global-progress-fill w-full h-full bg-white origin-left scale-x-0" />
        </div>

        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            className="project-panel absolute inset-0 w-full h-full flex items-center justify-center p-20"
          >
            {/* THE WATERMARK CONTAINER: 
              We feather the edges using a CSS radial gradient mask to drop harsh boxy layout edges completely.
            */}
            <div
              className="p-bg-image absolute w-full max-w-[850px] aspect-[16/10] z-0 pointer-events-none opacity-0"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 20%, transparent 68%)",
                maskImage:
                  "radial-gradient(circle at center, black 20%, transparent 68%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover grayscale brightness-[0.75] contrast-[1.2] mix-blend-luminosity"
              />
            </div>

            {/* INTERSECTING CENTRAL BOLD HEADING */}
            <div className="relative z-20 text-center pointer-events-none select-none">
              <span className="p-subtitle block font-mono text-[11px] tracking-[0.4em] text-white/40 mb-3 uppercase">
                {project.subtitle}
              </span>
              <h2 className="p-title font-heading font-black text-[9vw] leading-[0.85] tracking-tighter text-white uppercase select-none">
                {project.title}
              </h2>
            </div>

            {/* SCATTERED ADJACENT DESIGN CONTEXT FRAMES */}
            <div className="absolute inset-0 w-full h-full p-16 flex flex-col justify-between pointer-events-none z-30">
              {/* Top Bar Navigation HUD */}
              <div className="flex justify-between items-start w-full">
                <div className="font-serif text-5xl font-bold opacity-10 meta-reveal">
                  {project.id}
                </div>

                {/* Redirection Action Link Button */}
                <div className="pointer-events-auto meta-reveal">
                  <a
                    href={project.liveUrl}
                    className="group flex items-center gap-3 font-mono text-[10px] tracking-widest text-white/60 hover:text-white transition-colors duration-300 border border-white/10 hover:border-white/30 rounded-full px-5 py-2.5 bg-black/40 backdrop-blur-md"
                  >
                    EXPLORE CASE
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 text-[12px]">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>

              {/* Lower HUD Layout Frame */}
              <div className="flex justify-between items-end w-full">
                {/* Tech Layout Grid Specifier Blocks */}
                <div className="flex gap-16 max-w-[50%]">
                  {/* Core Structural Engines */}
                  <div className="space-y-1.5 meta-reveal">
                    <span className="block font-mono text-[9px] text-white/30 tracking-wider">
                      {"// CORE ENGINE"}
                    </span>
                    <div className="flex gap-3 font-mono text-[11px] font-bold text-white/80">
                      {project.coreTech.map((tech, i) => (
                        <span key={i}>
                          {tech}
                          {i !== project.coreTech.length - 1 && " ·"}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Auxiliary Subsystems List */}
                  <div className="space-y-1.5 hidden lg:block meta-reveal tech-tag-aux">
                    <span className="block font-mono text-[9px] text-white/20 tracking-wider">
                      {"// INTEGRATIONS"}
                    </span>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[10px] text-white/50">
                      {project.allTech.map((tech, i) => (
                        <span key={i}>#{tech.toLowerCase()}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Bottom Layout Flag */}
                <div className="font-mono text-[10px] tracking-[0.2em] opacity-20 hidden md:block meta-reveal">
                  MERN STAGE POOL
                </div>
              </div>
            </div>

            {/* VERTICAL TWO LINE MARGIN DESCRIPTION */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 rotate-90 origin-left translate-x-4 pointer-events-none z-30 hidden xl:block">
              <div className="meta-reveal font-sans text-[11px] text-[#777] tracking-wide leading-none space-y-1 whitespace-nowrap">
                <p className="uppercase font-mono text-[9px] text-white/20 tracking-[0.2em] mb-1">
                  {"// OBJECTIVE"}
                </p>
                <p>{project.descLine1}</p>
                <p>{project.descLine2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE LIST LAYOUT */}
      <div className="block md:hidden px-6 py-20 space-y-24 bg-[#0a0a0a]">
        {projectsData.map((project) => (
          <div key={project.id} className="mobile-project-card space-y-6">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                {project.subtitle}
              </span>
              <span className="font-serif text-2xl italic opacity-30 text-white">
                {project.id}
              </span>
            </div>
            <div className="w-full aspect-video rounded-md overflow-hidden bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-[1.2] brightness-[0.6] opacity-40"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans font-black text-3xl tracking-tight uppercase text-white">
                {project.title}
              </h3>
              <p className="text-[13px] text-[#999] leading-relaxed">
                {project.descLine1} {project.descLine2}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              {project.coreTech.concat(project.allTech).map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
