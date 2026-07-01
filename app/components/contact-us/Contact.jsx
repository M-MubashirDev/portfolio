"use client";

import { useRef, useState, useTransition } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import OutlineButton from "../ui/OutlineButtons";
import { contactSchema } from "@/app/lib/contactSchema";
import { sendContactEmail } from "@/app/actions/sendContactEmail";

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    objective: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation first
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0];
      toast.error(firstError.message);
      return;
    }

    // Call the server action inside transition
    startTransition(async () => {
      const loadingToast = toast.loading("Sending inquiry...");

      try {
        const response = await sendContactEmail(formData);

        toast.dismiss(loadingToast);

        if (response.success) {
          toast.success("Message sent! I'll reply within 24h.");
          setFormData({
            name: "",
            email: "",
            phone: "",
            objective: "",
            message: "",
          });
        } else {
          toast.error(response.error || "Failed to send. Try again.");
        }
      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".contact-subtitle",
        { opacity: 0, y: 15 },
        { opacity: 0.6, y: 0, duration: 0.5 },
      )
        .fromTo(
          ".contact-title",
          { clipPath: "inset(100% 0 0 0)", y: 30 },
          {
            clipPath: "inset(0% 0 0% 0)",
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".contact-form-row",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".contact-meta",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full main-container bg-[#0a0a0a] text-white py-32 md:py-48 relative overflow-hidden"
    >
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="main-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="contact-subtitle block font-mono text-[11px] tracking-[0.4em] text-white/60 uppercase mb-2">
              // INITIATE TRANSITION
            </span>
            <h2 className="contact-title textImageBlack font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-white">
              START A<br />
              PROJECT
            </h2>
          </div>

          <div className="hidden lg:block space-y-6 pt-12 border-t border-white/10 contact-meta">
            <div>
              <span className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1">
                // AVAILABILITY
              </span>
              <p className="font-mono text-[12px] text-white/80 font-medium">
                OPEN FOR CLIENT INQUIRIES · 2026
              </p>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1">
                // DIRECT HUB
              </span>
              <a
                href="mailto:m.mubashirweb@gmail.com"
                className="font-mono text-[12px] text-white/80 hover:text-white font-medium transition-colors duration-300 underline underline-offset-4 decoration-white/20 hover:decoration-white"
              >
                m.mubashirweb@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-12"
            noValidate
          >
            {/* Row 1: Name & Email */}
            <div className="contact-form-row grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="YOUR NAME"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isPending}
                  className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300 disabled:opacity-50"
                />
                <div
                  className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${
                    focusedField === "name" ? "scale-x-100 bg-white" : ""
                  }`}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL ADDRESS"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isPending}
                  className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300 disabled:opacity-50"
                />
                <div
                  className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${
                    focusedField === "email" ? "scale-x-100 bg-white" : ""
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Phone & Prime Objective */}
            <div className="contact-form-row grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="PHONE NUMBER"
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isPending}
                  className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300 disabled:opacity-50"
                />
                <div
                  className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${
                    focusedField === "phone" ? "scale-x-100 bg-white" : ""
                  }`}
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="PRIME OBJECTIVE"
                  onFocus={() => setFocusedField("objective")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isPending}
                  className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300 disabled:opacity-50"
                />
                <div
                  className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${
                    focusedField === "objective" ? "scale-x-100 bg-white" : ""
                  }`}
                />
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="contact-form-row relative">
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="TELL ME ABOUT THE SYSTEM & VISION"
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                disabled={isPending}
                className="w-full bg-transparent py-4 text-sm font-mono tracking-wide uppercase placeholder:text-white/40 text-white focus:outline-none transition-all duration-300 resize-none disabled:opacity-50"
              />
              <div
                className={`absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-all duration-500 origin-left ${
                  focusedField === "message" ? "scale-x-100 bg-white" : ""
                }`}
              />
            </div>

            {/* Row 4: Action Footer */}
            <div className="contact-form-row pt-4 flex items-center justify-between">
              <OutlineButton
                as="button"
                variant="dark"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Submit Inquiry"}
              </OutlineButton>

              <span className="hidden md:inline-block font-mono text-[10px] text-white/50 tracking-wider">
                // RESPONSIVENESS WINDOW WITHIN 24H
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
