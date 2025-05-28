"use client";

import React, { useState } from "react";
import { DashboardCard } from "../molecules/DashboardCard";
import { useRouter } from "next/navigation";
import { ProfileRecipeTable } from "../molecules/ProfileRecipeTable";
import useSWR from "swr";
import RecipeTableSkeleton from "@/components/skeletons/RecipeTableSkeleton";

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
  isApproved: string;
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch recipes");
  }

  const data = await response.json();
  // Transform data to match Recipe interface
  return data.data.map((recipe: Recipe) => ({
    ...recipe,
    id: Number(recipe.id),
    date: recipe.date, // Map createdAt to date
  }));
};

export const ProfileRecipeManagement: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  // Use SWR to fetch recipes
  const { data, error, isLoading } = useSWR("http://localhost:4000/v1/profile/recipes", fetcher, {
    onError: (error) => {
      if (error.message === "No token found" || error.message.includes("401")) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    },
    revalidateOnFocus: false,
  });

  // Update recipes state when data is fetched
  React.useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleShow = (id: number) => {
    router.push(`/profile/my-recipe/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`http://localhost:4000/v1/profile/recipe/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
        // Optionally trigger revalidation
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <RecipeTableSkeleton />;
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <DashboardCard>
        <div className="text-center py-4 text-red-500">Error loading recipes: {error.message}</div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <ProfileRecipeTable recipes={recipes} onShow={handleShow} onDelete={handleDelete} />
    </DashboardCard>
  );
};

export default ProfileRecipeManagement;
