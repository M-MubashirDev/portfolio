"use client";
import Image from "next/image";
import Beams from "./Beams";
import SocialButton from "../ui/SocialButton";

export default function Hero() {
  return (
    <div className="relative min-h-screen md:h-screen w-full overflow-hidden bg-[#0a0a0a] select-none flex items-center">
      {/* Beams as background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.1}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* ASYMMETRICAL TEXT HUD MARGINS */}
      {/* Left Marginal Sub-header */}
      <div className="absolute left-6 lg:left-12 top-24 z-20 pointer-events-none hidden xl:block">
        <span className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">
          {"// CREATIVE Web Developer"}
        </span>
      </div>

      {/* Right Marginal Vertical Role Tag */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right z-20 pointer-events-none hidden xl:block">
        <span className="font-mono text-[11px] tracking-[0.5em] text-white font-black uppercase whitespace-nowrap">
          WEB DEVELOPER // Software Engineer
        </span>
      </div>

      {/* Main Structural Container */}
      <div className="relative main-container w-full pt-[100px] pb-12 md:py-0 z-10 flex flex-col md:flex-row items-center justify-between h-full min-h-screen md:min-h-0 gap-6 lg:gap-12">
        {/* LEFT COMPOSITION: Name Typography with Image Mask */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start relative z-20 order-2 md:order-1 px-4 md:px-0">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-[100px] lg:text-[130px] xl:text-[150px] text-left leading-[0.85] font-black tracking-tighter textImageBlack uppercase">
            Muh <br /> Mubashir
          </h1>

          {/* Elegant Contextual Description under your name */}
          <p className="mt-6 md:mt-8 max-w-[320px] font-sans text-xs md:text-[13px] text-white/50 leading-relaxed font-light tracking-wide">
            Engineering high-fidelity{" "}
            <span className="text-foreground">full stack</span> solutions,
            crafting clean interactive systems with extreme focus on UI
            performance.
          </p>
        </div>

        {/* RIGHT COMPOSITION: Pure Portrait Depth Stack */}
        <div className="relative flex items-center justify-center h-[45vh] sm:h-[55vh] md:h-full w-full md:w-1/2 max-w-[450px] lg:max-w-[550px] self-center order-1 md:order-2">
          {/* INTERACTIVE CONTROLS HUD */}
          {/* Left Anchor Social Actions */}
          <div className="absolute bottom-4 md:bottom-[15%] lg:bottom-[20%] left-4 md:-left-4 xl:-left-12 flex flex-row md:flex-col gap-3 md:gap-4 z-30">
            <SocialButton icon={"/icons/linkedin.png"} />
            <SocialButton icon={"/icons/github.png"} />
            <div className="md:hidden">
              <SocialButton icon={"/icons/file-download.png"} />
            </div>
          </div>

          {/* Top Right Action: Document Download */}
          <div className="absolute top-4 md:top-[15%] hidden md:inline-block right-0 md:-right-4 xl:-right-12 z-30">
            <SocialButton icon={"/icons/file-download.png"} />
          </div>

          {/* WATERMARK PORTRAIT STRUCTURE */}
          <div className="absolute inset-0 md:relative w-full h-full flex items-center justify-center z-10">
            <div
              className="relative w-full h-full md:h-[80vh] lg:h-[85vh] max-h-[500px] md:max-h-[650px] lg:max-h-[750px] opacity-65 md:opacity-70 grayscale contrast-[1.25] brightness-[0.75] mix-blend-luminosity pointer-events-none transition-all duration-300"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 35%, transparent 85%)",
                maskImage:
                  "radial-gradient(circle at center, black 35%, transparent 85%)",
              }}
            >
              <Image
                src="/images/mubashir.png"
                alt="Mubashir Watermark Identity Portrait"
                fill
                priority
                className="object-contain object-center scale-110 sm:scale-105 md:scale-110 lg:scale-105"
              />
            </div>

            {/* Bottom Linear Dark Falloff Gradient */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
