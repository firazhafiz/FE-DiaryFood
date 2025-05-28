"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { FaEllipsisH, FaEye, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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

interface ProfileRecipeTableProps {
  recipes: Recipe[];
  onShow?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const ProfileRecipeTable: React.FC<ProfileRecipeTableProps> = ({ recipes, onShow, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Memoize filtered and sorted recipes
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((recipe) => recipe.nama.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Apply sort
    if (sortOption) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case "title":
            return a.nama.localeCompare(b.nama);
          case "category":
            return a.kategori.nama.localeCompare(b.kategori.nama);
          case "status":
            return a.isApproved.localeCompare(b.isApproved);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [recipes, searchQuery, sortOption]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between mb-6">
        <Link href={"/profile/my-recipe/add-recipe"} className="bg-[var(--custom-orange)] text-white px-4 py-1 rounded-md text-xs font-medium hover:bg-[var(--custom-orange)]/90 transition-colors flex items-center gap-2">
          <FaPlus className="w-3 h-3" />
          Add Recipe
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-4 pr-10 py-2 text-slate-500 text-sm border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] placeholder:text-slate-500 placeholder:text-sm"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-2 border-2 border-white rounded-md focus:border-[var(--custom-orange)] cursor-pointer focus:outline-none text-slate-500 focus:ring-blue-500 placeholder:text-sm text-sm">
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      <div className="rounded-xl">
        <div className="grid grid-cols-5 py-4 px-6 ">
          <p className="text-slate-700 font-medium text-sm col-span-2">Recipe</p>
          <p className="text-slate-700 font-medium text-sm">Category</p>
          <p className="text-slate-700 font-medium text-sm">Status</p>
          <p className="text-slate-700 font-medium text-sm text-right pr-3">Actions</p>
        </div>

        <div className="flex flex-col gap-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => <RecipeRow key={recipe.id} {...recipe} onDelete={onDelete} onShow={onShow} />)
          ) : (
            <div className="py-4 px-6 text-center text-slate-500 text-sm">No recipes found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

interface RecipeRowProps extends Recipe {
  onDelete?: (id: number) => void;
  onShow?: (id: number) => void;
}

const RecipeRow: React.FC<RecipeRowProps> = ({ id, nama, user, kategori, photoResep, isApproved, onDelete, onShow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsConfirmingDelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle showing recipe details
  const handleShow = () => {
    if (onShow) {
      onShow(id);
      setIsOpen(false);
    }
  };

  // Handle deletion with confirmation
  const handleDelete = () => {
    if (isConfirmingDelete) {
      if (onDelete) {
        onDelete(id);
      }
      setIsOpen(false);
      setIsConfirmingDelete(false);
    } else {
      setIsConfirmingDelete(true);
    }
  };

  // Cancel delete confirmation
  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(false);
  };

  return (
    <div className="grid grid-cols-5 items-center py-4 px-6 border-b bg-white/60 rounded-xl border-white/60 hover:bg-gray-50">
      <div className="flex items-center gap-3 col-span-2">
        <div className="relative w-48 h-28 rounded-lg">
          <Image src={photoResep} alt={nama} fill className="object-cover rounded-xl" priority={false} sizes="100" />
        </div>
        <div>
          <p className="text-slate-700 font-medium">{nama}</p>
          <p className="text-slate-500 text-xs">{user.name}</p>
        </div>
      </div>

      <div>
        <p className="text-slate-700">{kategori.nama}</p>
      </div>

      <div>
        <span className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isApproved === "APPROVED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{isApproved}</span>
      </div>

      <div className="relative flex justify-end" ref={dropdownRef}>
        <button className="cursor-pointer text-slate-500 p-2 rounded-full hover:bg-slate-100 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Recipe actions">
          <FaEllipsisH />
        </button>

        {isOpen && (
          <div className="absolute top-10 right-0 z-10">
            <div className="bg-white shadow-lg rounded-xl py-1 min-w-32 border border-slate-100">
              {!isConfirmingDelete ? (
                <>
                  <Link href={`/profile/my-recipe/show?id=${id}`} className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleShow}>
                    <FaEye className="text-slate-500" />
                    <span>Show</span>
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleShow}>
                    <FaEdit className="text-slate-500" />
                    <span>Edit</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleDelete}>
                    <FaTrash className="text-red-500" />
                    <span>Delete</span>
                  </button>
                </>
              ) : (
                <div className="p-3">
                  <p className="text-slate-700 font-medium text-sm mb-2">Are you sure you want to delete this recipe?</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors" onClick={handleDelete}>
                      Confirm
                    </button>
                    <button className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-300 transition-colors" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
