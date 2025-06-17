"use client";

import React, { Suspense } from "react";
import { toast } from "react-toastify"; // For error/success notifications
import Cookies from "js-cookie";
import { config } from "@/config";

interface Category {
  id: number;
  nama: string;
  description: string;
  totalRecipes: number;
  createdAt: string;
}

interface CategoryManagementProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>; // Added setCategories prop
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, setCategories }) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/admin/dashboard/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete category: ${response.status}`);
      }

      // Optimistic update: Remove category from state
      setCategories((prev) => prev.filter((category) => category.id !== id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete category.");
    }
  };

  return (
    <Suspense fallback={null}>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="grid grid-cols-4 gap-4 py-2 px-4 bg-slate-50 rounded-md">
          <p className="text-slate-700 font-medium text-sm">Name</p>
          <p className="text-slate-700 font-medium text-sm">Description</p>
          <p className="text-slate-700 font-medium text-sm">Total Recipes</p>
          <p className="text-slate-700 font-medium text-sm text-right">Actions</p>
        </div>
        <div className="divide-y divide-slate-100">
          {categories.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">No categories found.</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="grid grid-cols-4 gap-4 py-3 px-4 items-center hover:bg-slate-50">
                <p className="text-slate-700 font-medium text-sm">{category.nama}</p>
                <p className="text-slate-600 text-sm truncate">{category.description}</p>
                <p className="text-slate-600 text-sm">{category.totalRecipes}</p>
                <div className="flex justify-end">
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default CategoryManagement;
