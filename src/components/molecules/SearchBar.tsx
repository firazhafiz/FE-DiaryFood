"use client";

import React, { useState, useRef, useEffect } from "react";
import InputSearch from "../atoms/InputSearch";
import SearchButton from "../atoms/SearchButton";

const categories = [
  { id: "all", label: "Categories" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "snacks", label: "Snacks" },
  { id: "drinks", label: "Drinks" },
];

interface SearchBarProps {
  isSticky: boolean;
  isPath: boolean;
  customBgColor?: string; // Custom background color for non-home pages
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSticky,
  isPath = false,
  customBgColor = "bg-gray-600", // Default value when not provided
}) => {
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

  // Determine the background color based on props
  const getBgColor = () => {
    if (isPath) {
      // For non-home pages, use the custom color
      return customBgColor;
    } else if (isSticky) {
      // For sticky home navbar
      return "bg-gray-600 ";
    } else {
      // For non-sticky home navbar
      return "bg-white/10 backdrop-blur-xl border border-white/30 placeholder:text-white";
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div
        className={`flex items-stretch w-full h-10 rounded-full overflow-visible ${getBgColor()}`}
      >
        {/* Search Input */}
        <InputSearch
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={isPath ? "text-gray-800 " : " placeholder:text-white"}
        />

        {/* Search Button */}
        <SearchButton
          type="submit"
          loading={isLoading}
          disabled={!searchQuery.trim()}
          className="h-full rounded-full"
        />
      </div>
    </form>
  );
};

export default SearchBar;
