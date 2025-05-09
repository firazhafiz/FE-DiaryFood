"use client";

import { RecipeManagement } from "@/components/organisms/RecipeManagement";

export default function RecipesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Recipes Management</h1>
      </div>
      <RecipeManagement />
    </div>
  );
}
