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

interface Recipe {
  id: number;
  nama: string;
  photoResep: string;
  time: string | number;
  category: string;
  isFree?: boolean;
  rating?: number;
  user?: {
    name: string;
    photo: string;
  };
  price?: number;
  slug?: string;
}
// Interfaces for type safety
interface Comment {
  user: {
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

const DetailResep = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const recipeById = async () => {
      const res = await fetch(`http://localhost:4000/v1/resep/1`);

      const data = await res.json();
      console.log(data);
      setRecipe(data.data);
    };
    recipeById();
  }, [id]);

  if (!recipe) {
    return <div className="text-center py-10">Loading recipe...</div>;
  }

  // Utility to add id to comments and replies if missing
  function addIdsToComments(comments: any[]): any[] {
    return comments.map((comment: any, idx: number) => ({
      ...comment,
      id: comment.id || `comment-${idx}-${Math.random().toString(36).slice(2, 8)}`,
      replies: (comment.replies || []).map((reply: any, ridx: number) => ({
        ...reply,
        id: reply.id || `reply-${idx}-${ridx}-${Math.random().toString(36).slice(2, 8)}`,
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
            <InstructionsSection instructions={recipe.instructions} notes={recipe.notes} />
          </div>
          <CommentsSection comments={commentsWithIds} />
        </div>
        <div className="w-full md:w-80 flex-shrink-0">
          <RecipeSidebar recipes={recipe} />
        </div>
      </div>
    </>
  );
};
