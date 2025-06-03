"use client";

import React, { useState, useEffect } from "react";
import { RecipeTable } from "../molecules/RecipeTable";
import { DashboardCard } from "../molecules/DashboardCard";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Suspense } from "react";

interface Recipe {
  id: number;
  nama: string;
  photoResep: string;
  user: {
    name: string;
    photo: string;
  };
  image: string;
  date: string;
  kategori: {
    id: number;
    nama: string;
  };
  isApproved: "APPROVED";
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
    const fetchRecipes = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch("http://localhost:4000/v1/admin/dashboard/recipes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setRecipes(data.data.reseps);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  const handleShow = (id: number) => {
    router.push(`/dashboard/recipes/show?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:4000/v1/admin/dashboard/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Filter and sort recipes
  const filteredAndSortedRecipes = React.useMemo(() => {
    let result = [...recipes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((recipe) => recipe.nama.toLowerCase().includes(query) || recipe.kategori.nama.toLowerCase().includes(query) || recipe.user.name.toLowerCase().includes(query));
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
        result.sort((a, b) => a.nama.localeCompare(b.nama));
        break;
      case "title-desc":
        result.sort((a, b) => b.nama.localeCompare(a.nama));
        break;
      case "category":
        result.sort((a, b) => a.kategori.nama.localeCompare(b.kategori.nama));
        break;
      default:
        break;
    }

    return result;
  }, [recipes, searchQuery, sortBy]);

  return (
    <Suspense>
      <DashboardCard>{loading ? <div className="text-center py-4">Loading...</div> : <RecipeTable recipes={filteredAndSortedRecipes} onShow={handleShow} onDelete={handleDelete} />}</DashboardCard>;
    </Suspense>
  );
};
