"use client";

import { RecipeDetail } from "@/types/recipe-detail";
import React, { Suspense, useState } from "react";

interface IngredientsSectionProps {
  recipe: RecipeDetail;
  loading: boolean;
}

const IngredientsSection = ({ recipe, loading }: IngredientsSectionProps) => {
  // State untuk melacak status checked setiap bahan
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    Array(recipe.bahanList?.length || 0).fill(false)
  );

  // Handler untuk mengubah status checked
  const handleCheckboxChange = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.map((checked, i) => (i === index ? !checked : checked))
    );
  };

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
    <Suspense fallback={null}>
      <div className="min-h- w-full">
        <div className="rounded-2xl pt-0 pb-6 pr-3 pl-0">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {Array.isArray(recipe.bahanList) && recipe.bahanList.length > 0 ? (
              recipe.bahanList.map((ingredient, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={checkedIngredients[idx]}
                        onChange={() => handleCheckboxChange(idx)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border border-slate-700/75 rounded-md peer-checked:border-[color:var(--custom-orange)] peer-checked:bg-[color:var(--custom-orange)] transition-colors relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs peer-checked:opacity-100 opacity-0 transition-opacity">
                          ✓
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-gray-700 text-sm ${
                        checkedIngredients[idx]
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
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
    </Suspense>
  );
};

export default IngredientsSection;
