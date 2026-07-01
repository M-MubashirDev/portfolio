"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Handle background transition threshold
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Handle Smart Show/Hide on Scroll Direction Change
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling Down - Hide Navbar
        setVisible(false);
        setMobileMenuOpen(false); // Auto-collapse mobile tray on downscroll
      } else {
        // Scrolling Up - Show Navbar instantly
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Work", id: "#work" },
    { name: "About", id: "#about" },
    { name: "Playground", id: "#playground" },
    { name: "Contact", id: "#contact" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-60 flex justify-center pt-4 main-container transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${visible ? "translate-y-0" : "-translate-y-28"}
      `}
    >
      <nav
        className={`
          relative flex items-center justify-between px-6 py-3.5 w-full text-white transition-all duration-500 ease-in-out select-none
          ${
            scrolled
              ? "rounded-full bg-[#0a0a0a]/70 backdrop-blur-md border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-transparent"
          }
        `}
      >
        {/* LOGO NODE */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 rounded-full  text-sm shrink-0 bg-white/5 transition-all duration-300 group-hover:rotate-45 ">
            <Image width={32} height={32} alt="logo" src={"/icons/code.png"} />
          </div>
          <span className="font-mono text-[11px] tracking-[0.25em] font-black uppercase hidden sm:inline-block">
            MUBASHIR //
          </span>
        </div>

        {/* DESKTOP NAV LINKS (Fluidly Hidden under md) */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.id}
              className="relative font-mono text-[11px] tracking-widest font-bold uppercase text-white/60 hover:text-white transition-colors duration-300 py-1 group"
            >
              {item.name}
              {/* Minimal dynamic underline rail tracking interaction */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* DESKTOP ACTION INTERFACE DECK */}
        <div className="hidden md:block">
          <a
            href="mailto:m.mubashirweb@gmail.com"
            className={`text-[11px] font-mono tracking-wider font-black px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap shrink-0 border
              ${
                scrolled
                  ? "bg-white text-black border-white hover:bg-transparent hover:text-white"
                  : "bg-white/5 text-white border-white/10 hover:bg-white hover:text-black hover:border-white"
              }`}
          >
            m.mubashirweb@gmail.com
          </a>
        </div>

        {/* MOBILE INTERFACE: GLASS HAMBURGER SWITCH BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-full bg-white/5 border border-white/10 md:hidden focus:outline-none z-50"
          aria-label="Toggle Navigation Control"
        >
          <span
            className={`h-[1px] w-4 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`h-[1px] w-4 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[1px] w-4 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
          />
        </button>

        {/* MOBILE MENU EXTENSION TRAY DROPDOWN */}
        <div
          className={`absolute top-[calc(100%+12px)] inset-x-0 p-6 rounded-3xl bg-[#0a0a0a]/95 backdrop-blur-lg border border-white/10 shadow-2xl flex flex-col gap-6 md:hidden transition-all duration-400 transform origin-top
            ${mobileMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-90 pointer-events-none"}`}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.id}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white py-2 border-b border-white/5"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="mailto:m.mubashirweb@gmail.com"
            className="text-[11px] font-mono tracking-wide text-center bg-white text-black py-3 rounded-full font-bold mt-2"
          >
            m.mubashirweb@gmail.com
          </a>
        </div>
      </nav>
    </div>
  );
}
