"use client";

import { useState } from "react";
import { RecipeManagement } from "@/components/organisms/RecipeManagement";
import { FaSearch, FaSort } from "react-icons/fa";

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="p-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Recipes Management</h1>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-end gap-4">
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)]  text-slate-700 transition-colors placeholder:text-slate-700"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700  transition-colors cursor-pointer">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="category">Category</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaSort className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Recipe Management with Search and Sort Props */}
        <RecipeManagement searchQuery={searchQuery} sortBy={sortBy} />
      </div>
    </div>
  );
}
