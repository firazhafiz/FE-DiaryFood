"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaStar, FaBookmark } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import Cookies from "js-cookie";
import { RecipeDetail } from "@/types/recipe-detail";
import { Suspense } from "react";
import { config } from "@/config";

const extractNumber = (timeString: string | undefined): string => {
  if (!timeString) return "0";
  const match = timeString.match(/\d+/);
  return match ? match[0] : "0";
};

const formatTime = (time: string | number): string => {
  let t = String(time)
    .replace(/\s*mins?\s*$/i, "")
    .trim();
  return `${t} Min`;
};

const SavedPage = () => {
  const [recipes, setRecipes] = useState<RecipeDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const fetchSavedRecipes = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token.");
      }
      const response = await fetch(`${config.apiUrl}/resep/saved`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const mappedRecipes: RecipeDetail[] = data.data.map((saved: any) => {
        const resep = saved.resep;
        return {
          id: resep.id,
          nama: resep.nama,
          photoResep: resep.photoResep,
          kategoriId: resep.kategoriId,
          tanggalUnggah: resep.createdAt,
          user: { name: resep.user.name, photo: resep.user.photo },
          bahanList: resep.bahanList,
          langkahList: resep.langkahList,
          description: resep.description,
          cookingTime: resep.cookingTime || "0 min",
          preparationTime: resep.preparationTime || "0 min",
          servingTime: resep.servingTime || "0",
          note: resep.note || "",
          totalComments: 0,
          savesCount: 0,
          totalReviews: 0,
          averageRating: 0,
          isSavedByCurrentUser: true,
          kategori: resep.kategori ? { nama: resep.kategori.nama } : undefined,
        };
      });
      setRecipes(mappedRecipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
    const handleRecipeUnsaved = (event: CustomEvent) => {
      const { recipeId } = event.detail;
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    };
    const handleRecipeSaved = () => {
      fetchSavedRecipes();
    };
    window.addEventListener("recipeUnsaved", handleRecipeUnsaved as any);
    window.addEventListener("recipeSaved", handleRecipeSaved as any);
    return () => {
      window.removeEventListener("recipeUnsaved", handleRecipeUnsaved as any);
      window.removeEventListener("recipeSaved", handleRecipeSaved as any);
    };
  }, []);

  const handleRemoveSave = (recipeId: number) => {
    setSelectedRecipeId(recipeId);
    setShowConfirmModal(true);
  };

  const confirmRemove = async () => {
    if (!selectedRecipeId) return;
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token.");
      }
      const response = await fetch(`${config.apiUrl}/resep/${selectedRecipeId}/unsave`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== selectedRecipeId));
      setShowConfirmModal(false);
      setSelectedRecipeId(null);
      window.dispatchEvent(
        new CustomEvent("recipeUnsaved", {
          detail: { recipeId: selectedRecipeId },
        })
      );
    } catch (error) {
      setShowConfirmModal(false);
      setSelectedRecipeId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white/60 rounded-3xl shadow-sm border-2 border-white/60 p-4">
                <div className="flex gap-4">
                  <div className="w-48 h-32 bg-gray-200 rounded-2xl" />
                  <div className="flex-grow">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-16" />
                      <div className="h-4 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="p-4">
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-semibold text-slate-700">Saved Recipes</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="text-sm pl-4 pr-10 py-2 border-white text-slate-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] placeholder:text-slate-500 placeholder:text-sm"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <GoSearch />
            </span>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          {recipes.length === 0 ? (
            <p className="text-slate-600 text-center">No saved recipes found.</p>
          ) : (
            recipes.map((recipe) => {
              const prepTime = extractNumber(recipe.preparationTime);
              const cookTime = extractNumber(recipe.cookingTime);
              const servingTime = extractNumber(recipe.servingTime);
              const totalTime = Number(prepTime) + Number(cookTime) + Number(servingTime);
              return (
                <div key={recipe.id} className="bg-white/60 rounded-3xl shadow-sm border-2 border-white/60 p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="relative w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image src={recipe.photoResep} alt={recipe.nama} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">{recipe.nama}</h3>
                          <p className="text-sm text-gray-600 mb-2">{recipe.kategori?.nama || "Unknown Category"}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <FaStar className="w-4 h-4" />
                            <span className="text-sm font-medium">{recipe.averageRating || 0}</span>
                          </div>
                          <button onClick={() => handleRemoveSave(recipe.id)} className="text-[#FF7a5C] hover:text-[#ff6b4a] transition-colors cursor-pointer">
                            <FaBookmark className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FaClock className="w-4 h-4" />
                          <span>{formatTime(totalTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Image src={recipe.user?.photo || "/assets/images/image_login.jpg"} alt={recipe.user?.name || "Unknown User"} width={20} height={20} className="rounded-full" />
                          <span>{recipe.user?.name || "Unknown User"}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href={`/detail_resep?recipe=${recipe.id}`} className="text-[#FF7A5C] hover:text-[#ff6b4a] font-medium text-sm">
                          View Recipe →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Remove from Saved</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to remove this recipe from your saved list?</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  Cancel
                </button>
                <button onClick={confirmRemove} className="px-4 py-2 text-sm font-medium text-white bg-[#FF7A5C] hover:bg-[#ff6b4a] rounded-lg">
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default SavedPage;
