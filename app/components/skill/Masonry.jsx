/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler),
      );
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 12;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;
    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, { ...animProps, duration, ease, overwrite: "auto" });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id) => {
    const wrapper = document.querySelector(`[data-key="${id}"]`);
    const el = wrapper?.querySelector(".card-inner");
    if (!el) return;
    const color = el.dataset.color;

    if (scaleOnHover) {
      gsap.to(wrapper, {
        scale: hoverScale,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    // neumorphic PRESSED effect — inset shadows
    gsap.to(el, {
      boxShadow: `inset -3px -3px 8px rgba(255,255,255,0.8), inset 3px 3px 8px rgba(209,205,199,0.8), 0 0 0 rgba(0,0,0,0)`,
      duration: 0.3,
      ease: "power2.out",
    });

    const glow = el.querySelector(".card-glow");
    if (glow) gsap.to(glow, { opacity: 1, duration: 0.4 });

    const name = el.querySelector(".card-name");
    if (name) gsap.to(name, { opacity: 1, y: -4, duration: 0.3 });

    const icon = el.querySelector("img");
    if (icon) gsap.to(icon, { scale: 1.08, duration: 0.4 });
  };

  const handleMouseLeave = (id) => {
    const wrapper = document.querySelector(`[data-key="${id}"]`);
    const el = wrapper?.querySelector(".card-inner");
    if (!el) return;

    if (scaleOnHover) {
      gsap.to(wrapper, { scale: 1, duration: 0.35, ease: "power2.out" });
    }

    // back to protruding
    gsap.to(el, {
      boxShadow: `-6px -6px 16px rgba(255,255,255,0.8), 6px 6px 16px rgba(209,205,199,0.7)`,
      duration: 0.3,
      ease: "power2.out",
    });

    const glow = el.querySelector(".card-glow");
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.35 });

    const name = el.querySelector(".card-name");
    if (name) gsap.to(name, { opacity: 0, y: 0, duration: 0.3 });

    const icon = el.querySelector("img");
    if (icon) gsap.to(icon, { scale: 1, duration: 0.4 });
  };
  return (
    <div ref={containerRef} className="relative w-full h-full">
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content"
          style={{ willChange: "transform, width, height, opacity" }}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
        >
          <div
            className="card-inner relative w-full h-full rounded-2xl flex flex-col items-center justify-center overflow-hidden"
            data-color={item.card.color}
            style={{
              background: "#ffff",
              boxShadow:
                "-6px -6px 16px rgba(255,255,255,0.8), 6px 6px 16px rgba(209,205,199,0.7)",
              borderRadius: "20px",
            }}
          >
            {/* remove ALL the overlay divs — dot grid, streaks, grain, card-bw, card-white, card-color-bg */}
            {/* keep ONLY the color glow and icon */}

            {/* color glow — hidden at rest, revealed on hover */}
            <div
              className="card-glow absolute inset-0 pointer-events-none opacity-0 rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at 50% 45%, ${item.card.color}25 0%, transparent 70%)`,
              }}
            />

            {/* icon */}
            <img
              src={item.img}
              alt={item.card.name}
              className="relative z-10 object-contain"
              style={{ width: "50%", height: "50%" }}
            />

            {/* name — shows on hover */}
            <p className="card-name relative z-10 text-sm font-semibold mt-3 opacity-0 text-gray-500 tracking-wide">
              {item.card.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
