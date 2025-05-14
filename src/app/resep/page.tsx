"use client";

import React, { useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import RecipeCardGrid from "@/components/organisms/RecipeCardGrid";
import FilterSidebar from "@/components/atoms/FilterSidebar";

const dummyRecipes = [
  {
    title: "Spaghetti Carbonara",
    image: "/assets/images/image_spaghetti.jpg",
    time: "30",
    category: "Italian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
  },
  {
    title: "Chicken Curry",
    image: "/assets/images/image_curry.jpg",
    time: "45",
    category: "Indian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
  },
  {
    title: "Beef Steak American",
    image: "/assets/images/image_steak.jpg",
    time: "25",
    category: "American",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
  },
  {
    title: "Pizza Margherita",
    image: "/assets/images/image_pizza.jpg",
    time: "35",
    category: "Italian",
    isFree: false,
    price: 100000,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
  },
  {
    title: "Pizza Margherita",
    image: "/assets/images/image_pizza.jpg",
    time: "35",
    category: "Italian",
    isFree: false,
    price: 100000,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
  },
];

const Resep = () => {
  const [recipes] = useState(dummyRecipes);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 flex flex-row gap-25 mb-12 mt-6 pt-[120px]">
        <div className="w-full md:w-1/4">
          <FilterSidebar />
        </div>
        <div>
          <RecipeCardGrid recipes={recipes} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resep;
