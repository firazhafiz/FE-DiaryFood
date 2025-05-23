"use client";

import CategoryManagement from "@/components/organisms/CategoryManagement";
import { useDeferredValue, useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deferredCategories = useDeferredValue(categories);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/v1/admin/dashboard/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleAddCategory = async (newCategory: { nama: string }) => {
    try {
      const res = await fetch("http://localhost:4000/v1/admin/dashboard/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newCategory),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setCategories((prev) => [...prev, data.data]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding category:", err);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const res = await fetch(`http://localhost:4000/v1/admin/dashboard/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setCategories((prev) => prev.filter((category: any) => category.id !== categoryId));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="space-y-6 p-8 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-900">Manajemen Kategori</h1>
      </div>
      {loading && <p className="text-slate-500">Memuat...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <CategoryManagement categories={deferredCategories} onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} />
    </div>
  );
};

export default CategoriesPage;
