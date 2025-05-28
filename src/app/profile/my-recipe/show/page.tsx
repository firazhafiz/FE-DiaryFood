"use client";

import DetailHeader from "@/components/molecules/DetailHeader";
import IngredientsSection from "@/components/molecules/IngredientsSection";
import InstructionsSection from "@/components/molecules/InstructionsSection";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
interface Recipe {
  id: number;
  nama: string;
  photoResep: string;
  user: {
    name: string;
    photo: string;
  };
  date: string;
  category: string;
  isApproved: string;
  description: string;
  cookingTime: string;
  preparationTime: string;
  servingTime: string;
  bahanList: Array<{
    id: number;
    nama: string;
    jumlah: string;
  }>;
  langkahList: Array<{
    id: number;
    resepId: number;
    urutan: number;
    deskripsi: string;
  }>;
  tanggalUnggahan: string;
  note: string;
}
const DetailMyRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    console.log(id);
    const fetchRecipe = async () => {
      if (!id) {
        setError("Recipe ID is required");
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const response = await fetch(`http://localhost:4000/v1/profile/recipe/${id}`, {
          method: "Get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        console.log(data.data);
        setRecipe(data.data);
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

  return (
    <div className="p-8 min-h-screen">
      <DetailHeader recipe={recipe} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <IngredientsSection ingredients={recipe.bahanList} />
        <InstructionsSection instructions={recipe.langkahList} notes={recipe.notes} />
      </div>
    </div>
  );
};

export default DetailMyRecipe;
