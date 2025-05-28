import React from "react";
import Card from "../atoms/Card";
import { Recipe } from "@/types/recipe";

interface RecipeCardGridProps {
  recipes: Recipe[];
}

const RecipeCardGrid: React.FC<RecipeCardGridProps> = ({ recipes }) => {
  if (!Array.isArray(recipes)) {
    return (
      <div className="text-center py-8 text-gray-600">
        Invalid recipe data format
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
