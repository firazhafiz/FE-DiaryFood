import React from "react";
import Card from "../atoms/Card";
import { Recipe } from "@/types/recipe";

interface RecipeCardGridProps {
  recipes: Recipe[];
  isLoading: boolean;
  initialRecipeCount?: number; // Optional prop to set initial skeleton count
}

const RecipeCardGrid: React.FC<RecipeCardGridProps> = ({
  recipes,
  isLoading,
  initialRecipeCount = 6, // Default fallback to 6
}) => {
  if (!Array.isArray(recipes)) {
    return (
      <div className="text-center py-8 text-gray-600">
        Invalid recipe data format
      </div>
    );
  }

  // Determine the number of skeleton cards based on the recipes array length
  const skeletonCount =
    isLoading && recipes.length === 0 ? initialRecipeCount : recipes.length;

  if (isLoading) {
    // Render skeleton cards based on the determined count
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(skeletonCount)].map((_, index) => (
          <div key={`skeleton-${index}`} className="w-full">
            <Card loading={true} />
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        Tidak ada resep tersedia
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => {
        if (!recipe || !recipe.id) {
          return null;
        }
        return (
          <div key={recipe.id} className="w-full">
            <Card recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCardGrid;
