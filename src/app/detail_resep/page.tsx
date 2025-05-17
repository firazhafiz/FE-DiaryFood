"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import CommentsSection from "@/components/molecules/CommentsSection";
import RecipeSidebar from "@/components/molecules/RecipeSidebar";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { dummyRecipes, sidebarRecipes, Recipe } from "@/data/recipes";

// Interfaces for type safety
interface Comment {
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  time: string;
  likes: number;
  replies: {
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    time: string;
    likes: number;
  }[];
}

interface Ingredient {
  text: string;
  checked: boolean;
}

const DetailResep = () => {
  const searchParams = useSearchParams();
  const recipeSlug = searchParams.get("recipe") || "nasi-goreng-saos-tiram";
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  console.log("URL params:", {
    recipeSlug,
    allParams: Object.fromEntries(searchParams.entries()),
    raw: searchParams.toString(),
  });

  useEffect(() => {
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
  }, [recipeSlug]);

  if (!recipe) {
    return <div className="text-center py-10">Loading recipe...</div>;
  }

  // Utility to add id to comments and replies if missing
  function addIdsToComments(comments: any[]): any[] {
    return comments.map((comment: any, idx: number) => ({
      ...comment,
      id:
        comment.id ||
        `comment-${idx}-${Math.random().toString(36).slice(2, 8)}`,
      replies: (comment.replies || []).map((reply: any, ridx: number) => ({
        ...reply,
        id:
          reply.id ||
          `reply-${idx}-${ridx}-${Math.random().toString(36).slice(2, 8)}`,
      })),
    }));
  }

  const commentsWithIds = addIdsToComments(recipe.comments || []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8 pt-34">
        <div className="flex-1 min-w-0">
          <DetailHeader recipe={recipe} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <IngredientsSection ingredients={recipe.ingredients} />
            <InstructionsSection
              instructions={recipe.instructions}
              notes={recipe.notes}
            />
          </div>
          <CommentsSection comments={commentsWithIds} />
        </div>
        <div className="w-full md:w-80 flex-shrink-0">
          <RecipeSidebar recipes={Object.values(dummyRecipes)} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailResep;
