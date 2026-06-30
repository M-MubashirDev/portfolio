"use client";

import { useState } from "react";
import UmbrellaArch from "./UmbrellaArch";
import { CircleSlider } from "./CircleSlider";
import { WhyChoseText } from "./ExprienceText";

const BRAND_SLIDES = [
  {
    name: "NexaVista",
    logo: "/images/nexaVistaLogo.svg",
    centerText: "Modern digital experiences crafted for ambitious brands.",
    whyChoose: [
      {
        title: "Vision-Led Strategy",
        descrption:
          "We align product design and development with your long-term business vision.",
      },
      {
        title: "Elegant User Experience",
        descrption:
          "We build intuitive, polished, and user-focused interfaces that leave a lasting impact.",
      },
      {
        title: "Fast Product Execution",
        descrption:
          "From idea to launch, we move quickly while maintaining quality and attention to detail.",
      },
      {
        title: "Scalable Digital Growth",
        descrption:
          "Our solutions are built to evolve with your brand as your audience and business expand.",
      },
    ],
  },
  {
    name: "InfinityBits",
    logo: "/images/infinityBitsLogo.svg",
    centerText: "Reliable engineering and scalable products built for growth.",
    whyChoose: [
      {
        title: "Expertise",
        descrption:
          "Our skilled team stays ahead of digital trends to deliver innovative, cutting-edge solutions.",
      },
      {
        title: "Results-Driven Solutions",
        descrption:
          "We combine creativity and technology to craft digital products that drive growth and enhance user experience.",
      },
      {
        title: "Client-Centric Approach",
        descrption:
          "We put clients first, listening to your goals and challenges to deliver tailored solutions. Your success is our priority.",
      },
      {
        title: "Collaborative Partnership",
        descrption:
          "We build long-term partnerships, offering continuous support and updates to keep your digital products thriving.",
      },
    ],
  },
];

const textPositions = [
  "w-fit translate-y-[250%] mr-10 -translate-x-[15%] lg:translate-y-[220%] xl:translate-y-[250%] z-100 mb-4",
  "w-fit -translate-x-[15%] lg:translate-y-[20%] xl:translate-y-[30%] z-100 mb-4",
  "w-fit translate-x-[10%] lg:translate-y-[20%] xl:translate-y-[30%] z-100 mb-4",
  "w-fit translate-y-[250%] translate-x-[25%] ml-10 lg:translate-y-[220%] xl:translate-y-[250%] z-100 mb-4",
];

const tabKeys = ["first", "second", "third", "fourth"];

export default function Exprience() {
  const [activeTab, setActiveTab] = useState(null);
  const [currentBrand, setCurrentBrand] = useState(0);

  const currentContent = BRAND_SLIDES[currentBrand];

  return (
    <div
      className="pt-24 main-container rounded-t-2xl"
      style={{ background: "#ffffff" }}
    >
      <h2 className="font-heading text-9xl text-center capitalize indent-16 leading-26 text-foreground font-bold p-4 textImage mb-12">
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
                descrption={item.descrption}
              />
            </div>
          ))}
        </div>

        <UmbrellaArch setActiveTab={setActiveTab} activeTab={activeTab} />

        <div className="md:w-44 md:h-44 min-[800px]:w-56 min-[800px]:h-56 min-[1000px]:w-60 min-[1000px]:h-60 lg:w-60 lg:h-60 xl:h-75 xl:w-75 translate-y-[-75%]">
          <CircleSlider
            items={BRAND_SLIDES}
            current={currentBrand}
            setCurrent={setCurrentBrand}
            interval={3500}
          />
        </div>
      </div>
    </div>
  );
}
