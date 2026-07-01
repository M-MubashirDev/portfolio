"use client";

export default function OutlineButton({
  children,
  href,
  as = "a",
  icon = "→",
  variant = "dark", // "dark" | "light"
  className = "",
  disabled = false,
  ...rest
}) {
  const Tag = as === "button" ? "button" : "a";
  const tagProps =
    as === "button"
      ? {}
      : { href, target: "_blank", rel: "noopener noreferrer" };

  const isDark = variant === "dark";

  return (
    <Tag
      {...tagProps}
      {...rest}
      className={`
        group relative inline-flex items-center gap-3 overflow-hidden 
        rounded-full border px-6 py-3 
        font-mono text-[11px] tracking-[0.2em] uppercase font-bold cursor-pointer
        transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        ${
          isDark
            ? "border-white/20 bg-white/5 text-white hover:border-white"
            : "border-black/20 bg-black/5 text-black hover:border-black"
        }
        ${className}
      `}
    >
      {/* Sliding Fill Layer */}
      <span
        className={`
          absolute inset-0 translate-y-full 
          transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] 
          group-hover:translate-y-0
          ${isDark ? "bg-white" : "bg-black"}
        `}
      />

      {/* Sliding Text Block */}
      <span
        className="relative inline-block overflow-hidden"
        style={{ height: "12px", lineHeight: "12px" }}
      >
        {/* Top text — slides up on hover */}
        <span
          className={`
            block whitespace-nowrap 
            transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] 
            group-hover:-translate-y-full
            ${isDark ? "text-white" : "text-black"}
          `}
        >
          {children}
        </span>

        {/* Bottom text — slides in from bottom on hover (inverted color) */}
        <span
          className={`
            absolute top-0 left-0 block whitespace-nowrap translate-y-full
            transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] 
            group-hover:translate-y-0
            ${isDark ? "text-black" : "text-white"}
          `}
        >
          {children}
        </span>
      </span>

      {/* Arrow Icon — slides right + color inverts on hover */}
      <span
        className={`
          relative inline-block text-[12px] 
          transition-all duration-300 
          group-hover:translate-x-1
          ${isDark ? "text-white group-hover:text-black" : "text-black group-hover:text-white"}
        `}
      >
        {icon}
      </span>
    </Tag>
  );
}
