"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Masonry from "./Masonry";

const items = [
  {
    id: "1",
    img: "/images/html.png",
    height: 260,
    card: { name: "HTML5", color: "#e34f26" },
  },
  {
    id: "2",
    img: "/images/css.png",
    height: 180,
    card: { name: "CSS3", color: "#1572b6" },
  },
  {
    id: "3",
    img: "/images/js.png",
    height: 320,
    card: { name: "JavaScript", color: "#f7df1e" },
  },
  {
    id: "4",
    img: "/images/react.png",
    height: 200,
    card: { name: "React", color: "#61dafb" },
  },
  {
    id: "5",
    img: "/images/redux.png",
    height: 300,
    card: { name: "Redux", color: "#764abc" },
  },
  {
    id: "6",
    img: "/images/tailwind.png",
    height: 160,
    card: { name: "Tailwind", color: "#38bdf8" },
  },
  {
    id: "7",
    img: "/images/node.png",
    height: 340,
    card: { name: "Node.js", color: "#3c873a" },
  },
  {
    id: "8",
    img: "/images/express.png",
    height: 180,
    card: { name: "Express", color: "#cccccc" },
  },
  {
    id: "9",
    img: "/images/mongodb.png",
    height: 280,
    card: { name: "MongoDB", color: "#4db33d" },
  },
  {
    id: "10",
    img: "/images/gsap.png",
    height: 220,
    card: { name: "GSAP", color: "#88ce02" },
  },
  {
    id: "11",
    img: "/images/git.png",
    height: 190,
    card: { name: "Git", color: "#f05032" },
  },
];

// Orbit node helper
function OrbitNode({ src, diameter, angle, iconSize = 28, opacity = 0.55 }) {
  const radius = diameter / 2;
  const rad = (angle * Math.PI) / 180;
  const x = radius * Math.sin(rad);
  const y = -radius * Math.cos(rad);

  return (
    <Image
      src={src}
      alt="orbit-node"
      width={iconSize}
      height={iconSize}
      className="absolute object-contain grayscale"
      style={{
        opacity,
        left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
        top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
      }}
    />
  );
}

function useOrbitScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 480) return setScale(0.3);
      if (w < 640) return setScale(0.4);
      if (w < 768) return setScale(0.55);
      if (w < 1024) return setScale(0.7);
      if (w < 1280) return setScale(0.85);
      setScale(1);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return scale;
}

export default function Skills() {
  const scale = useOrbitScale();

  const orbits = {
    inner: 450 * scale,
    mid1: 750 * scale,
    mid2: 1050 * scale,
    outer: 1400 * scale,
    horizon: 1750 * scale,
  };

  const iconSize = Math.max(16, Math.round(28 * scale));
  const iconSizeLg = Math.max(18, Math.round(30 * scale));

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 rounded-t-[20px] sm:rounded-t-[28px] md:rounded-t-[32px] bg-white z-20">
      {/* ORBIT LINES */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <div
          className="absolute rounded-full border border-dashed border-black/[0.18] animate-[spin_110s_linear_infinite]"
          style={{ width: `${orbits.inner}px`, height: `${orbits.inner}px` }}
        />

        <div
          className="absolute rounded-full border border-black/[0.14] animate-[spin_160s_linear_infinite_reverse]"
          style={{ width: `${orbits.mid1}px`, height: `${orbits.mid1}px` }}
        >
          <OrbitNode
            src="/images/react.png"
            diameter={orbits.mid1}
            angle={0}
            iconSize={iconSize}
            opacity={0.6}
          />
          <OrbitNode
            src="/images/node.png"
            diameter={orbits.mid1}
            angle={270}
            iconSize={iconSize}
            opacity={0.6}
          />
        </div>

        <div
          className="absolute rounded-full border border-dotted border-black/[0.28] animate-[spin_240s_linear_infinite]"
          style={{ width: `${orbits.mid2}px`, height: `${orbits.mid2}px` }}
        >
          <OrbitNode
            src="/images/html.png"
            diameter={orbits.mid2}
            angle={50}
            iconSize={iconSize}
            opacity={0.55}
          />
          <OrbitNode
            src="/images/js.png"
            diameter={orbits.mid2}
            angle={300}
            iconSize={iconSize}
            opacity={0.55}
          />
        </div>

        <div
          className="absolute rounded-full border border-solid border-black/[0.1] animate-[spin_320s_linear_infinite_reverse]"
          style={{ width: `${orbits.outer}px`, height: `${orbits.outer}px` }}
        >
          <OrbitNode
            src="/images/mongodb.png"
            diameter={orbits.outer}
            angle={70}
            iconSize={iconSizeLg}
            opacity={0.45}
          />
        </div>

        <div
          className="absolute rounded-full border border-dashed border-black/[0.06] animate-[spin_400s_linear_infinite]"
          style={{
            width: `${orbits.horizon}px`,
            height: `${orbits.horizon}px`,
          }}
        />
      </div>

      {/* Content */}
      <div className="main-container relative z-10 px-3 sm:px-4 md:px-6">
        <h2
          className="font-heading 
          text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl 
          text-center capitalize tracking-tighter leading-none text-foreground font-bold 
          p-2 sm:p-4 textImage"
        >
          tech stack
        </h2>

        {/* Auto-sizing wrapper — Masonry now calculates its own height */}
        <div className="w-full mt-6 sm:mt-8 md:mt-12">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
          />
        </div>
      </div>
    </section>
  );
}
