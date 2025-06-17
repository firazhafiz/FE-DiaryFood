"use client";

import { Suspense, useEffect, useState } from "react";
import MainTemplate from "../components/templates/MainTemplate";
import type { Recipe } from "@/types/recipe";
import { config } from "@/config";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/resep`);
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

  return (
    <Suspense fallback={null}>
      <MainTemplate recipes={recipes} />
    </Suspense>
  );
}
