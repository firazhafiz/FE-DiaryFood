import { RecipeDetail } from "@/types/recipe-detail";
import React from "react";

interface IngredientsSectionProps {
  recipe: RecipeDetail;
  loading: boolean;
}

const IngredientsSection = ({ recipe, loading }: IngredientsSectionProps) => {
  if (loading) {
    return (
      <div className="min-h-auto w-full animate-pulse">
        <div className="rounded-2xl p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <ul className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded-md" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-auto w-full">
      <div className="rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
        <ul className="space-y-3">
          {Array.isArray(recipe.bahanList) && recipe.bahanList.length > 0 ? (
            recipe.bahanList.map((ingredient, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={false}
                      readOnly
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-1 border-slate-700/75 rounded-md peer-checked:border-[color:var(--custom-orange)] peer-checked:bg-[color:var(--custom-orange)] transition-colors"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    {ingredient.nama} - {ingredient.jumlah}
                  </span>
                </label>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-sm">No ingredients found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsSection;
