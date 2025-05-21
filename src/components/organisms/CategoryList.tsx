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
    label: "Regional Cuisine",
    description: "Traditional Indonesian regional recipes",
  },
  {
    image: CatBreakfast,
    label: "Breakfast Recipes",
    description: "Healthy and nutritious breakfast menus",
  },
  {
    image: CatDessert,
    label: "Desserts",
    description: "Sweet and delicious desserts",
  },
  {
    image: CatCamilan,
    label: "Snacks & Treats",
    description: "Snacks and treats for various occasions",
  },
  {
    image: CatDinner,
    label: "Dinner Recipes",
    description: "Family dinner menus",
  },
  {
    image: CatCleanFood,
    label: "Healthy Recipes",
    description: "Healthy and nutritious meals",
  },
  {
    image: CatCleanDrink,
    label: "Fresh Drinks",
    description: "Healthy and refreshing beverages",
  },
  {
    image: CatChild,
    label: "Kids Recipes",
    description: "Special menus for children",
  },
];

const CategoryList = () => (
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
      Recipe Categories
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
