"use client";

import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  status: "published" | "draft";
  image: string;
  description: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: string;
  }>;
  instructions: Array<{
    id: number;
    step: string;
  }>;
  notes: string;
  cookingTime: string;
  servings: number;
  difficulty: string;
  isFree: boolean;
  price: number;
}

const DetailMyRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    console.log(id);
    const fetchRecipe = async () => {
      if (!id) {
        setError("Recipe ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !recipe) {
    return <div className="text-center py-8 text-red-500">{error || "Recipe not found"}</div>;
  }

  return (
    <div className="p-8">
      <DetailHeader recipe={recipe} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <IngredientsSection ingredients={recipe.ingredients} />
        <InstructionsSection instructions={recipe.instructions} notes={recipe.notes} />
      </div>
    </div>
  );
};

export default DetailMyRecipe;
