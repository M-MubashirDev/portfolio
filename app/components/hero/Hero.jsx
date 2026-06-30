"use client";
import Image from "next/image";
import Beams from "./Beams";

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
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

      {/* SVG shape on top */}
      <div className="relative main-container justify-center pt-[80px]  z-10 flex flex-col md:flex-row gap-4 h-full">
        <div className="h-full flex items-center">
          <h1 className="font-heading md:text-[180px] text-left indent-16  leading-34 font-bold textImageBlack">
            visual <br /> poetry
          </h1>
        </div>
        <Image
          src={"/images/puzzleHero.png"}
          width={600}
          height={700}
          className="self-center"
          alt="hero puzzle image"
        />
      </div>
    </div>
  );
}
