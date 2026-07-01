"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";

const socials = [
  {
    label: "GH",
    url: "/icons/gh.png",
    href: "https://github.com/your-username",
  },
  {
    label: "IN",
    url: "/icons/ln.png",
    href: "https://linkedin.com/in/your-username",
  },
];

function SocialIcon({ label, url, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex items-center  transition-opacity duration-300"
    >
      <Image
        src={url}
        alt={label}
        width={16}
        height={16}
        className="object-contain "
      />
      <div className="pointer-events-none">
        <span className="block text-[14px] font-medium tracking-wide whitespace-nowrap translate-x-1 opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-300 ease-out text-white">
          {label}
        </span>
      </div>
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
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
      {/* SPLIT BACKGROUND */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
        <div className="w-full h-1/2 bg-white" />
        <div className="w-full h-1/2 bg-[#0a0a0a]" />
      </div>

      {/* MASSIVE SPLIT-COLOR NAME */}
      <div className="absolute inset-0 flex items-center justify-start pl-4 md:pl-12 lg:pl-16 z-10 pointer-events-none">
        <h1
          className="font-sans font-black text-[15vw] leading-none tracking-tighter uppercase select-none webkit-text-stroke text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0a0a0a 50%, #ffffff 50%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextStroke: "1px transparent",
          }}
        >
          MUBASHIR
        </h1>
      </div>

      {/* FOREGROUND CONTENT — mix-blend-difference on the WHOLE wrapper */}
      <div className="main-container relative z-20 pt-24 pb-12 flex flex-col justify-between min-h-[40vh] gap-16 mix-blend-difference">
        {/* Top HUD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
          <div className="footer-reveal font-mono text-[10px] tracking-[0.3em] text-white uppercase">
            {"// FULL STACK · SOFTWARE ENGINEER"}
          </div>

          <div className="footer-reveal flex gap-6 md:gap-8 font-mono text-[11px] font-bold tracking-wider text-white">
            <a
              href="#home"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              Home
            </a>
            <a
              href="#skills"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="hover:opacity-60 transition-opacity duration-300 uppercase"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full border-t border-white/20 pt-6 mt-auto">
          {/* Left — Copyright */}
          <div className="footer-reveal font-mono text-[10px] text-white tracking-wide space-y-1">
            <p>© 2026 MUBASHIR. ALL RIGHTS RESERVED.</p>
            <p className="opacity-70">
              CRAFTED WITH NEXT.JS · GSAP · TAILWIND CSS.
            </p>
          </div>

          {/* Middle — Location */}
          <div className="footer-reveal font-mono text-[10px] text-white text-left md:text-center space-y-1">
            <span className="block opacity-60">{"// Location"}</span>
            <p className="font-medium">ISLAMABAD, PK</p>
          </div>

          {/* Right — Social Icons */}
          <div className="footer-reveal flex flex-col items-start md:items-end gap-3">
            <span className="block font-mono text-[10px] text-white opacity-60 tracking-widest uppercase">
              {"// Follow"}
            </span>
            <div className="flex items-center gap-5">
              {socials.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>
        </div>
      </div>

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
