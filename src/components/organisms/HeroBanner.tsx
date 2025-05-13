"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ImageBanner1,
  ImageBanner2,
  ImageBanner3,
} from "../../../public/assets";

const slides = [
  {
    title: "Salad Buah Keju",
    author: "Oleh Muhammad Ilham",
    image: ImageBanner1,
  },
  {
    title: "Nasi Goreng Spesial",
    author: "Oleh Siti Aminah",
    image: ImageBanner2,
  },
  {
    title: "Es Jeruk Peras",
    author: "Oleh Budi Santoso",
    image: ImageBanner3,
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(Array(slides.length).fill(false));
  const total = slides.length;
  const sliderRef = useRef<HTMLDivElement>(null);

  // Preload all images
  useEffect(() => {
    slides.forEach((slide, idx) => {
      const img = new window.Image();
      img.src = typeof slide.image === "string" ? slide.image : slide.image.src;
      img.onload = () => {
        setLoaded((prev) => {
          const copy = [...prev];
          copy[idx] = true;
          return copy;
        });
      };
    });
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
  };
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <div className="rounded-2xl overflow-hidden relative mb-8 min-h-[320px]">
      <div
        ref={sliderRef}
        className="w-full h-70 min-h-[320px] relative"
        style={{
          overflow: "hidden",
        }}
      >
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${100 * slides.length}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="relative w-full h-full flex-shrink-0"
              style={{ width: `${100 / slides.length}%` }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-70 object-cover"
                fill
                priority={idx === 0}
                style={{
                  opacity: loaded[idx] ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-start p-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                  {slide.title}
                </h2>
                <p className="text-md font-light text-white">{slide.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Slider navigation */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center z-10">
        <div className="flex gap-4 mb-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center shadow transition"
            aria-label="Sebelumnya"
          >
            <span className="text-xl">&#8592;</span>
          </button>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center shadow transition"
            aria-label="Selanjutnya"
          >
            <span className="text-xl">&#8594;</span>
          </button>
        </div>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                idx === current ? "bg-white" : "bg-white/40"
              } block`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
