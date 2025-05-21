"use client";

import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const MoreButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Link href="/recipes">
    <button
      onClick={onClick}
      className="mx-auto bg-[color:var(--custom-orange)] hover:brightness-95 text-white font-medium rounded-md py-2 px-8 flex items-center justify-center gap-3 text-xs transition-all duration-200 cursor-pointer"
      type="button"
    >
      View All Recipes
      <FiArrowRight className="text-2xl" />
    </button>
  </Link>
);

export default MoreButton;
