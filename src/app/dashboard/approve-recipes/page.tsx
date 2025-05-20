"use client";

import React, { useState, useMemo } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaSearch, FaSort } from "react-icons/fa";
import Swal from "sweetalert2";

interface Recipe {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  submittedAt: string;
}

export default function ApproveRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: "1", title: "Spaghetti Carbonara", author: "John Doe", category: "Italian", status: "pending", submittedAt: "2024-03-20T10:00:00Z" },
    { id: "2", title: "Chicken Curry", author: "Jane Smith", category: "Indian", status: "pending", submittedAt: "2024-03-21T11:30:00Z" },
    { id: "3", title: "Beef Stir-fry", author: "Peter Jones", category: "Asian", status: "pending", submittedAt: "2024-03-22T14:00:00Z" },
    { id: "4", title: "Vegetable Soup", author: "Mary Brown", category: "Vegetarian", status: "pending", submittedAt: "2024-03-23T09:15:00Z" },
    { id: "5", title: "Chocolate Cake", author: "David Green", category: "Dessert", status: "pending", submittedAt: "2024-03-24T16:45:00Z" },
    { id: "6", title: "Greek Salad", author: "Sophia Lee", category: "Salad", status: "pending", submittedAt: "2024-03-25T12:00:00Z" },
    { id: "7", title: "Pasta Primavera", author: "Michael Clark", category: "Italian", status: "pending", submittedAt: "2024-03-26T10:30:00Z" },
    { id: "8", title: "Sushi Rolls", author: "Emily Wang", category: "Japanese", status: "pending", submittedAt: "2024-03-27T18:00:00Z" },
    { id: "9", title: "Pizza Margherita", author: "Chris Evans", category: "Italian", status: "pending", submittedAt: "2024-03-28T19:30:00Z" },
    { id: "10", title: "Burger Sliders", author: "Anna White", category: "American", status: "pending", submittedAt: "2024-03-29T11:00:00Z" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleAccept = async (id: string) => {
    try {
      console.log("Accepting recipe with ID:", id);
      Swal.fire({
        title: "Recipe Accepted!",
        text: "The recipe has been approved successfully.",
        icon: "success",
        confirmButtonColor: "#ff725e",
      });

      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error: unknown) {
      console.error("Error accepting recipe:", error);
      let errorMessage = "Failed to accept the recipe. Please try again.";
      if (error instanceof Error) {
        errorMessage = `Failed to accept the recipe: ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage = `Failed to accept the recipe: ${error}`;
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ff725e",
      });
    }
  };

  const handleReject = async (id: string) => {
    const { value: formValues } = await Swal.fire({
      title: "Reject Recipe",
      html:
        '<div class="mb-4">' +
        '<label class="block text-gray-700 text-sm font-bold mb-2">Reason for Rejection</label>' +
        '<textarea id="reason" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>' +
        "</div>",
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#ff725e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Reject Recipe",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = (document.getElementById("reason") as HTMLTextAreaElement).value;
        if (!reason) {
          Swal.showValidationMessage("Please provide a reason for rejection");
          return false;
        }
        return reason;
      },
    });

    if (formValues) {
      try {
        console.log("Rejecting recipe with ID:", id, "Reason:", formValues);
        Swal.fire({
          title: "Recipe Rejected",
          text: "The recipe has been rejected successfully.",
          icon: "success",
          confirmButtonColor: "#ff725e",
        });

        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      } catch (error: unknown) {
        console.error("Error rejecting recipe:", error);
        let errorMessage = "Failed to reject the recipe. Please try again.";
        if (error instanceof Error) {
          errorMessage = `Failed to reject the recipe: ${error.message}`;
        } else if (typeof error === "string") {
          errorMessage = `Failed to reject the recipe: ${error}`;
        }
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#ff725e",
        });
      }
    }
  };

  const handleView = (id: string) => {
    console.log("Viewing recipe with ID:", id);
    Swal.fire({
      title: "View Recipe",
      text: `Details for recipe ID: ${id} (Implementation needed)`,
      icon: "info",
      confirmButtonColor: "#ff725e",
    });
  };

  const filteredAndSortedRecipes = useMemo(() => {
    const filtered = recipes.filter(
      (recipe) => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.author.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortableFiltered = [...filtered];

    sortableFiltered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      } else if (sortBy === "author-asc") {
        return a.author.localeCompare(b.author);
      } else if (sortBy === "author-desc") {
        return b.author.localeCompare(a.author);
      } else if (sortBy === "category-asc") {
        return a.category.localeCompare(b.category);
      } else if (sortBy === "category-desc") {
        return b.category.localeCompare(a.category);
      }
      return 0;
    });

    return sortableFiltered;
  }, [recipes, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = filteredAndSortedRecipes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8 space-y-8 relative min-h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-900">Recipe Approvals</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors cursor-pointer">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="author-asc">Author (A-Z)</option>
            <option value="author-desc">Author (Z-A)</option>
            <option value="category-asc">Category (A-Z)</option>
            <option value="category-desc">Category (Z-A)</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSort className="text-slate-400" />
          </div>
        </div>
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors placeholder:text-slate-700"
          />
        </div>
      </div>

      <div className="w-full mx-auto mb-12">
        <div className="overflow-x-auto">
          <div className="space-y-4" id="recipe-list-container">
            {currentRecipes.map((recipe) => (
              <div key={recipe.id} className="grid grid-cols-1 md:grid-cols-5 bg-white/60 border-2 border-white rounded-2xl py-4 px-6 items-center gap-4">
                <div className="md:col-span-2">
                  <div className="text-sm font-medium text-gray-900 break-words">{recipe.title}</div>
                  <div className="text-sm text-gray-500">by {recipe.author}</div>
                </div>

                <div className="text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{recipe.category}</span>
                </div>

                <div className="text-sm text-gray-500">Submitted: {new Date(recipe.submittedAt).toLocaleDateString()}</div>

                <div className="text-sm font-medium flex space-x-3 justify-end md:justify-start">
                  <button onClick={() => handleView(recipe.id)} className="text-blue-600 hover:text-blue-900 transition-colors" title="View Recipe">
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleAccept(recipe.id)} className="text-green-600 hover:text-green-900 transition-colors" title="Accept Recipe">
                    <FiCheck className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleReject(recipe.id)} className="text-red-600 hover:text-red-900 transition-colors" title="Reject Recipe">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {currentRecipes.length === 0 && <div className="text-center py-12 text-gray-500">No matching recipes found.</div>}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-slate-700 hover:bg-white/60 transition-colors"}`}>
            <FaChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPage === index + 1 ? "bg-[#FF7A5C] text-white" : "text-slate-700 hover:bg-white/60 transition-colors"}`}>
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

      {recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No pending recipes to review</p>
        </div>
      )}
    </div>
  );
}
