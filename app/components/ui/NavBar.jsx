"use client";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   ${
  //     scrolled
  //       ? ""
  //       : "rounded-none w-full max-w-none -mx-4"
  //   }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 main-container">
      <nav
        className={`
          flex items-center gap-6 px-4 py-3.5
          bg-[#1c1c1e] text-white
          transition-all duration-500 ease-in-out justify-between
          ${scrolled ? "rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.35)] w-full" : "bg-transparent w-full"}
        `}
      >
        {/* Logo icon */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-lg shrink-0">
          🪐
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {["Work", "About", "Playground", "Resource"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Email pill */}
        <a
          href="mailto:ihyaet@gmail.com"
          className="text-sm font-medium bg-white text-[#1c1c1e] px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap shrink-0"
        >
          ihyaet@gmail.com
        </a>
      </nav>
    </div>
  );
}
