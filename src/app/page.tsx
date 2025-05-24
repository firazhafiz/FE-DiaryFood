"use client";

import { useEffect, useState } from "react";
import MainTemplate from "../components/templates/MainTemplate";
import Loading from "./loading";
import type { Recipe } from "@/types/recipe";

const sampleRecipes = [
  {
    title: "Spaghetti Carbonara",
    image: "/assets/images/image_spaghetti.jpg",
    time: "30",
    category: "Italian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Firaz Fulvian Hafiz",
      avatar: "/assets/images/image_login.jpg",
    },
    slug: "spaghetti-carbonara",
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
      avatar: "/assets/images/image_login.jpg",
    },
    slug: "chicken-curry",
  },
  {
    title: "Beef Steak American",
    image: "/assets/images/image_steak.jpg",
    time: "25",
    category: "American",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Rengga Rendi",
      avatar: "/assets/images/image_login.jpg",
    },
    slug: "beef-steak-american",
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
      name: "Muhammad Ilham",
      avatar: "/assets/images/image_login.jpg",
    },
    slug: "pizza-margherita",
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
      name: "Bima Harinta",
      avatar: "/assets/images/image_login.jpg",
    },
    slug: "pizza-margherita-2",
  },
];

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [recipe, setRecipe] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      const response = await fetch("http://localhost:4000/v1/category");
      if (!response.ok) {
        throw new Error("Failed to fetch category list");
      }
      const data = await response.json();
      console.log(data);
      setCategoryList(data);
    };
    fetchCategoryList();
  }, []);

  console.log(recipe);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return <MainTemplate recipes={sampleRecipes} />;
}
