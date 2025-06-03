"use client";

import { useEffect, useState } from "react";
import MainTemplate from "../components/templates/MainTemplate";
import type { Recipe } from "@/types/recipe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/resep");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(Array.isArray(data.data.reseps) ? data.data.reseps : []);
      } catch (error) {
        console.log(error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner if needed globally
  }

  return <MainTemplate recipes={recipes} />;
}
