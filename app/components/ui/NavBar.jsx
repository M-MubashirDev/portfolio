"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import MenuButton from "./MenuButton";
import OutlineButton from "./OutlineButtons";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const detectActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    // The "probe point" — how far down the viewport we check
    const probePoint = scrollY + viewportHeight * 0.35;

    // Build an array of { id, top, bottom } using offsetTop
    // offsetTop is NOT affected by GSAP pinning in the same way
    // getBoundingClientRect is, so we compute absolute positions manually.
    const sections = [];

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;

      // Walk up the offset chain to get true document-top position
      let top = 0;
      let current = el;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent;
      }

      // For pinned sections (like projects), GSAP adds pin-spacer divs.
      // The pin-spacer holds the full scrollable height.
      // Check if this element's parent is a pin-spacer.
      const pinSpacer = el.closest(".pin-spacer");
      let bottom;

      if (pinSpacer) {
        // Pin-spacer's total height = the pinned scroll length
        let spacerTop = 0;
        let spacerEl = pinSpacer;
        while (spacerEl) {
          spacerTop += spacerEl.offsetTop;
          spacerEl = spacerEl.offsetParent;
        }
        bottom = spacerTop + pinSpacer.offsetHeight;
        top = spacerTop;
      } else {
        bottom = top + el.offsetHeight;
      }

      sections.push({ id: item.id, top, bottom });
    }

    // Sort by top position (should already be in order, but just in case)
    sections.sort((a, b) => a.top - b.top);

    // Find which section the probe point falls into
    let active = "home";

    for (let i = sections.length - 1; i >= 0; i--) {
      if (probePoint >= sections[i].top) {
        active = sections[i].id;
        break;
      }
    }

    // Edge case: if near bottom of page, activate last section
    const docHeight = document.documentElement.scrollHeight;
    if (scrollY + viewportHeight >= docHeight - 50) {
      active = sections[sections.length - 1]?.id || active;
    }

    return active;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Background threshold
        setScrolled(currentScrollY > 20);

        // Show/hide on direction change
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          setVisible(false);
          setMobileMenuOpen(false);
        } else {
          setVisible(true);
        }

        lastScrollY.current = currentScrollY;

        // Active section detection
        const active = detectActiveSection();
        setActiveSection(active);

        ticking.current = false;
      });
    };

    // Run once on mount
    handleScroll();

    // Also re-detect after GSAP finishes setup (pinning modifies DOM)
    const initialTimeout = setTimeout(() => {
      const active = detectActiveSection();
      setActiveSection(active);
    }, 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also listen to resize since GSAP recalculates pins
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(initialTimeout);
    };
  }, [detectActiveSection]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // For pinned sections, we need to find the pin-spacer's position
    const pinSpacer = el.closest(".pin-spacer");
    let targetY;

    if (pinSpacer) {
      let top = 0;
      let current = pinSpacer;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent;
      }
      targetY = top;
    } else {
      let top = 0;
      let current = el;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent;
      }
      targetY = top;
    }

    window.scrollTo({ top: targetY, behavior: "smooth" });
    setMobileMenuOpen(false);

    // Force update active section after scroll completes
    setTimeout(() => {
      setActiveSection(id);
    }, 600);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] flex justify-center pt-4 main-container transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
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
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm shrink-0 bg-white/5 transition-all duration-300 group-hover:rotate-45">
            <Image width={32} height={32} alt="logo" src={"/icons/code.png"} />
          </div>
          <span className="font-mono text-[11px] tracking-[0.25em] font-black uppercase hidden sm:inline-block">
            MUBASHIR //
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative font-mono text-[11px] tracking-widest font-bold uppercase transition-colors duration-300 py-1 group
                  ${isActive ? "text-white" : "text-white/60 hover:text-white"}
                `}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:block">
          <OutlineButton
            href="mailto:m.mubashirweb@gmail.com"
            as="a"
            variant="light"
            filled
            showIcon={false}
            className="px-5 py-2.5 text-[11px]"
          >
            m.mubashirweb@gmail.com
          </OutlineButton>
        </div>

        {/* MOBILE HAMBURGER */}
        <MenuButton
          isOpen={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* MOBILE MENU DROPDOWN */}
        <div
          className={`absolute top-[calc(100%+12px)] inset-x-0 p-6 rounded-3xl bg-[#0a0a0a]/95 backdrop-blur-lg border border-white/10 shadow-2xl flex flex-col gap-6 md:hidden transition-all duration-400 transform origin-top
            ${mobileMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-90 pointer-events-none"}`}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`font-mono text-xs tracking-widest uppercase py-2 border-b border-white/5 flex items-center justify-between transition-colors duration-300
                    ${isActive ? "text-white" : "text-white/70 hover:text-white"}
                  `}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="text-[9px] font-black tracking-wider text-white/50">
                      {"// ACTIVE"}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <OutlineButton
            href="mailto:m.mubashirweb@gmail.com"
            as="a"
            variant="light"
            filled
            showIcon={false}
            className="w-full justify-center text-center py-3"
          >
            m.mubashirweb@gmail.com
          </OutlineButton>
        </div>
      </nav>
    </div>
  );
}
