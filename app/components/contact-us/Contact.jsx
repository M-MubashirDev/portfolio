"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [focusedField, setFocusedField] = useState(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".contact-subtitle",
        { opacity: 0, y: 15 },
        { opacity: 0.6, y: 0, duration: 0.5 }, // Increased base entrance visibility
      )
        .fromTo(
          ".contact-title",
          { clipPath: "inset(100% 0 0 0)", y: 30 },
          {
            clipPath: "inset(0% 0 0% 0)",
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".contact-form-row",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".contact-meta",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0a0a0a] text-white py-32 md:py-48 relative overflow-hidden"
    >
      {/* Subtle ambient glow backing */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        {/* Left Side: Header Stamp */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="contact-subtitle block font-mono text-[11px] tracking-[0.4em] text-white/60 uppercase mb-2">
              // INITIATE TRANSITION
            </span>
            <h2 className="contact-title font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-white">
              START A<br />
              PROJECT
            </h2>
          </div>

          {/* Metadata Sidebar - Readability boosted to text-white/70 */}
          <div className="hidden lg:block space-y-6 pt-12 border-t border-white/10 contact-meta">
            <div>
              <span className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1">
                // AVAILABILITY
              </span>
              <p className="font-mono text-[12px] text-white/80 font-medium">
                OPEN FOR CLIENT INQUIRIES · 2026
              </p>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1">
                // DIRECT HUB
              </span>
              <a
                href="mailto:ihyaet@gmail.com"
                className="font-mono text-[12px] text-white/80 hover:text-white font-medium transition-colors duration-300 underline underline-offset-4 decoration-white/20 hover:decoration-white"
              >
                ihyaet@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: High-Contrast Form */}
        <div className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-12"
          >
            {/* Row 1: Name & Email */}
            <div className="contact-form-row grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="YOUR NAME"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300"
                />
                {/* Underline switches to bright white on focus, sits solid at white/20 when idle */}
                <div
                  className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${focusedField === "name" ? "scale-x-100 bg-white" : ""}`}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300"
                />
                <div
                  className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${focusedField === "email" ? "scale-x-100 bg-white" : ""}`}
                />
              </div>
            </div>

            {/* Row 2: Objective */}
            <div className="contact-form-row relative">
              <input
                type="text"
                name="objective"
                placeholder="PROJECT OBJECTIVE (E.G. E-COMMERCE, PORTFOLIO)"
                onFocus={() => setFocusedField("objective")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300"
              />
              <div
                className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${focusedField === "objective" ? "scale-x-100 bg-white" : ""}`}
              />
            </div>

            {/* Row 3: Message */}
            <div className="contact-form-row relative">
              <textarea
                rows={4}
                name="message"
                required
                placeholder="TELL ME ABOUT THE SYSTEM & VISION"
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300 resize-none"
              />
              <div
                className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${focusedField === "message" ? "scale-x-100 bg-white" : ""}`}
              />
            </div>

            {/* Row 4: Action Footer */}
            <div className="contact-form-row pt-4 flex items-center justify-between">
              <button
                type="submit"
                className="group flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] text-white font-bold border border-white/20 hover:border-white rounded-full px-8 py-3.5 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              >
                SUBMIT INQUIRY
                <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 text-[12px]">
                  &rarr;
                </span>
              </button>

              <span className="hidden md:inline-block font-mono text-[10px] text-white/50 tracking-wider">
                // RESPONSIVENESS WINDOW WITHIN 24H
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
