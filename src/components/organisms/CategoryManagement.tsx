"use client";

import { useState, useMemo } from "react"; // BARU: Tambahkan useMemo untuk optimasi
import AddCategoryModal from "../molecules/AddCategoryModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Category {
  id: number;
  nama: string;
  totalRecipes: number;
}

interface CategoryManagementProps {

  categories: Category[]; // BARU: Terima categories dari parent
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>; // BARU: Terima setCategories
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  setCategories, // BARU: Destructure setCategories
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  // Hitung kategori untuk halaman saat ini menggunakan useMemo
  const currentCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categories.slice(startIndex, endIndex);
  }, [categories, currentPage]); // BARU: Gunakan useMemo untuk paginasi

  // Hitung total halaman
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Fungsi untuk menghapus kategori
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      // DIUBAH: Perbaiki pesan konfirmasi
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:4000/v1/category/${id}`,
          {
            // BARU: Panggil API DELETE
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }

        setCategories(categories.filter((category) => category.id !== id)); // BARU: Perbarui state setelah DELETE
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Fungsi untuk menambah kategori
  const handleAddCategory = async (newCategory: { name: string }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/v1/category", {
        // BARU: Panggil API POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const addedCategory = await response.json();
      setCategories([...categories, addedCategory.data]); // BARU: Tambahkan kategori dari respons API
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 relative min-h-[calc(100vh-200px)]">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FF7A5C] text-white text-sm cursor-pointer px-6 py-2 rounded-md hover:bg-[#ff6b4a] transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Tambah Kategori
        </button>
      </div>

      <div className="w-full mx-auto mb-12">
        <div className="overflow-x-auto">
          <div className="min-w-full divide-y divide-gray-200">
            <div className="grid grid-cols-3 rounded-2xl py-4 mb-1">

              <div className="px-6 text-center text-md font-medium text-slate-700 tracking-wider">
                Name
              </div>
              <div className="px-6 text-center text-md font-medium text-slate-700 tracking-wider">
                Recipe Count
              </div>
              <div className="px-6 text-center text-md font-medium text-slate-700 tracking-wider">
                Actions
              </div>
            </div>

            <div className="space-y-4">

              {currentCategories.length === 0 ? ( // BARU: Tangani kasus tidak ada data
                <div className="text-center py-4">No categories found.</div>
              ) : (
                currentCategories.map((category) => (
                  <div
                    key={category.id}
                    className="grid grid-cols-3 bg-white/60 border-2 border-white rounded-2xl py-4"
                  >
                    <div className="px-6 whitespace-nowrap">
                      <div className="text-sm text-center font-medium text-gray-900">
                        {category.name}
                      </div>
                    </div>

                    <div className="px-6 whitespace-nowrap">
                      <p className="px-2 py-1 text-xs text-center font-medium text-slate-900">
                        {category.recipeCount} recipes
                      </p>
                    </div>

                    <div className="px-6 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors"
                          onClick={() => handleDelete(category.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-slate-700 hover:bg-white/60 transition-colors"
              }`}
            >
              <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-[#FF7A5C] text-white"
                    : "text-slate-700 hover:bg-white/60 transition-colors"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-slate-700 hover:bg-white/60 transition-colors"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>


      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
};

export default CategoryManagement;
