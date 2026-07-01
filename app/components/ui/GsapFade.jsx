"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const defaultConfig = {
  duration: 0.7,
  ease: "power2.out",
};

export function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          delay,
          ...defaultConfig,
          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeDown({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      gsap.fromTo(
        element,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          delay,
          ...defaultConfig,
          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeLeft({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      gsap.fromTo(
        element,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          delay,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeRight({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      gsap.fromTo(
        element,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          delay,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerFadeUp({
  children,
  stagger = 0.1,
  delay = 0,
  duration = 0.7,
  y = 30,
  className = "",
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = containerRef.current?.children;

      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power2.out",
          stagger: { each: stagger },
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
export function CountUp({ value, duration = 1.4 }) {
  const countRef = useRef(null);

  useGSAP(() => {
    const el = countRef.current;
    const endValue = parseInt(value.replace(/\D/g, ""), 10);

    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: endValue,
        duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          el.innerText = `${Math.floor(el.innerText)}+`;
        },
      },
    );
  }, []);

  return <span ref={countRef} />;
}
