"use client";

import Image from "next/image";

export default function SocialButton({
  icon,
  href = "#",
  variant = "white",
  alt = "social icon",
}) {
  const isBlack = variant === "black";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full transition-all duration-500 hover:scale-105
        ${isBlack ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}`}
    >
      {/* Glass Hover Background */}
      <div
        className={`absolute inset-0 rounded-full scale-50 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100
          ${isBlack ? "bg-white/10" : "bg-black/10"}`}
      />

      {/* Sliding Icons */}
      <div className="relative z-10 h-7 w-7 overflow-hidden">
        {/* Top Icon */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-8">
          <Image
            src={icon}
            alt={alt}
            width={26}
            height={26}
            className="object-contain"
          />
        </div>

        {/* Bottom Icon */}
        <div className="absolute inset-0 flex translate-y-8 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
          <Image
            src={icon}
            alt={alt}
            width={26}
            height={26}
            className="object-contain"
          />
        </div>
      </div>
    </a>
  );
}
