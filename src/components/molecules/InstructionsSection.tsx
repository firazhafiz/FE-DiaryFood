"use client";

import React, { Suspense, useState } from "react";
import { RecipeDetail } from "@/types/recipe-detail";

interface InstructionsSectionProps {
  recipe: RecipeDetail;
  loading: boolean;
}

const InstructionsSection = ({ recipe, loading }: InstructionsSectionProps) => {
  // State untuk melacak status checked setiap langkah
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(
    Array(recipe.langkahList?.length || 0).fill(false)
  );

  // Handler untuk mengubah status checked
  const handleCheckboxChange = (index: number) => {
    setCheckedSteps((prev) =>
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
      <div className="min-h-auto w-full">
        <div className="rounded-2xl pt-0 pb-6 pr-3 pl-0">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
          <ul className="space-y-3">
            {Array.isArray(recipe.langkahList) &&
            recipe.langkahList.length > 0 ? (
              recipe.langkahList.map((step, idx) => (
                <li key={step.id} className="flex items-start">
                  <label className="flex items-start gap-3 w-full cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input
                        type="checkbox"
                        checked={checkedSteps[idx]}
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
                        checkedSteps[idx] ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {step.deskripsi}
                    </span>
                  </label>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm">No instructions found.</li>
            )}
          </ul>
        </div>
      </div>
    </Suspense>
  );
};

export default InstructionsSection;
