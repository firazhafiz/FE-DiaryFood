"use client";

import { ProfileRecipeManagement } from "@/components/organisms/ProfileRecipeManagement";

const MyRecipePage = () => {
  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Recipes</h1>
      </div>
      <ProfileRecipeManagement />
    </div>
  );
};

export default MyRecipePage;
