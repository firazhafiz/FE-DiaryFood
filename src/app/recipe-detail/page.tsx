import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import CommentsSection from "@/components/molecules/CommentsSection";
import RecipeSidebar from "@/components/molecules/RecipeSidebar";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { Suspense } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeDetail, Comment } from "@/types/recipe-detail";
import { config } from "@/config";
import Link from "next/link";

// Client Component wrapper for CommentsSection
function CommentsWrapper({
  recipeId,
  initialComments,
  totalComments,
}: {
  recipeId: string;
  initialComments: Comment[];
  totalComments: number;
}) {
  "use client";

  return (
    <CommentsSection
      recipeId={recipeId}
      initialComments={initialComments}
      totalComments={totalComments}
    />
  );
}

async function getRecipeData(recipeId: string): Promise<{
  recipe: RecipeDetail | null;
  recipes: Recipe[];
  error: string | null;
}> {
  if (!recipeId) {
    return {
      recipe: null,
      recipes: [],
      error: "ID resep tidak ditemukan. Kembali ke halaman utama?",
    };
  }

  try {
    const parsedRecipeId = parseInt(recipeId);
    if (isNaN(parsedRecipeId)) {
      return {
        recipe: null,
        recipes: [],
        error: "ID resep tidak valid",
      };
    }

    // Fetch detail resep
    const recipeResponse = await fetch(
      `${config.apiUrl}/resep/${parsedRecipeId}`,
      {
        cache: "no-store", // Disable caching for dynamic SSR
      }
    );
    if (!recipeResponse.ok) {
      return {
        recipe: null,
        recipes: [],
        error: "Resep tidak ditemukan di server",
      };
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
      kategori: recipeData.data.kategori
        ? { nama: recipeData.data.kategori.nama }
        : undefined,
      comment: recipeData.data.comments
        ? recipeData.data.comments.map(
            (c: {
              id: number;
              content: string;
              rating: number;
              createdAt: Date;
              resepId: number;
              user: {
                id: number;
                name: string;
                photo: string;
              };
            }): Comment => ({
              id: c.id.toString(),
              content: c.content,
              rating: c.rating,
              createdAt: c.createdAt,
              resepId: c.resepId,
              user: {
                id: c.user.id,
                name: c.user.name || "Anonymous",
                photo: c.user.photo || "",
              },
            })
          )
        : [],
    };

    console.log(recipeData.langkahList);

    // Fetch resep terkait
    const recipesResponse = await fetch(`${config.apiUrl}/resep`, {
      cache: "no-store",
    });
    let relatedRecipes: Recipe[] = [];
    if (recipesResponse.ok) {
      const recipesData = await recipesResponse.json();
      if (Array.isArray(recipesData.data.reseps)) {
        relatedRecipes = recipesData.data.reseps
          .filter((r: Recipe) => r.id !== parsedRecipeId)
          .slice(0, 2);
      }
    }

    return {
      recipe: mappedRecipe,
      recipes: relatedRecipes,
      error: null,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      recipe: null,
      recipes: [],
      error:
        err instanceof Error ? err.message : "Gagal mengambil detail resep",
    };
  }
}

export default async function DetailResep({
  searchParams,
}: {
  searchParams: Promise<{ recipeId?: string }>;
}) {
  const params = await searchParams;
  const recipeId = params.recipeId;
  const { recipe, recipes, error } = await getRecipeData(recipeId || "");

  if (error || !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div
          className={error ? "text-red-500 text-lg" : "text-gray-700 text-lg"}
        >
          {error || "Resep tidak ditemukan"}
        </div>
        <Link
          href="/"
          className="bg-[color:var(--custom-orange)] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8 pt-[136px]">
          <div className="flex-1 min-w-0">
            <DetailHeader recipe={recipe} loading={false} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <IngredientsSection recipe={recipe} loading={false} />
              <InstructionsSection recipe={recipe} loading={false} />
            </div>
            <CommentsWrapper
              recipeId={recipe.id.toString()}
              initialComments={recipe.comment || []}
              totalComments={recipe.totalComments}
            />
          </div>
          <div className="w-full md:w-80 flex-shrink-0">
            <RecipeSidebar recipes={recipes} loading={false} />
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
