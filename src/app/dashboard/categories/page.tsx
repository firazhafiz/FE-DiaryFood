"use client";

import CategoryManagement from "@/components/organisms/CategoryManagement";
import { useDeferredValue, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Category {
  id: number;
  nama: string; // DIUBAH: Gunakan 'name' untuk konsistensi dengan CategoryManagement
  description: string;
  totalRecipes: number;
  createdAt: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const deferredCategories = useDeferredValue(categories);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/v1/admin/dashboard/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token") || ""}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (!data.data) {
          throw new Error("Data kategori tidak ditemukan di respons API");
        }

        setCategories(data.data);
      } catch (err: any) {
        console.error("Error fetching categories:", err);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="space-y-6 p-8 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-900">Manajemen Kategori</h1>
      </div>
      <CategoryManagement categories={deferredCategories} setCategories={setCategories} />
    </div>
  );
};

export default CategoriesPage;
