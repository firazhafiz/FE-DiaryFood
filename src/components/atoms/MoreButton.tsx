"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";

const MoreButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mx-auto bg-[color:var(--custom-orange)] hover:brightness-95 text-white font-medium rounded-md py-2 px-8 flex items-center justify-center gap-3 text-xs transition-all duration-200"
    type="button"
  >
    Lihat Semua Resep
    <FiArrowRight className="text-2xl" />
  </button>
);

export default MoreButton;
