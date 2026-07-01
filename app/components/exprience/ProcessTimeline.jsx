"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TimelineCard from "./TimelineCard";

gsap.registerPlugin(ScrollTrigger);

const BRAND_SLIDES = [
  {
    name: "NexaVista",
    logo: "/images/nexaVistaLogo.svg",
    centerText:
      "My first professional journey, turning ideas into real products.",
    whyChoose: [
      {
        title: "Journey",
        description: "Full Stack • September 2024 — August 2025",
      },
      {
        title: "Projects",
        description:
          "Developed Freshify, Car Wash, and Foodie using modern frontend practices.",
      },
      {
        title: "Teamwork",
        description:
          "Learned collaboration, Git workflows, communication, and code reviews.",
      },
      {
        title: "Growth",
        description:
          "Built a strong foundation in React, APIs, and clean code.",
      },
    ],
  },
  {
    name: "InfinityBits",
    logo: "/images/infinityBitsLogo.svg",
    centerText:
      "Crafting polished user experiences with modern frontend technologies.",
    whyChoose: [
      {
        title: "Journey",
        description: "Frontend Developer • August 2025 — Present",
      },
      {
        title: "Projects",
        description:
          "Worked on Axigma, FarmsDrop, and the InfinityBits Portfolio.",
      },
      {
        title: "Professional Growth",
        description:
          "Improved UI architecture, teamwork, and product-focused development.",
      },
      {
        title: "Growth",
        description:
          "Strengthened my skills in React, Next.js, state management, and UI performance.",
      },
    ],
  },
];

// Flatten brand data into timeline steps
const steps = BRAND_SLIDES.flatMap((brand, brandIdx) =>
  brand.whyChoose.map((item, i) => ({
    id: `${brand.name}-${i}`,
    number: String(brandIdx * 4 + i + 1).padStart(2, "0"),
    title: item.title,
    description: item.description,
    brandName: brand.name,
    brandLogo: brand.logo,
    isFirstOfBrand: i === 0,
  })),
);

export default function ProcessTimeline() {
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-card-mobile").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Brand header animation
      gsap.utils.toArray(".brand-header").forEach((header) => {
        gsap.from(header, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Progress line fills as you scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        },
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white py-12 sm:py-16">
      {/* Heading */}
      <div className="px-4 sm:px-6 mb-10 sm:mb-14">
        <h2 className="font-heading text-4xl sm:text-5xl text-center capitalize tracking-tighter leading-none text-black font-bold textImage">
          Experience
        </h2>
        <p className="text-center text-black/50 text-sm mt-3 max-w-md mx-auto">
          A walk through the brands I've worked with and the skills I built
          along the way.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
          {/* Background timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black/10" />

          {/* Animated progress timeline line */}
          <div
            ref={progressLineRef}
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-black origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-10">
            {steps.map((step) => (
              <div key={step.id}>
                {/* Brand Header — appears once per brand */}
                {step.isFirstOfBrand && (
                  <div className="brand-header relative pl-12 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black flex items-center justify-center">
                        <Image
                          src={step.brandLogo}
                          alt={step.brandName}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-black">
                        {step.brandName}
                      </h3>
                    </div>
                    {/* Larger black dot for brand */}
                    <div className="absolute left-2 top-2 w-5 h-5 bg-black rounded-full border-2 border-white shadow-md z-20" />
                  </div>
                )}

                {/* Timeline Card */}
                <div className="relative pl-12">
                  <div className="timeline-card-mobile">
                    <TimelineCard
                      number={step.number}
                      title={step.title}
                      description={step.description}
                    />
                  </div>

                  {/* Dash line from circle to card */}
                  <div
                    className="absolute left-5 w-7 h-px bg-black/20"
                    style={{ top: "28px" }}
                  />

                  {/* Node circle */}
                  <div
                    className="absolute left-2.5 w-3 h-3 bg-white border-2 border-black rounded-full shadow-md z-10"
                    style={{ top: "22px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
