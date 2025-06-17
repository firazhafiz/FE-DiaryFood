"use client";

import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import CommentsSection from "@/components/molecules/CommentsSection";
import RecipeSidebar from "@/components/molecules/RecipeSidebar";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { RecipeDetail, Comment } from "@/types/recipe-detail";
import { config } from "@/config";

export default function DetailResep() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeId = searchParams.get("recipeId");
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

        const recipeResponse = await fetch(`${config.apiUrl}/resep/${parsedRecipeId}`);
        if (!recipeResponse.ok) {
          throw new Error("Resep tidak ditemukan di server");
        }
        const recipeData = await recipeResponse.json();
        const mappedRecipe: RecipeDetail = {
          id: recipeData.data.id,
          nama: recipeData.data.nama,
          photoResep: recipeData.data.photoResep,
          kategoriId: recipeData.data.kategoriId,
          tanggalUnggah: recipeData.data.createdAt,
          user: {
            name: recipeData.data.user?.name || "Anonymous",
            photo: recipeData.data.user?.photo || "",
          },
          bahanList: recipeData.data.bahanList || [],
          langkahList: recipeData.data.langkahList || [],
          description: recipeData.data.description || "",
          cookingTime: recipeData.data.cookingTime || "0 min",
          preparationTime: recipeData.data.preparationTime || "0 min",
          servingTime: recipeData.data.servingTime || "0",
          note: recipeData.data.note || "",
          totalComments: recipeData.data.totalComments || 0,
          savesCount: recipeData.data.savesCount || 0,
          totalReviews: recipeData.data.totalReviews || 0,
          averageRating: recipeData.data.averageRating || 0,
          isSavedByCurrentUser: recipeData.data.isSavedByCurrentUser || false,
          kategori: recipeData.data.kategori ? { nama: recipeData.data.kategori.nama } : undefined,
          comment: recipeData.data.comments
            ? recipeData.data.comments.map((c: any) => ({
                id: c.id.toString(),
                content: c.comment,
                rating: c.rating,
                createdAt: c.createdAt,
                resepId: c.resepId,
                user: {
                  id: c.user.id,
                  name: c.user.name || "Anonymous",
                  photo: c.user.photo || "",
                },
              }))
            : [],
        };
        setRecipe(mappedRecipe);

        const recipesResponse = await fetch(`${config.apiUrl}/resep`);
        if (!recipesResponse.ok) {
          throw new Error("Failed to fetch related recipes");
        }
        const recipesData = await recipesResponse.json();
        if (Array.isArray(recipesData.data.reseps)) {
          const filteredRecipes = recipesData.data.reseps.filter((r: Recipe) => r.id !== parsedRecipeId).slice(0, 2);
          setRecipes(filteredRecipes);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Gagal mengambil detail resep");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  const handleCommentAdded = (newComment: Comment, newTotal: number) => {
    setRecipe((prev) => {
      if (!prev) return prev;
      const prevComments = Array.isArray(prev.comment) ? prev.comment : [];
      return {
        ...prev,
        comment: [newComment, ...prevComments] as Comment[], // Explicit type assertion
        totalComments: newTotal,
      };
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-red-500 text-lg">{error}</div>
        <button onClick={() => router.push("/")} className="bg-[color:var(--custom-orange)] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  if (!loading && !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-gray-700 text-lg">Resep tidak ditemukan</div>
        <button onClick={() => router.push("/")} className="bg-[color:var(--custom-orange)] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8 pt-[136px]">
          <div className="flex-1 min-w-0">
            <DetailHeader recipe={recipe!} loading={loading} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <IngredientsSection recipe={recipe!} loading={loading} />
              <InstructionsSection recipe={recipe!} loading={loading} />
            </div>
            <CommentsSection recipeId={recipeId || ""} onCommentAdded={handleCommentAdded} />
          </div>
          <div className="w-full md:w-80 flex-shrink-0">
            <RecipeSidebar recipes={recipes} loading={loading} />
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
