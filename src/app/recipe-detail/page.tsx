import { Suspense } from "react";
import Link from "next/link";
import { config } from "@/config";
import { Recipe } from "@/types/recipe";
import { RecipeDetail, Comment } from "@/types/recipe-detail";
import dynamic from "next/dynamic";
import CommentsSection from "@/components/molecules/CommentsSection";

// Impor dinamis untuk komponen berat dengan skeleton UI
const DetailHeader = dynamic(
  () => import("@/components/molecules/DetailHeader"),
  {
    loading: () => <div className="h-32 bg-gray-200 animate-pulse rounded" />,
  }
);
const IngredientsSection = dynamic(
  () => import("@/components/molecules/IngredientsSection"),
  {
    loading: () => <div className="h-48 bg-gray-200 animate-pulse rounded" />,
  }
);
const InstructionsSection = dynamic(
  () => import("@/components/molecules/InstructionsSection"),
  {
    loading: () => <div className="h-48 bg-gray-200 animate-pulse rounded" />,
  }
);
const RecipeSidebar = dynamic(
  () => import("@/components/molecules/RecipeSidebar"),
  {
    loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded" />,
  }
);
const Footer = dynamic(() => import("@/components/organisms/Footer"), {
  loading: () => <div className="h-16 bg-gray-200 animate-pulse rounded" />,
});
const Navbar = dynamic(() => import("@/components/organisms/Navbar"), {
  loading: () => <div className="h-16 bg-gray-200 animate-pulse rounded" />,
});

// Komponen klien untuk CommentsSection
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
    <Suspense
      fallback={<div className="h-32 bg-gray-200 animate-pulse rounded" />}
    >
      <CommentsSection
        recipeId={recipeId}
        initialComments={initialComments}
        totalComments={totalComments}
      />
    </Suspense>
  );
}

// Fungsi untuk mengambil data resep
async function getRecipeData(recipeId: string): Promise<{
  recipe: RecipeDetail | null;
  recipes: Recipe[];
  error: string | null;
}> {
  if (!recipeId || isNaN(parseInt(recipeId))) {
    return {
      recipe: null,
      recipes: [],
      error: "ID resep tidak valid. Kembali ke halaman utama?",
    };
  }

  try {
    // Fetch resep utama
    const recipeResponse = await fetch(`${config.apiUrl}/resep/${recipeId}`, {
      cache: "force-cache",
      next: { revalidate: 86400, tags: [`recipe-${recipeId}`] }, // Cache 1 hari
    });

    if (!recipeResponse.ok) {
      return {
        recipe: null,
        recipes: [],
        error: "Resep tidak ditemukan",
      };
    }

    const recipeData = await recipeResponse.json();
    const mappedRecipe: RecipeDetail = {
      id: recipeData.data.id,
      nama: recipeData.data.nama,
      photoResep: recipeData.data.photoResep || null,
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
              user: { id: number; name: string; photo: string };
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

    // Validasi kategoriId
    if (!mappedRecipe.kategoriId) {
      console.warn(`Kategori ID tidak tersedia untuk resep ${recipeId}`);
      // Fallback: ambil semua resep
      const fallbackResponse = await fetch(`${config.apiUrl}/resep?limit=2`, {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["all-recipes"] },
      });
      const fallbackData = fallbackResponse.ok
        ? await fallbackResponse.json()
        : { reseps: [] };
      let fallbackRecipes = Array.isArray(fallbackData.reseps)
        ? fallbackData.reseps
        : Array.isArray(fallbackData.data)
        ? fallbackData.data
        : Array.isArray(fallbackData.results)
        ? fallbackData.results
        : Array.isArray(fallbackData.recipes)
        ? fallbackData.recipes
        : [];
      console.log("Fallback all recipes:", fallbackRecipes);
      // Filter untuk mengecualikan resep saat ini
      const filteredRecipes = Array.isArray(fallbackRecipes)
        ? fallbackRecipes.filter((r: Recipe) => r.id !== parseInt(recipeId))
        : [];
      return {
        recipe: mappedRecipe,
        recipes: filteredRecipes,
        error: null,
      };
    }

    // Coba parameter alternatif untuk /resep/related
    let relatedRecipesData;
    let relatedRecipesResponse = await fetch(
      `${config.apiUrl}/resep/related?kategoriId=${mappedRecipe.kategoriId}&limit=2`,
      {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["related-recipes"] },
      }
    );

    if (relatedRecipesResponse.ok) {
      relatedRecipesData = await relatedRecipesResponse.json();
      console.log("Related recipes response (kategoriId):", relatedRecipesData);
    } else {
      console.warn(
        "Gagal mengambil resep terkait dengan kategoriId:",
        relatedRecipesResponse.status
      );
      // Coba parameter alternatif: categoryId, category_id, catId
      const paramAttempts = [
        `categoryId=${mappedRecipe.kategoriId}`,
        `category_id=${mappedRecipe.kategoriId}`,
        `catId=${mappedRecipe.kategoriId}`,
      ];
      for (const param of paramAttempts) {
        relatedRecipesResponse = await fetch(
          `${config.apiUrl}/resep/related?${param}&limit=2`,
          {
            cache: "force-cache",
            next: { revalidate: 3600, tags: ["related-recipes"] },
          }
        );
        if (relatedRecipesResponse.ok) {
          relatedRecipesData = await relatedRecipesResponse.json();
          console.log(
            `Related recipes response (${param}):`,
            relatedRecipesData
          );
          break;
        }
        console.warn(
          `Gagal mengambil resep terkait dengan ${param}:`,
          relatedRecipesResponse.status
        );
      }
      if (!relatedRecipesData) {
        relatedRecipesData = { reseps: [] };
      }
    }

    // Tangani berbagai struktur respons API
    let relatedRecipes = Array.isArray(relatedRecipesData.reseps)
      ? relatedRecipesData.reseps
      : Array.isArray(relatedRecipesData.data)
      ? relatedRecipesData.data
      : Array.isArray(relatedRecipesData.results)
      ? relatedRecipesData.results
      : Array.isArray(relatedRecipesData.recipes)
      ? relatedRecipesData.recipes
      : Array.isArray(relatedRecipesData.related)
      ? relatedRecipesData.related
      : [];

    // Fallback ke semua resep jika kosong
    if (!relatedRecipes.length) {
      console.warn(
        `Tidak ada resep terkait untuk kategoriId ${mappedRecipe.kategoriId}`
      );
      const fallbackResponse = await fetch(`${config.apiUrl}/resep?limit=2`, {
        cache: "force-cache",
        next: { revalidate: 3600, tags: ["all-recipes"] },
      });
      const fallbackData = fallbackResponse.ok
        ? await fallbackResponse.json()
        : { reseps: [] };
      relatedRecipes = Array.isArray(fallbackData.reseps)
        ? fallbackData.reseps
        : Array.isArray(fallbackData.data)
        ? fallbackData.data
        : Array.isArray(fallbackData.results)
        ? fallbackData.results
        : Array.isArray(fallbackData.recipes)
        ? fallbackData.recipes
        : [];
      console.log("Fallback all recipes:", relatedRecipes);
    }

    // Filter untuk mengecualikan resep saat ini
    const filteredRecipes = Array.isArray(relatedRecipes)
      ? relatedRecipes.filter((r: Recipe) => r.id !== parseInt(recipeId))
      : [];

    return {
      recipe: mappedRecipe,
      recipes: filteredRecipes,
      error: null,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      recipe: null,
      recipes: [],
      error: "Gagal mengambil detail resep",
    };
  }
}

export default async function DetailResep({
  searchParams,
}: {
  searchParams: Promise<{ recipeId?: string }>;
}) {
  const params = await searchParams;
  const recipeId = params.recipeId || "";
  const { recipe, recipes, error } = await getRecipeData(recipeId);

  if (error || !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div className="text-red-500 text-lg">
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

  // Debug log untuk memastikan recipes diterima
  console.log("Recipes passed to RecipeSidebar:", recipes);

  return (
    <div className="bg-gray-100">
      <Suspense
        fallback={<div className="h-16 bg-gray-200 animate-pulse rounded" />}
      >
        <Navbar />
      </Suspense>
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8 pt-[136px]">
        <div className="flex-1 min-w-0">
          <Suspense
            fallback={
              <div className="h-32 bg-gray-200 animate-pulse rounded" />
            }
          >
            <DetailHeader recipe={recipe} loading={false} />
          </Suspense>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Suspense
              fallback={
                <div className="h-48 bg-gray-200 animate-pulse rounded" />
              }
            >
              <IngredientsSection recipe={recipe} loading={false} />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-48 bg-gray-200 animate-pulse rounded" />
              }
            >
              <InstructionsSection recipe={recipe} loading={false} />
            </Suspense>
          </div>
          <CommentsWrapper
            recipeId={recipe.id.toString()}
            initialComments={recipe.comment || []}
            totalComments={recipe.totalComments}
          />
        </div>
        <div className="w-full md:w-80 flex-shrink-0">
          <Suspense
            fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded" />
            }
          >
            <RecipeSidebar recipes={recipes} loading={false} />
          </Suspense>
        </div>
      </div>
      <Suspense
        fallback={<div className="h-16 bg-gray-200 animate-pulse rounded" />}
      >
        <Footer />
      </Suspense>
    </div>
  );
}
