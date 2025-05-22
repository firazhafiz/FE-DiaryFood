"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryManagement from "@/components/organisms/CategoryManagement";

interface Category {
  id: string;
  name: string; // DIUBAH: Gunakan 'name' untuk konsistensi dengan CategoryManagement
  description: string;
  recipeCount: number;
  createdAt: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const getCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/v1/category");

        if (!response.ok) {
          throw new Error("Failed to fetch categories"); // DIUBAH: Perbaiki pesan error
        }

        const data = await response.json();
        console.log("API Response:", data);
        setCategories(data.data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching categories:", err); // DIUBAH: Perbaiki log error
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, [router]); // BARU: Tambahkan router sebagai dependency

  return (
    <div className="space-y-6 p-8 min-h-screen">
      {isLoading ? ( // BARU: Tampilkan UI untuk loading
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--custom-orange)]"></div>
        </div>
      ) : error ? ( // BARU: Tampilkan UI untuk error
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-slate-900">
              Categories Management
            </h1>
          </div>
          <CategoryManagement
            categories={categories} // BARU: Kirim data categories ke child
            setCategories={setCategories} // BARU: Kirim setCategories untuk update state
          />
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
