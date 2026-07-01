"use client";

export default function MenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/5 md:hidden focus:outline-none z-50 overflow-hidden"
      aria-label="Toggle Navigation"
    >
      {/* sliding icon window — fixed height, two stacked copies */}
      <span
        className="relative inline-block overflow-hidden select-none"
        style={{ height: "14px", lineHeight: "14px" }}
      >
        {/* top copy — slides up on hover */}
        <span
          className="block whitespace-nowrap font-mono font-bold text-white tracking-[-0.05em] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
          style={{ fontSize: "13px" }}
        >
          {isOpen ? "×" : "//"}
        </span>

        {/* bottom copy — slides in from below on hover */}
        <span
          className="absolute top-0 left-0 block whitespace-nowrap font-mono font-bold text-white tracking-[-0.05em] translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
          style={{ fontSize: "13px" }}
        >
          {isOpen ? "×" : "//"}
        </span>
      </span>
    </button>
  );
}
