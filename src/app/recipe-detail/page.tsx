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
import { RecipeDetail } from "@/types/recipe-detail";
import Loading from "@/app/loading";
import { Recipe } from "@/types/recipe";

export default function DetailResep() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeId = searchParams.get("recipeId"); // Ambil recipeId dari query parameter
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Pastikan render hanya terjadi di sisi klien
  useEffect(() => {
    const recipeById = async () => {
      const res = await fetch(`http://localhost:4000/v1/resep/1`);

  // Fetch data resep dan rekomendasi
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
        const parsedRecipeId = parseInt(recipeId); // Pastikan recipeId adalah integer
        if (isNaN(parsedRecipeId)) {
          throw new Error("ID resep tidak valid");
        }

        // Fetch detail resep
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

        // Fetch daftar semua resep
        const recipesResponse = await fetch("http://localhost:4000/v1/resep");
        if (!recipesResponse.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const recipesData = await recipesResponse.json();
        if (Array.isArray(recipesData.data.reseps)) {
          // Filter untuk mengecualikan resep yang sedang ditampilkan
          const filteredRecipes = recipesData.data.reseps.filter(
            (r: Recipe) => r.id !== parsedRecipeId
          );
          // Batasi menjadi 2 resep untuk rekomendasi
          setRecipes(filteredRecipes.slice(0, 2));
        } else {
          setRecipes([]);
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

  // Tampilkan loading state selama fetch atau saat belum mounted
  if (!mounted || loading) {
    return <Loading />;
  }

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

  // Tampilkan pesan jika resep tidak ditemukan dengan opsi kembali
  if (!recipe) {
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

  // Render konten dengan data resep
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8 pt-[136px]">
        <div className="flex-1 min-w-0">
          <DetailHeader recipe={recipe} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <IngredientsSection recipe={recipe} />
            <InstructionsSection recipe={recipe} />
          </div>
          <CommentsSection />
        </div>
        <div className="w-full md:w-80 flex-shrink-0">
          <RecipeSidebar recipes={recipes} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
