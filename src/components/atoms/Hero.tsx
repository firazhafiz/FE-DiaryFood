import React from "react";
import Image from "next/image";
import HeroImage2 from "../../../public/assets/images/hero2.jpg";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[420px] pt-24 bg-gray-200 overflow-hidden rounded-b-4xl">
      <Image
        src={HeroImage2}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        className=""
      />
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-lg">
            <span className="text-[var(--custom-orange)]">Welcome</span>, Enjoy
            your Journey
          </h2>
          <p className="text-xl drop-shadow-lg">With an Amazing Recipes !</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
