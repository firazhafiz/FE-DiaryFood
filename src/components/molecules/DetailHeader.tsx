"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RecipeDetail } from "@/types/recipe-detail";
import Image from "next/image";

interface DetailHeaderProps {
  recipe: RecipeDetail;
  loading: boolean;
}

const extractNumber = (timeString: string | undefined): string => {
  if (!timeString) return "0";
  const match = timeString.match(/\d+/);
  return match ? match[0] : "0";
};

const DetailHeader = ({ recipe, loading }: DetailHeaderProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(recipe?.isSavedByCurrentUser || false);
  const [totalSaved, setTotalSaved] = useState<number>(recipe?.savesCount || 0); // Initialize with savesCount

  useEffect(() => {
    // Update state when recipe prop changes
    setIsSaved(recipe?.isSavedByCurrentUser || false);
    setTotalSaved(recipe?.savesCount || 0);
  }, [recipe]);

  const handleSaveToggle = async () => {
    try {
      // Optimistic update
      setIsSaved(true);
      setTotalSaved((prev) => prev + 1);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`http://localhost:4000/v1/resep/${recipe.id}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Update with backend response if it includes savesCount
      if (data.data && typeof data.data.savesCount === "number") {
        setTotalSaved(data.data.savesCount);
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
      // Revert optimistic update
      setIsSaved(false);
      setTotalSaved((prev) => prev - 1);
    }
  };

  const handleUnsaved = async () => {
    try {
      // Optimistic update
      setIsSaved(false);
      setTotalSaved((prev) => prev - 1);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`http://localhost:4000/v1/resep/${recipe.id}/unsave`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Update with backend response if it includes savesCount
      if (data.data && typeof data.data.savesCount === "number") {
        setTotalSaved(data.data.savesCount);
      }
    } catch (err) {
      console.error("Error unsaving recipe:", err);
      // Revert optimistic update
      setIsSaved(true);
      setTotalSaved((prev) => prev + 1);
    }
  };

  if (loading || !recipe) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-72 bg-gray-200 rounded-2xl mb-4" />
        <div className="flex gap-8">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
      </div>
    );
  }

  const author = {
    name: recipe.user?.name || "Pengguna Tidak Diketahui",
    avatar: recipe.user?.photo || "/assets/images/image_login.jpg",
  };

  const prepTime = extractNumber(recipe.preparationTime);
  const cookTime = extractNumber(recipe.cookingTime);
  const serving = extractNumber(recipe.servingTime);

  return (
    <div className="mb-8">
      <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
        <Link href="/" className="hover:text-[color:var(--custom-orange)] transition-colors">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/recipes" className="hover:text-[color:var(--custom-orange)] transition-colors">
          Recipes
        </Link>
        <span className="mx-1">/</span>
        <span className="text-[color:var(--custom-orange)] font-semibold">{recipe.nama}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">{recipe.nama}</h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src={author.avatar} alt="Author" className="w-6 h-6 rounded-full object-cover" width={24} height={24} />
            <span className="font-medium text-gray-700">{author.name}</span>
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            {new Date(recipe.tanggalUnggahan).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span>{recipe.totalComments}</span> comments
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span>{totalSaved}</span> Saved
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            {recipe.rating ? (
              <>
                <span className="text-yellow-400">★</span>
                {recipe.rating.toFixed(1)} ({recipe.reviewers} reviews)
              </>
            ) : (
              <>
                <span className="text-gray-400">★</span>
                0.0 (0 reviews)
              </>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={isSaved ? handleUnsaved : handleSaveToggle}
            className={`flex items-center gap-1 px-3 py-1 rounded-sm border text-xs transition-colors ${
              isSaved ? "bg-white text-gray-700 border-[color:var(--custom-orange)]" : "bg-[color:var(--custom-orange)] text-white border-gray-200 hover:bg-orange-600"
            }`}>
            {isSaved ? "Unsave" : "Save"}
          </button>
          <button className="flex items-center bg-[color:var(--custom-orange)] text-white cursor-pointer gap-1 px-3 py-1 rounded-sm border text-xs border-gray-200 hover:bg-orange-600 transition-colors">Share</button>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden mb-4 w-full max-w-2xl">
        <img src={recipe.photoResep} alt={recipe.nama} className="w-full h-72 object-cover" />
      </div>
      <div className="flex gap-8 mb-4 text-center">
        <div>
          <div className="font-bold text-gray-800 text-lg">{prepTime} Min</div>
          <div className="text-xs text-gray-500">Prep Time</div>
        </div>
        <div>
          <div className="font-bold text-gray-800 text-lg">{cookTime} Min</div>
          <div className="text-xs text-gray-500">Cooking Time</div>
        </div>
        <div>
          <div className="font-bold text-gray-800 text-lg">{serving} Min</div>
          <div className="text-xs text-gray-500">Serving Time</div>
        </div>
      </div>
      <div className="text-gray-700 text-sm max-w-2xl mb-2">{recipe.description}</div>
    </div>
  );
};

export default DetailHeader;
