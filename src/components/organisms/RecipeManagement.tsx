"use client";

import React, { useState, useEffect } from "react";
import { RecipeTable } from "../molecules/RecipeTable";
import { DashboardCard } from "../molecules/DashboardCard";
import { useRouter } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  date: string;
  category: string;
  status: "published" | "draft";
}

interface RecipeManagementProps {
  searchQuery?: string;
  sortBy?: string;
}

export const RecipeManagement: React.FC<RecipeManagementProps> = ({ searchQuery = "", sortBy = "newest" }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/recipes");
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = (id: number) => {
    router.push(`/dashboard/recipes/show?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setRecipes(recipes.filter((recipe) => recipe.id !== id));
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  // Filter and sort recipes
  const filteredAndSortedRecipes = React.useMemo(() => {
    let result = [...recipes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((recipe) => recipe.title.toLowerCase().includes(query) || recipe.category.toLowerCase().includes(query) || recipe.author.name.toLowerCase().includes(query));
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return result;
  }, [recipes, searchQuery, sortBy]);

  return <DashboardCard>{loading ? <div className="text-center py-4">Loading...</div> : <RecipeTable recipes={filteredAndSortedRecipes} onShow={handleShow} onDelete={handleDelete} />}</DashboardCard>;
};
