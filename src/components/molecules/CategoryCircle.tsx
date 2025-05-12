"use client";

import React from "react";

interface CategoryCircleProps {
  image: string;
  label: string;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ image, label }) => (
  <div className="flex flex-col items-center">
    <img
      src={image}
      alt={label}
      className="w-20 h-20 rounded-full object-cover mb-2"
    />
    <span className="text-sm font-medium text-center">{label}</span>
  </div>
);

export default CategoryCircle;
