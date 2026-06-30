"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      // Subtle reveal parallax for the links and text layers as the user bottoms out
      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full select-none overflow-hidden"
    >
      {/* 
        SPLIT CHROMATIC BACKGROUND STACK
        Top half is pure white, bottom half is matching pure black.
      */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
        <div className="w-full h-1/2 bg-white" />
        <div className="w-full h-1/2 bg-[#0a0a0a]" />
      </div>

      {/* 
        MASSIVE SPLIT-COLOR TEXTMASK LAYER
        Uses a linear gradient background clipped strictly to the text outline geometry.
        This forces the letters to perfectly swap color precisely at the 50% midpoint.
      */}
      <div className="absolute inset-0 flex items-center justify-start pl-4 md:pl-12 lg:pl-16 z-10 pointer-events-none">
        <h1
          className="font-sans font-black text-[15vw] leading-none tracking-tighter uppercase select-none webkit-text-stroke text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0a0a0a 50%, #ffffff 50%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextStroke: "1px transparent", // Smooth fallback geometry edge
          }}
        >
          NEO VIEW
        </h1>
      </div>

      {/* 
        INTERACTIVE FOREGROUND DATA LAYER
        Sits safely on top of the background split color mask.
      */}
      <div className="main-container relative z-20 pt-24 pb-12 flex flex-col justify-between min-h-[40vh] gap-16">
        {/* Top HUD Meta Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full mix-blend-difference">
          {/* mix-blend-difference automatically inverts text safely across the white/black background split */}
          <div className="footer-reveal font-mono text-[10px] tracking-[0.3em] text-white uppercase">
            // METRIC SYSTEM INDEX
          </div>

          <div className="footer-reveal flex gap-8 font-mono text-[11px] font-bold tracking-wider text-white">
            <a
              href="#work"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              WORK
            </a>
            <a
              href="#about"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              ABOUT
            </a>
            <a
              href="#playground"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              PLAYGROUND
            </a>
          </div>
        </div>

        {/* Bottom HUD Metadata Footer Meta */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full border-t border-white/10 pt-6 mt-auto">
          {/* Copyright License Stamp */}
          <div className="footer-reveal font-mono text-[10px] text-white/40 tracking-wide space-y-1">
            <p>© 2026 NEO STUDIO. ALL RIGHTS RESERVED.</p>
            <p className="opacity-50">
              DESIGN & DEVELOPMENT UNDER MERN MATRIX POOL.
            </p>
          </div>

          {/* Local Timestamp HUD Addition to match high-end agency setups */}
          <div className="footer-reveal font-mono text-[10px] text-white/40 text-left md:text-right space-y-1">
            <span className="block opacity-40">// ARCHITECTURE NODE</span>
            <p className="text-white/60 font-medium">
              ISLAMABAD, PK · 33.6844° N
            </p>
          </div>
        </div>
      </div>

      {/* Embedded CSS Utility for fine font outline clipping edge corrections */}
      <style jsx>{`
        .webkit-text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          color: transparent;
        }
        @media (max-width: 768px) {
          .webkit-text-stroke {
            -webkit-text-stroke: 1px currentColor;
          }
        }
      `}</style>
    </footer>
  );
}
