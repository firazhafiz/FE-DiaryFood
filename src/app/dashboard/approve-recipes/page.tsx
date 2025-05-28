"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaSearch, FaSort } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FaEllipsis } from "react-icons/fa6";

interface Recipe {
  id: string;
  nama: string;
  photoResep: string;
  user: {
    name: string,
    photo: string;
  };
  tanggalUnggahan: string;
  kategori:{
    nama : string;
  } ,
  status: string;
  submittedAt: string;
}

export default function ApproveRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [confirmingRejectId, setConfirmingRejectId] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();



useEffect(()=>{

  const getPendingRecipe = async ()=>{

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect ke halaman login jika tidak ada token
      return;
    }
    
    const response = await fetch("http://localhost:4000/v1/admin/dashboard/pending-recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    });


    const data = await response.json();
    console.log(data.data.data)
    setRecipes(data.data.data)
  }
  getPendingRecipe();

},[])


  const handleAccept = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const response = await fetch(
      `http://localhost:4000/v1/admin/dashboard/pending-recipes/${id}/approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      console.log("approve recipe berhasil");
      Swal.fire({
        title: "Recipe Approved",
        text: "The recipe has been approved successfully.",
        icon: "success",
        confirmButtonColor: "#ff725e",
      });
    } else {
      router.push("/")
    }
  } catch (error) {
    console.error("Error approving recipe:", error);
    let errorMessage = "Failed to approve the recipe. Please try again.";
    if (error instanceof Error) {
      errorMessage = `Failed to approve the recipe: ${error.message}`;
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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/v1/admin/dashboard/pending-recipes/${id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
        Swal.fire({
          title: "Recipe Rejected",
          text: "The recipe has been rejected successfully.",
          icon: "success",
          confirmButtonColor: "#ff725e",
        });
       
      } else {
        throw new Error("Failed to reject the recipe");
      }
    } catch (error) {
      console.error("Error rejecting recipe:", error);
      let errorMessage = "Failed to reject the recipe. Please try again.";
      if (error instanceof Error) {
        errorMessage = `Failed to reject the recipe: ${error.message}`;
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ff725e",
      });
  }
};



  function handleView(id:string){
    router.push(`/dashboard/recipes/show?id=${id}`);

  }
  const filteredAndSortedRecipes = useMemo(() => {
    const filtered = recipes.filter(
      (recipe) => recipe.nama.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.kategori.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortableFiltered = [...filtered];

    sortableFiltered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      } else if (sortBy === "title-asc") {
        return a.nama.localeCompare(b.nama);
      } else if (sortBy === "title-desc") {
        return b.nama.localeCompare(a.nama);
      } else if (sortBy === "author-asc") {
        return a.user.name.localeCompare(b.user.name);
      } else if (sortBy === "author-desc") {
        return b.user.name.localeCompare(a.user.name);
      } else if (sortBy === "category-asc") {
        return a.kategori.nama.localeCompare(b.kategori.nama);
      } else if (sortBy === "category-desc") {
        return b.kategori.nama.localeCompare(a.kategori.nama);
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


  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
    setConfirmingRejectId(null); // Reset reject confirmation when toggling
  };

  const handleCancelReject = () => {
    setConfirmingRejectId(null);
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
            className="w-full appearance-none pl-4 pr-10 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors cursor-pointer"
          >
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
        <div className="relative">
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
        <div className="">
          <div className="space-y-4" id="recipe-list-container">
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : currentRecipes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No matching recipes found.
              </div>
            ) : (
              currentRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="grid grid-cols-1 md:grid-cols-5 bg-white/60 border-2 border-white rounded-2xl py-4 px-4 items-center gap-4 hover:bg-gray-50"
                >
                  {/* Image and Recipe Info */}
                  <div className="flex items-center gap-4 col-span-2">
                    <div className="h-20 w-28 flex-shrink-0">
                      <img
                        src={recipe.photoResep}
                        alt={`Image of ${recipe.nama}`}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold text-slate-700 break-words">
                        {recipe.nama}
                      </div>
                      <div className="text-sm text-gray-500">by {recipe.user.name}</div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {recipe.kategori.nama}
                    </span>
                  </div>

                  {/* Submission Date */}
                  <div className="text-sm text-gray-500 flex items-center">
                    {new Date(recipe.tanggalUnggahan).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="relative flex justify-end" ref={(el) => (dropdownRefs.current[recipe.id] = el)}>
                    <button
                      className="cursor-pointer text-slate-500 p-2 rounded-full hover:bg-slate-100 transition-colors"
                      onClick={() => toggleDropdown(recipe.id)}
                      aria-label="Recipe actions"
                      disabled={isLoading}
                    >
                      <FaEllipsis />
                    </button>

                    {openDropdownId === recipe.id && (
                      <div className="absolute top-10 right-0 z-10">
                        <div className="bg-white shadow-lg rounded-xl py-1 min-w-32 border border-slate-100">
                          {confirmingRejectId === recipe.id ? (
                            <div className="p-3">
                              <p className="text-slate-700 font-medium text-sm mb-2">
                                Are you sure you want to reject this recipe?
                              </p>
                              <div className="flex gap-2 mt-2">
                                <button
                                  className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors"
                                  onClick={() => handleReject(recipe.id)}
                                >
                                  Confirm
                                </button>
                                <button
                                  className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-300 transition-colors"
                                  onClick={handleCancelReject}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <button
                                className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                                onClick={() => handleView(recipe.id)}
                              >
                                <FiEye className="text-slate-700" />
                                <span>Show</span>
                              </button>
                              <button
                                className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
                                onClick={() => handleAccept(recipe.id)}
                              >
                                <FiCheck className="text-slate-700" />
                                <span>Accept</span>
                              </button>
                              <button
                                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 font-medium text-sm hover:bg-slate-50 transition-colors"
                                onClick={() => setConfirmingRejectId(recipe.id)}
                              >
                                <FiX className="text-red-500" />
                                <span>Reject</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
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
            disabled={currentPage === 1 || isLoading}
            className={`p-2 rounded-lg ${
              currentPage === 1 || isLoading
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
              className={`w-8 h-8 rounded-lg text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-[#FF7A5C] text-white"
                  : "text-slate-700 hover:bg-white/60 transition-colors"
              }`}
              disabled={isLoading}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className={`p-2 rounded-lg ${
              currentPage === totalPages || isLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-slate-700 hover:bg-white/60 transition-colors"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
