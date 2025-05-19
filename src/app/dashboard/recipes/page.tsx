"use client";

import { RecipeManagement } from "@/components/organisms/RecipeManagement";

export default function RecipesPage() {
  return (
    <div className=" p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Recipes Management</h1>
      </div>
      <RecipeManagement />
    </div>
  );
}
