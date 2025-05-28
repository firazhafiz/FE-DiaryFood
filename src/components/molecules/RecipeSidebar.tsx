import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface RecipeSidebarProps {
  recipes: Recipe[];
  loading: boolean;
}

const extractNumber = (timeString: string | undefined): number => {
  if (!timeString) return 0;
  const match = timeString.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

function formatTime(time: string | number) {
  let t = String(time)
    .replace(/\s*mins?/i, "")
    .trim();
  return `${t} Min`;
}

const RecipeSidebar = ({ recipes, loading }: RecipeSidebarProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 md:sticky md:top-36 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="space-y-4">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg" />
              <div className="flex-grow">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-1" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-gradient-to-t from-orange-50 via-white to-rose-50 rounded-lg">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-3" />
          <div className="h-8 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:sticky md:top-36">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Recommended Recipes
      </h2>
      <div className="space-y-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            const prepTime = extractNumber(recipe.preparationTime);
            const cookTime = extractNumber(recipe.cookingTime);
            const serveTime = extractNumber(recipe.servingTime);
            const totalTime = prepTime + cookTime + serveTime;

            return (
              <Link
                key={recipe.id}
                href={`/recipe-detail?recipeId=${recipe.id}`}
                className="flex gap-3 items-center group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={recipe.photoResep || "/default-recipe.jpg"}
                    alt={recipe.nama}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-gray-800 font-semibold group-hover:text-[color:var(--custom-orange)] transition-colors">
                    {recipe.nama}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="inline-flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-[color:var(--custom-orange)]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1v5.25l4.5 2.67-.75 1.23L11 13V7z" />
                      </svg>
                      {formatTime(totalTime)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500">No recommendations available.</p>
        )}
      </div>
      <div className="mt-8 p-4 bg-gradient-to-t from-orange-50 via-white to-rose-50 rounded-lg">
        <h3 className="text-md font-semibold text-gray-900 mb-2">
          Need More Recipe Ideas?
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Discover our new collection of seasonal recipes for every occasion.
        </p>
        <button className="w-full py-2 bg-[color:var(--custom-orange)] text-white text-sm font-medium rounded-sm hover:bg-orange-600 transition-colors">
          <Link href="/recipes">Browse All Recipes</Link>
        </button>
      </div>
    </div>
  );
};

export default RecipeSidebar;
