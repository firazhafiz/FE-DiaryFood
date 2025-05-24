"use client";

import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Recipe {
  id: number;
  nama: string;
  photoResep: string;
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  isApproved: string;
  image: string;
  description: string;
  bahanList: Array<{
    id: number;
    nama: string;
    jumlah: string;
  }>;
  langkahList: Array<{
    id: number;
    resepId:number;
    urutan: number;
    deskripsi: string;
  }>;
  tanggalUnggahan: string;
  notes: string;
  cookingTime: string;
  servings: number;
  difficulty: string;
  isFree: boolean;
  price: number;
}

const DetailMyRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError("Recipe ID is required");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000/v1/admin/dashboard/recipes/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        setRecipe(data.data);
        console.log(data.data.bahanList);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !recipe) {
    return <div className="text-center py-8 text-red-500">{error || "Recipe not found"}</div>;
  }
  console.log(recipe);

  return (
    <div className="p-8">
      <DetailHeader recipe={recipe} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <IngredientsSection ingredients={recipe.bahanList} />
        <InstructionsSection instructions={recipe.langkahList} notes={recipe.notes} />
      </div>
    </div>
  );
};

export default DetailMyRecipe;