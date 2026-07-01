"use client";

import { useState } from "react";
import UmbrellaArch from "./UmbrellaArch";
import { CircleSlider } from "./CircleSlider";
import { WhyChoseText } from "./ExprienceText";

const BRAND_SLIDES = [
  {
    name: "NexaVista",
    logo: "/images/nexaVistaLogo.svg",

    centerText:
      "My first professional journey, turning ideas into real products.",

    whyChoose: [
      {
        title: "Journey",
        description: "Full Stack • September 2024 — August 2025",
      },
      {
        title: "Projects",
        description:
          "Developed Freshify, Car Wash, and Foodie using modern frontend practices.",
      },
      {
        title: "Teamwork",
        description:
          "Learned collaboration, Git workflows, communication, and code reviews.",
      },
      {
        title: "Growth",
        description:
          "Built a strong foundation in React, APIs, and clean code.",
      },
    ],
  },

  {
    name: "InfinityBits",
    logo: "/images/infinityBitsLogo.svg",

    centerText:
      "Crafting polished user experiences with modern frontend technologies.",

    whyChoose: [
      {
        title: "Journey",
        description: "Frontend Developer • August 2025 — Present",
      },
      {
        title: "Projects",
        description:
          "Worked on Axigma, FarmsDrop, and the InfinityBits Portfolio.",
      },
      {
        title: "Professional Growth",
        description:
          "Improved UI architecture, teamwork, and product-focused development.",
      },
      {
        title: "Growth",
        description:
          "Strengthened my skills in React, Next.js, state management, and UI performance.",
      },
    ],
  },
];

const textPositions = [
  "w-fit translate-y-[250%] lg:mr-10 mr-2 -translate-x-[15%] lg:translate-y-[220%] xl:translate-y-[250%] z-100 mb-4",
  "w-fit -translate-x-[15%] lg:translate-y-[20%] xl:translate-y-[30%] z-100 mb-4",
  "w-fit translate-x-[10%] lg:translate-y-[20%] xl:translate-y-[30%] z-100 mb-4",
  "w-fit translate-y-[250%] translate-x-[25%] lg:ml-10 lg:translate-y-[220%] xl:translate-y-[250%] z-100 mb-4",
];

const tabKeys = ["first", "second", "third", "fourth"];

export default function Exprience() {
  const [activeTab, setActiveTab] = useState(null);
  const [currentBrand, setCurrentBrand] = useState(0);

  const currentContent = BRAND_SLIDES[currentBrand];

  return (
    <div className="pt-24  rounded-t-2xl" style={{ background: "#ffffff" }}>
      <div className="main-container">
        <h2
          className="font-heading 
          text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl 
          text-center capitalize tracking-tighter leading-none text-foreground font-bold 
          p-2 sm:p-4 textImage"
        >
          tech stack
        </h2>

        <div className="flex flex-col items-center">
          <div className="flex">
            {currentContent.whyChoose.map((item, index) => (
              <div
                key={`${currentContent.name}-${item.title}-${index}`}
                className={textPositions[index]}
              >
                <WhyChoseText
                  active={activeTab === tabKeys[index]}
                  title={item.title}
                  descrption={item.description}
                />
              </div>
            ))}
          </div>

          <UmbrellaArch setActiveTab={setActiveTab} activeTab={activeTab} />

          <div className="md:w-44 md:h-44 min-[800px]:w-56 min-[800px]:h-56 min-[1000px]:w-60 min-[1000px]:h-60 lg:w-60 lg:h-60 xl:h-75 xl:w-75 translate-y-[-85%]">
            <CircleSlider
              items={BRAND_SLIDES}
              current={currentBrand}
              setCurrent={setCurrentBrand}
              interval={3500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
