"use client";

export default function OutlineButton({
  children,
  href,
  as = "a",
  icon = "→",
  showIcon = true,
  variant = "dark", // "dark" | "light"
  filled = false, // true = starts filled, hover reveals outline invert
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

  // ── filled variant: starts with solid bg, hover inverts ──
  // isDark + filled  → starts black bg / white text, hover → white fill / black text
  // !isDark + filled → starts white bg / black text, hover → black fill / white text
  const baseClass = filled
    ? isDark
      ? "border-white bg-white text-black hover:border-white"
      : "border-black bg-black text-white hover:border-black"
    : isDark
      ? "border-white/20 bg-white/5 text-white hover:border-white"
      : "border-black/20 bg-black/5 text-black hover:border-black";

  const fillLayerClass = filled
    ? isDark
      ? "bg-black" // hover fill is black (inverts from white start)
      : "bg-white" // hover fill is white (inverts from black start)
    : isDark
      ? "bg-white"
      : "bg-black";

  const textTopClass = filled
    ? isDark
      ? "text-black" // starting text on white bg
      : "text-white" // starting text on black bg
    : isDark
      ? "text-white"
      : "text-black";

  const textBottomClass = filled
    ? isDark
      ? "text-white" // inverted text on hover
      : "text-black"
    : isDark
      ? "text-black"
      : "text-white";

  const iconClass = filled
    ? isDark
      ? "text-black group-hover:text-white"
      : "text-white group-hover:text-black"
    : isDark
      ? "text-white group-hover:text-black"
      : "text-black group-hover:text-white";

  return (
    <Tag
      {...tagProps}
      {...rest}
      className={`
        group relative inline-flex items-center gap-3 overflow-hidden
        rounded-full border px-6 py-3
        font-mono text-[11px] tracking-[0.2em] uppercase font-bold cursor-pointer
        transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        ${baseClass}
        ${className}
      `}
    >
      {/* Sliding Fill Layer */}
      <span
        className={`
          absolute inset-0 translate-y-full
          transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:translate-y-0
          ${fillLayerClass}
        `}
      />

      {/* Sliding Text */}
      <span
        className="relative inline-block overflow-hidden"
        style={{ height: "12px", lineHeight: "12px" }}
      >
        <span
          className={`
            block whitespace-nowrap
            transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            group-hover:-translate-y-full
            ${textTopClass}
          `}
        >
          {children}
        </span>
        <span
          className={`
            absolute top-0 left-0 block whitespace-nowrap translate-y-full
            transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            group-hover:translate-y-0
            ${textBottomClass}
          `}
        >
          {children}
        </span>
      </span>

      {/* Arrow Icon */}
      {showIcon && (
        <span
          className={`
            relative inline-block text-[12px]
            transition-all duration-300
            group-hover:translate-x-1
            ${iconClass}
          `}
        >
          {icon}
        </span>
      )}
    </Tag>
  );
}
