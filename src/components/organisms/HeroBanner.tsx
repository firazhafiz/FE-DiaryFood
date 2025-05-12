"use client";

import React from "react";
import Image from "next/image";
import { ImageBanner } from "../../../public/assets";

const HeroBanner = () => (
  <div className="rounded-2xl overflow-hidden relative mb-8">
    <Image
      src={ImageBanner}
      alt="Hero Banner"
      className="w-full h-70 object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-start p-8">
      <h2 className="text-4xl font-bold text-white mb-2">Salad Buah Keju</h2>
      <p className="text-md font-light text-white">Oleh Muhammad Ilham</p>
      {/* Tambahkan navigasi slider jika perlu */}
    </div>
  </div>
);

export default HeroBanner;
