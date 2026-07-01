"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import OutlineButton from "../ui/OutlineButtons";

const projectsData = [
  {
    id: "01",
    title: "Freshify",
    subtitle: "SASS",
    descLine1: "Multi role modern barber application",
    descLine2: "minimalist UI components and real world use case.",
    coreTech: ["React", "Node.js", "MongoDB"],
    allTech: ["Tailwind CSS", "TanStack Query", "Stripe", "Express"],
    image: "/images/freshify.png",
    liveUrl: "freshify.nl",
  },
  {
    id: "02",
    title: "FarmsDrop",
    subtitle: "Grocery Delivery Platform",
    descLine1: "Order fresh groceries with a seamless shopping experience.",
    descLine2:
      "Browse products, manage your cart, and enjoy fast doorstep delivery.",
    coreTech: ["Next js", "Express", "PostgreSQL"],
    allTech: ["Custom UI", "Firebase", "TanStack Query", "tailwind"],
    image: "/images/farmsdrop.png",
    liveUrl: "farmsdrop.com",
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

      // Mobile setup
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
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray(".project-panel");
        const firstPanel = panels[0];

        // ─── Initial state: everything hidden ───
        gsap.set(panels, { opacity: 1, visibility: "visible" });
        gsap.set(panels.slice(1), { opacity: 0, visibility: "hidden" });

        // First panel elements start hidden
        gsap.set(firstPanel.querySelector(".p-bg-image"), {
          opacity: 0,
          scale: 1.1,
        });
        gsap.set(
          [
            firstPanel.querySelector(".p-title"),
            firstPanel.querySelector(".p-subtitle"),
          ],
          { clipPath: "inset(100% 0 0 0)", y: 30 },
        );
        gsap.set(firstPanel.querySelectorAll(".meta-reveal"), {
          opacity: 0,
          y: 15,
        });

        // ─── SEPARATE intro animation for first panel ───
        // Plays automatically when section enters viewport
        // Reverses when scrolling back up past it
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top 80%", // starts when section is 80% from top
            end: "top 20%", // completes by the time it's 20% from top
            toggleActions: "play none none reverse",
            // play on enter, reverse on leave-back
          },
        });

        introTl
          .to(
            firstPanel.querySelector(".p-bg-image"),
            { opacity: 0.22, scale: 1, duration: 0.8, ease: "power2.out" },
            0,
          )
          .to(
            [
              firstPanel.querySelector(".p-subtitle"),
              firstPanel.querySelector(".p-title"),
            ],
            {
              clipPath: "inset(0% 0 0% 0)",
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.2,
          )
          .to(
            firstPanel.querySelectorAll(".meta-reveal"),
            {
              opacity: (i, el) =>
                el.classList.contains("tech-tag-aux") ? 0.35 : 1,
              y: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.4,
          );

        // ─── Progress bar ───
        gsap.to(".global-progress-fill", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top top",
            end: () => `+=${panels.length * 120}%`,
            scrub: true,
          },
        });

        // ─── Master pinned timeline (scrub transitions) ───
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
            // First panel: just HOLD it visible, no intro animation here
            // The intro is handled by the separate introTl above
            masterTl.to({}, { duration: 1 });
            return;
          }

          const prevPanel = panels[index - 1];

          // ─── Exit previous panel ───
          masterTl
            .to(prevPanel.querySelectorAll(".meta-reveal, .p-subtitle"), {
              opacity: 0,
              y: -15,
              duration: 0.3,
            })
            .to(
              prevPanel.querySelector(".p-title"),
              { clipPath: "inset(100% 0 0 0)", y: -30, duration: 0.3 },
              "<",
            )
            .to(
              prevPanel.querySelector(".p-bg-image"),
              { opacity: 0, scale: 0.95, duration: 0.4 },
              "<",
            )
            .to(prevPanel, {
              opacity: 0,
              visibility: "hidden",
              duration: 0.01,
            });

          // ─── Enter current panel ───
          masterTl
            .set(panel, { visibility: "visible", opacity: 1 })
            .fromTo(
              panel.querySelector(".p-bg-image"),
              { opacity: 0, scale: 1.08 },
              { opacity: 0.22, scale: 1, duration: 0.45 },
            )
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
            .fromTo(
              panel.querySelectorAll(".meta-reveal"),
              { opacity: 0, y: 20 },
              {
                opacity: (i, el) =>
                  el.classList.contains("tech-tag-aux") ? 0.35 : 1,
                y: 0,
                duration: 0.4,
                stagger: 0.04,
              },
              "-=0.2",
            );

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
      className="w-full main-container bg-[#0a0a0a] rounded-t-[40px] text-white select-none"
    >
      {/* DESKTOP */}
      <div
        ref={scrollTrackRef}
        className="hidden md:block relative h-screen w-full overflow-hidden"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-40">
          <div className="global-progress-fill w-full h-full bg-white origin-left scale-x-0" />
        </div>

        {projectsData.map((project) => (
          <div
            key={project.id}
            className="project-panel absolute inset-0 w-full h-full flex items-center justify-center p-20"
          >
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

            <div className="relative z-20 text-center pointer-events-none select-none">
              <span className="p-subtitle block font-mono text-[11px] tracking-[0.4em] text-white/40 mb-3 uppercase">
                {project.subtitle}
              </span>
              <h2 className="p-title textImageBlack font-heading font-black text-[9vw] leading-[0.85] tracking-tighter text-white uppercase select-none">
                {project.title}
              </h2>
            </div>

            <div className="absolute inset-0 w-full h-full px-16 pt-28 pb-16 flex flex-col justify-between pointer-events-none z-30">
              <div className="flex justify-between items-start w-full">
                <div className="font-serif text-5xl font-bold opacity-10 meta-reveal">
                  {project.id}
                </div>
                <div className="pointer-events-auto meta-reveal">
                  <OutlineButton href={`https://${project.liveUrl}`}>
                    EXPLORE CASE
                  </OutlineButton>
                </div>
              </div>

              <div className="flex justify-between items-end w-full">
                <div className="flex gap-16 max-w-[50%]">
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

                <div className="font-mono text-[10px] tracking-[0.2em] opacity-20 hidden md:block meta-reveal">
                  MERN STAGE POOL
                </div>
              </div>
            </div>

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

      {/* MOBILE */}
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
            <OutlineButton href={`https://${project.liveUrl}`}>
              EXPLORE CASE
            </OutlineButton>
          </div>
        ))}
      </div>
    </div>
  );
}
