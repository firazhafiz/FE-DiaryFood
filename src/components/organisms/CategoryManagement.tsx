"use client";

import { useState } from "react";
import AddCategoryModal from "../molecules/AddCategoryModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
  description: string;
  recipeCount: number;
  createdAt: string;
}

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Breakfast",
      description: "Breakfast recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Lunch",
      description: "Lunch recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Dinner",
      description: "Dinner recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "4",
      name: "Dessert",
      description: "Dessert recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "5",
      name: "Snacks",
      description: "Snack recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "6",
      name: "Drinks",
      description: "Drink recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "7",
      name: "Appetizers",
      description: "Appetizer recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "8",
      name: "Main Courses",
      description: "Main course recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "9",
      name: "Side Dishes",
      description: "Side dish recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
    {
      id: "10",
      name: "Soups",
      description: "Soup recipes",
      recipeCount: 10,
      createdAt: "2024-01-01",
    },
  ]);

  const handleDelete = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleAddCategory = (newCategory: { name: string }) => {
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: "",
      recipeCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCategories([...categories, category]);
  };

  // Pagination calculations
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 relative min-h-[calc(100vh-200px)]">
      {/* Add Category Button */}
      <div className="flex justify-center mb-6">
        <button onClick={() => setIsModalOpen(true)} className="bg-[#FF7A5C] text-white text-sm cursor-pointer px-6 py-2 rounded-xl hover:bg-[#ff6b4a] transition-colors flex items-center gap-2 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full mx-auto mb-12">
        <div className="overflow-x-auto">
          {/* Header Row */}
          <div className="min-w-full divide-y divide-gray-200">
            <div className="grid grid-cols-3 rounded-2xl py-4 mb-1">
              <div className="px-6 text-center text-md font-medium text-slate-700 tracking-wider">Name</div>
              <div className="px-6 text-center text-md font-medium text-slate-700 tracking-wider">Recipe Count</div>
              <div className="px-6 text-center text-md font-medium text-slate-700 tracking-wider">Actions</div>
            </div>

            {/* Body Rows */}
            <div className="space-y-4">
              {currentCategories.map((category) => (
                <div key={category.id} className="grid grid-cols-3 bg-white/60 border-2 border-white rounded-2xl py-4">
                  <div className="px-6 whitespace-nowrap">
                    <div className="text-sm text-center font-medium text-gray-900">{category.name}</div>
                  </div>

                  <div className="px-6 whitespace-nowrap">
                    <p className="px-2 py-1 text-xs text-center font-medium text-slate-900">{category.recipeCount} recipes</p>
                  </div>

                  <div className="px-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex justify-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors" onClick={() => handleDelete(category.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-slate-700 hover:bg-white/60 transition-colors"}`}>
              <FaChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`w-8 h-8 rounded-lg ${currentPage === index + 1 ? "bg-[#FF7A5C] text-white" : "text-slate-700 hover:bg-white/60 transition-colors"}`}>
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-slate-700 hover:bg-white/60 transition-colors"}`}>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddCategory} />
    </div>
  );
};

export default CategoryManagement;
