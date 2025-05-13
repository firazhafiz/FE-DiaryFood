"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface CategoryCircleProps {
  image: string | StaticImageData;
  label: string;
  description?: string;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({
  image,
  label,
  description,
}) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <h3 className="text-base font-semibold text-gray-800 text-center mb-1">
      {label}
    </h3>
    {description && (
      <p className="text-sm text-gray-500 text-center line-clamp-2">
        {description}
      </p>
    )}
  </div>
);

export default CategoryCircle;
