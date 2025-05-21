"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MainTemplate from "../../components/templates/MainTemplate";
import Loading from "../loading";

interface Recipe {
  id?: string;
  title: string;
  image: string;
  time: string;
  category: string;
  isFree: boolean;
  rating: number;
  author: {
    name: string;
    avatar: string;
  };
  ingredients: string[];
  instructions: string[];
  status?: string;
}

interface RecipeData {
  [key: string]: Recipe;
}

// Dummy data for recipes
const dummyRecipes: RecipeData = {
  "spaghetti-carbonara": {
    id: "1",
    title: "Spaghetti Carbonara",
    image: "/assets/images/image_spaghetti.jpg",
    time: "30",
    category: "Italian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Chef Mario",
      avatar: "/assets/images/avatar_chef.jpg",
    },
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino Romano",
      "100g Parmigiano-Reggiano",
      "Black pepper",
      "Salt",
    ],
    instructions: [
      "Bring a large pot of salted water to boil",
      "Cook spaghetti according to package instructions",
      "Meanwhile, cut pancetta into small cubes",
      "In a bowl, whisk eggs with grated cheeses and black pepper",
      "Fry pancetta until crispy",
      "Drain pasta and mix with pancetta",
      "Remove from heat and quickly stir in egg mixture",
      "Serve immediately with extra cheese and black pepper",
    ],
    status: "published",
  },
  "chicken-curry": {
    id: "2",
    title: "Chicken Curry",
    image: "/assets/images/image_curry.jpg",
    time: "45",
    category: "Indian",
    isFree: true,
    rating: 4.8,
    author: {
      name: "Chef Priya",
      avatar: "/assets/images/avatar_chef.jpg",
    },
    ingredients: [
      "500g chicken thighs",
      "2 onions",
      "3 tomatoes",
      "2 tbsp curry powder",
      "1 cup coconut milk",
      "Fresh coriander",
      "Salt and pepper",
    ],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Dice onions and tomatoes",
      "Heat oil in a large pan",
      "Fry onions until golden",
      "Add chicken and cook until browned",
      "Add curry powder and stir",
      "Add tomatoes and coconut milk",
      "Simmer for 20 minutes",
      "Garnish with fresh coriander",
    ],
    status: "published",
  },
};

export default function RecipeDetail() {
  const params = useParams();
  const recipeSlug = params?.slug as string;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    console.log("Loading recipe for slug:", recipeSlug);
    console.log("Available recipes:", Object.keys(dummyRecipes));

    // In a real app, you would fetch the recipe data based on the slug
    // For now, we'll use our dummy data
    const recipeData = dummyRecipes[recipeSlug];

    if (recipeData) {
      console.log("Recipe found:", recipeData.title);
      setRecipe(recipeData);
    } else {
      console.warn("Recipe not found for slug:", recipeSlug);
      // Fallback to the first recipe if the requested one doesn't exist
      if (Object.keys(dummyRecipes).length > 0) {
        const firstRecipe = dummyRecipes[Object.keys(dummyRecipes)[0]];
        console.log("Falling back to:", firstRecipe.title);
        setRecipe(firstRecipe);
      }
    }
  }, [recipeSlug, mounted]);

  if (!mounted) {
    return <Loading />;
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Recipe not found</p>
      </div>
    );
  }

  return <MainTemplate recipes={[recipe]} />;
}
