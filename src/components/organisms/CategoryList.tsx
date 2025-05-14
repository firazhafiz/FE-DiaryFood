"use client";

import React from "react";
import CategoryCircle from "../molecules/CategoryCircle";
import {
  CatDaerah,
  CatBreakfast,
  CatDessert,
  CatCamilan,
  CatDinner,
  CatCleanFood,
  CatCleanDrink,
  CatChild,
} from "../../../public/assets";

const categories = [
  {
    image: CatDaerah,
    label: "Makanan Daerah",
    description: "Resep masakan khas daerah Indonesia",
  },
  {
    image: CatBreakfast,
    label: "Resep Sarapan",
    description: "Menu sarapan sehat dan bergizi",
  },
  {
    image: CatDessert,
    label: "Makanan Penutup",
    description: "Hidangan penutup manis dan lezat",
  },
  {
    image: CatCamilan,
    label: "Camilan & Kudapan",
    description: "Snack dan kudapan untuk berbagai acara",
  },
  {
    image: CatDinner,
    label: "Resep Makan Malam",
    description: "Menu makan malam keluarga",
  },
  {
    image: CatCleanFood,
    label: "Resep Sehat",
    description: "Masakan sehat dan bergizi",
  },
  {
    image: CatCleanDrink,
    label: "Minuman Segar",
    description: "Minuman sehat dan menyegarkan",
  },
  {
    image: CatChild,
    label: "Resep Anak",
    description: "Menu khusus untuk anak-anak",
  },
];

const CategoryList = () => (
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
      Kategori Resep
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {categories.map((cat, idx) => (
        <CategoryCircle
          key={idx}
          image={cat.image}
          label={cat.label}
          description={cat.description}
        />
      ))}
    </div>
  </div>
);

export default CategoryList;
