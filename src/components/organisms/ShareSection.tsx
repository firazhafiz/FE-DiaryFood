"use client";

import React from "react";
import Image from "next/image";
import { FoodShare, DrinkShare } from "../../../public/assets";
import { motion } from "framer-motion";
import Link from "next/link";

const ShareSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl p-6 md:p-10 gap-8 md:gap-0">
    {" "}
    {/* Images */}
    <div className="flex z-2 flex-row md:flex-col gap-4 md:gap-0 md:mr-8 relative w-full md:w-auto md:min-w-[320px] md:max-w-[340px]">
      <TiltCard>
        <div className="relative w-[160px] h-[180px] md:w-[250px] md:h-[300px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={FoodShare}
            alt="Share 1"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 900px) 160px, 220px"
          />
        </div>
      </TiltCard>
      <TiltCard>
        <div className="relative w-[120px] h-[100px] md:w-[180px] md:h-[120px] rounded-xl overflow-hidden shadow-lg md:absolute md:bottom-[-32px] md:left-[120px] border-2 border-white">
          <Image
            src={DrinkShare}
            alt="Share 2"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 120px, 180px"
          />
        </div>
      </TiltCard>
    </div>
    {/* Text & Button */}
    <div className="flex flex-col items-start md:items-start z-2">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Share Your{" "}
        <span className="text-[color:var(--custom-orange)]">Recipes</span>
      </h3>
      <p className="mb-6 text-sm text-gray-600 max-w-md">
        Showcase your favorite cooking creations by uploading complete recipes
        with photos, cooking steps, and your special tips. Get a chance to be
        featured on the homepage and inspire millions of people!
      </p>
      <Link href="/profile/my-recipe/add-recipe">
        <button className="px-7 py-3 bg-[color:var(--custom-orange)] cursor-pointer text-sm text-white rounded-full font-semibold shadow hover:brightness-95 transition">
          Create Recipe Now
        </button>
      </Link>
    </div>
  </div>
);

// TiltCard component for 3D tilt effect
const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 3;
    const centerY = rect.height / 3;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * -10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export default ShareSection;
