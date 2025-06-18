import React from "react";
import Image from "next/image";
import HeroImage2 from "../../../public/assets/images/hero2.jpg";
import { TextHero } from "../molecules/TextHero";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[420px] pt-24 bg-gray-200 overflow-hidden rounded-b-4xl">
      <Image src={HeroImage2} alt="Hero Image" layout="fill" objectFit="cover" className="" priority />
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <TextHero />
      </div>
    </div>
  );
};

export default Hero;
