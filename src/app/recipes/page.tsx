"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import RecipeCardGrid from "@/components/organisms/RecipeCardGrid";
import FilterSidebar, { FilterItem } from "@/components/atoms/FilterSidebar";
import SelectedFilters from "@/components/atoms/SelectedFilters";
import FilterControlModal from "@/components/molecules/FilterControlModal";
import { useSearchParams } from "next/navigation";

const dummyRecipes = [
  {
    title: "Spaghetti Carbonara",
    image: "/assets/images/image_spaghetti.jpg",
    time: "30",
    category: "Italian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    tags: ["Italia", "Bebas Gluten"],
    slug: "spaghetti-carbonara",
  },
  {
    title: "Chicken Curry",
    image: "/assets/images/image_curry.jpg",
    time: "45",
    category: "Indian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    tags: ["India", "Protein Aktif"],
    slug: "chicken-curry",
  },
  {
    title: "Beef Steak American",
    image: "/assets/images/image_steak.jpg",
    time: "25",
    category: "American",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    tags: ["Protein Aktif"],
    slug: "beef-steak-american",
  },
  {
    title: "Pizza Margherita",
    image: "/assets/images/image_pizza.jpg",
    time: "35",
    category: "Italian",
    isFree: false,
    price: 100000,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    tags: ["Italia", "Vegetarian"],
    slug: "pizza-margherita",
  },
  {
    title: "Rendang Padang",
    image: "/assets/images/image_pizza.jpg",
    time: "120",
    category: "Indonesian",
    isFree: false,
    price: 100000,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    tags: ["Indonesia", "Jawa Timur"],
    slug: "rendang-padang",
  },
];

const Resep = () => {
  const searchParams = useSearchParams();
  const [allRecipes] = useState(dummyRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(dummyRecipes);
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle category from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      // Convert category to proper case (e.g., "breakfast" -> "Breakfast")
      const categoryValue =
        categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      setSelectedFilters([{ category: "Category", value: categoryValue }]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredRecipes(allRecipes);
      return;
    }

    // Filter recipes based on selected filters
    const filtered = allRecipes.filter((recipe) => {
      // Check both tags and category
      const recipeTags = recipe.tags.map((tag) => tag.toLowerCase());
      const recipeCategory = recipe.category.toLowerCase();

      return selectedFilters.some((filter) => {
        const filterValue = filter.value.toLowerCase();
        // If filter is for category, check recipe category
        if (filter.category === "Category") {
          return recipeCategory === filterValue;
        }
        // Otherwise check tags
        return recipeTags.includes(filterValue);
      });
    });

    setFilteredRecipes(filtered);
  }, [selectedFilters, allRecipes]);

  const handleFilterChange = (filters: FilterItem[]) => {
    setSelectedFilters(filters);
  };

  const handleRemoveFilter = (filterToRemove: FilterItem) => {
    setSelectedFilters(
      selectedFilters.filter(
        (filter) =>
          !(
            filter.category === filterToRemove.category &&
            filter.value === filterToRemove.value
          )
      )
    );
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 flex flex-col md:flex-row gap-6 mb-12 mt-6 pt-[120px]">
        {/* Mobile Filter Button */}
        <div className="md:hidden w-full mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-4 bg-gradient-to-r from-[color:var(--custom-orange)] to-orange-400 text-white rounded-xl flex items-center justify-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z"
                clipRule="evenodd"
              />
            </svg>
            Filter Resep
          </button>
        </div>

        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block md:w-1/4">
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <SelectedFilters
            selectedFilters={selectedFilters}
            totalRecipes={filteredRecipes.length}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
          <RecipeCardGrid recipes={filteredRecipes} />
        </div>
      </main>

      {/* Filter Modal for both mobile and desktop */}
      <FilterControlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <Footer />
    </div>
  );
};

export default Resep;
