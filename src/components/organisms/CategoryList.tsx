"use client";

import React from "react";
import CategoryCircle from "../molecules/CategoryCircle";

const categories = [
  { image: "/cat1.jpg", label: "Makanan Daerah" },
  { image: "/cat2.jpg", label: "Resep Sarapan" },
  { image: "/cat3.jpg", label: "Makanan Penutup" },
  { image: "/cat4.jpg", label: "Camilan & Kudapan" },
  { image: "/cat5.jpg", label: "Resep Makan Malam" },
  { image: "/cat6.jpg", label: "Resep Sehat" },
  { image: "/cat7.jpg", label: "Minuman Segar" },
  { image: "/cat8.jpg", label: "Resep Anak" },
];

const CategoryList = () => (
  <div className="flex flex-wrap justify-center gap-6 my-8">
    {categories.map((cat, idx) => (
      <CategoryCircle key={idx} image={cat.image} label={cat.label} />
    ))}
  </div>
);

export default CategoryList;
