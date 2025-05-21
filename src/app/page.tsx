"use client";

import { useEffect, useState } from "react";
import MainTemplate from "../components/templates/MainTemplate";
import Loading from "./loading";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return <MainTemplate recipes={sampleRecipes} />;
}
