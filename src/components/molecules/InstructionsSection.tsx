import React, { Suspense } from "react";
import { RecipeDetail } from "@/types/recipe-detail";

interface InstructionsSectionProps {
  recipe: RecipeDetail;
  loading: boolean;
}

const InstructionsSection = ({ recipe, loading }: InstructionsSectionProps) => {
  return (
    <Suspense fallback={null}>
      <div className="min-h-auto w-full animate-pulse">
        <div className="rounded-2xl p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <ol className="space-y-4 mb-6">
            {[...Array(3)].map((_, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="w-7 h-7 bg-gray-200 rounded-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </li>
            ))}
          </ol>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="h-5 bg-gray-200 rounded w-1/5 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default InstructionsSection;
