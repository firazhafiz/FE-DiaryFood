"use client";

import React, { useState, useRef, useEffect } from "react";
import InputSearch from "../atoms/InputSearch";
import SearchButton from "../atoms/SearchButton";
import { FiChevronDown } from "react-icons/fi";

const categories = [
  { id: "all", label: "Categories" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "snacks", label: "Snacks" },
  { id: "drinks", label: "Drinks" },
];

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Searching:", {
        query: searchQuery,
        category: selectedCategory.id,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="flex items-stretch w-full h-10 bg-gray-50 rounded-sm overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="relative flex items-center h-full" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-sm h-full px-4 flex items-center gap-2 text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors duration-200 border-r border-gray-200"
          >
            <span className="font-medium">{selectedCategory.label}</span>
            <FiChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-20">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                                        w-full px-4 py-2 text-left text-sm
                                        ${
                                          category.id === selectedCategory.id
                                            ? "bg-[color:var(--custom-orange)/.1] text-[color:var(--custom-orange)] font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }
                                    `}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <InputSearch
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search Button */}
        <SearchButton
          type="submit"
          loading={isLoading}
          disabled={!searchQuery.trim()}
          className="h-full rounded-sm"
        />
      </div>
    </form>
  );
};

export default SearchBar;
