"use client";

import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import CommentsSection from "@/components/molecules/CommentsSection";
import RecipeSidebar from "@/components/molecules/RecipeSidebar";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { RecipeDetail } from "@/types/recipe-detail";
import { Comments } from "@/types/comments";

export default function DetailResep() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeId = searchParams.get("recipeId");
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    if (!recipeId) {
      setError("ID resep tidak ditemukan. Kembali ke halaman utama?");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const parsedRecipeId = parseInt(recipeId);
        if (isNaN(parsedRecipeId)) {
          throw new Error("ID resep tidak valid");
        }

        const recipeResponse = await fetch(
          `http://localhost:4000/v1/resep/${parsedRecipeId}`
        );
        if (!recipeResponse.ok) {
          throw new Error("Resep tidak ditemukan di server");
        }
        const recipeData = await recipeResponse.json();
        console.log("Recipe detail fetched:", recipeData);
        if (!recipeData.data) {
          throw new Error("Data resep tidak tersedia");
        }
        setRecipe(recipeData.data);

        const recipesResponse = await fetch("http://localhost:4000/v1/resep");
        if (!recipesResponse.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const recipesData = await recipesResponse.json();
        if (Array.isArray(recipesData.data.reseps)) {
          const filteredRecipes = recipesData.data.reseps.filter(
            (r: Recipe) => r.id !== parsedRecipeId
          );
          setRecipes(filteredRecipes.slice(0, 2));
        } else {
          setRecipes([]);
        }

        const commentsResponse = await fetch(
          `http://localhost:4000/v1/resep/${parsedRecipeId}/comment`
        );
        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments");
        }
        const commentsData = await commentsResponse.json();
        console.log("Comments fetched:", commentsData);
        if (Array.isArray(commentsData.data)) {
          setComments(commentsData.data);
        } else {
          setComments([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "Gagal mengambil detail resep"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  // Tampilkan error jika ada dengan opsi kembali
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-red-500 text-lg">{error}</div>
        <button
          onClick={() => router.push("/")}
          className="bg-[color:var(--custom-orange)] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Tampilkan pesan jika resep tidak ditemukan, tetapi hanya setelah loading selesai
  if (!loading && !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-gray-700 text-lg">Resep tidak ditemukan</div>
        <button
          onClick={() => router.push("/")}
          className="bg-[color:var(--custom-orange)] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Render konten dengan data resep dan komentar
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8 pt-[136px]">
        <div className="flex-1 min-w-0">
          <DetailHeader recipe={recipe!} loading={loading} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <IngredientsSection recipe={recipe!} loading={loading} />
            <InstructionsSection recipe={recipe!} loading={loading} />
          </div>
          <CommentsSection comments={comments} loading={loading} />
        </div>
        <div className="w-full md:w-80 flex-shrink-0">
          <RecipeSidebar recipes={recipes} loading={loading} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
