"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import RecipeCardGrid from "@/components/organisms/RecipeCardGrid";
import FilterSidebar, { FilterItem } from "@/components/atoms/FilterSidebar";
import SelectedFilters from "@/components/atoms/SelectedFilters";
import FilterControlModal from "@/components/molecules/FilterControlModal";
<<<<<<< HEAD
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Recipe } from "@/types/recipe";
import Loading from "./loading";
=======
import { useSearchParams } from "next/navigation";
import { getRecipes } from "@/services/recipeService";

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
      avatar: "/assets/images/image_login.jpg",
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
      avatar: "/assets/images/image_login.jpg",
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
      avatar: "/assets/images/image_login.jpg",
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
      avatar: "/assets/images/image_login.jpg",
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
      avatar: "/assets/images/image_login.jpg",
    },
    tags: ["Indonesia", "Jawa Timur"],
    slug: "rendang-padang",
  },
];
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c

const Resep = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
=======
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/resep");
        const data = await response.json();
        console.log(data.data.reseps);
        setRecipes(data.data.reseps);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, []);
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c

  // Fetch categories
  useEffect(() => {
<<<<<<< HEAD
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/v1/category");
        console.log("Category API status:", response.status);
        if (!response.ok) {
          throw new Error(
            `HTTP error ${response.status}: Gagal mengambil kategori`
          );
        }
        const data = await response.json();
        console.log("Category API response:", JSON.stringify(data, null, 2));
        if (data?.data && Array.isArray(data.data)) {
          setCategories(data.data.map((cat: { nama: string }) => cat.nama));
        } else {
          console.error("Invalid category data structure:", data);
          throw new Error("Format data kategori tidak valid");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(
          error instanceof Error ? error.message : "Gagal mengambil kategori"
        );
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);
=======
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      // Convert category to proper case (e.g., "breakfast" -> "Breakfast")
      const categoryValue = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      setSelectedFilters([{ category: "Category", value: categoryValue }]);
    }
  }, [searchParams]);
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("http://localhost:4000/v1/resep");
        if (!response.ok) {
          throw new Error(
            `HTTP error ${response.status}: Gagal mengambil resep`
          );
        }
        const data = await response.json();
        console.log("Recipes API response:", JSON.stringify(data, null, 2));
        if (!data?.data?.reseps || !Array.isArray(data.data.reseps)) {
          throw new Error("Format data resep tidak valid");
        }
        const fetchedRecipes = data.data.reseps;
        setRecipes(fetchedRecipes);
        setAllRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(
          error instanceof Error ? error.message : "Gagal mengambil resep"
        );
        setRecipes([]);
        setAllRecipes([]);
        setFilteredRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Track navigation using sessionStorage
  useEffect(() => {
    if (isInitialLoad) {
      // Set a flag in sessionStorage during navigation
      sessionStorage.setItem("isNavigating", "true");
    }
  }, [isInitialLoad]);

  // Reset filters on true page refresh
  useEffect(() => {
    if (!isInitialLoad) return;

    const categoryFromUrl = searchParams.get("category");
    console.log(
      "Reset useEffect - URL category:",
      categoryFromUrl,
      "isInitialLoad:",
      isInitialLoad,
      "pathname:",
      pathname
    );

    // Check if this is a page refresh (not navigation)
    const isNavigating = sessionStorage.getItem("isNavigating") === "true";
    if (!isNavigating && categoryFromUrl) {
      setSelectedFilters([]);
      router.replace("/recipes", { scroll: false });
      console.log("Page refresh: Cleared category from URL");
    }

    // Clear the navigation flag after first load
    sessionStorage.removeItem("isNavigating");
    setIsInitialLoad(false);
  }, [isInitialLoad, searchParams, router, pathname]);

  // Sync filters with URL category after initial load
  useEffect(() => {
    if (isInitialLoad) return;

    const categoryFromUrl = searchParams.get("category");
    console.log(
      "Filter sync useEffect - URL category:",
      categoryFromUrl,
      "isInitialLoad:",
      isInitialLoad,
      "pathname:",
      pathname
    );

    if (categoryFromUrl && categories.length > 0) {
      const matchedCategory = categories.find(
        (cat) => cat.toLowerCase() === categoryFromUrl.toLowerCase()
      );
      if (matchedCategory) {
        setSelectedFilters([{ category: "Category", value: matchedCategory }]);
        console.log("Applied filter for category:", matchedCategory);
      } else {
        console.warn(
          `Category "${categoryFromUrl}" not found in categories:`,
          categories
        );
        setSelectedFilters([]);
        router.replace("/recipes", { scroll: false });
        console.log("Cleared URL: Category not found");
      }
    } else if (!categoryFromUrl && selectedFilters.length > 0) {
      setSelectedFilters([]);
      console.log("Cleared filters: No category in URL");
    }
  }, [searchParams, categories, isInitialLoad, router, pathname]);

  // Filter recipes based on selected filters
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredRecipes(allRecipes);
      console.log("No filters: Showing all recipes:", allRecipes.length);
      return;
    }

    const filtered = allRecipes.filter((recipe) => {
      const recipeCategory = recipe.kategori?.nama.toLowerCase() || "";
      return selectedFilters.some((filter) => {
        if (filter.category === "Category") {
          return recipeCategory === filter.value.toLowerCase();
        }
        return false;
      });
    });

    setFilteredRecipes(filtered);
    console.log("Filtered recipes for", selectedFilters, ":", filtered.length);
  }, [selectedFilters, allRecipes]);

  const handleFilterChange = (filters: FilterItem[]) => {
    console.log("handleFilterChange:", filters);
    setSelectedFilters(filters);
    if (filters.length > 0 && filters[0].category === "Category") {
      router.replace(
        `/recipes?category=${encodeURIComponent(filters[0].value)}`,
        { scroll: false }
      );
      console.log("Updated URL to:", `/recipes?category=${filters[0].value}`);
    } else {
      router.replace("/recipes", { scroll: false });
      console.log("Cleared URL category");
    }
  };

  const handleRemoveFilter = (filterToRemove: FilterItem) => {
<<<<<<< HEAD
    const newFilters = selectedFilters.filter(
      (filter) =>
        !(
          filter.category === filterToRemove.category &&
          filter.value === filterToRemove.value
        )
    );
    setSelectedFilters(newFilters);
    if (newFilters.length === 0) {
      router.replace("/recipes", { scroll: false });
      console.log("Removed filter, cleared URL");
    }
=======
    setSelectedFilters(selectedFilters.filter((filter) => !(filter.category === filterToRemove.category && filter.value === filterToRemove.value)));
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    router.replace("/recipes", { scroll: false });
    console.log("Cleared all filters and URL");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 flex flex-col md:flex-row gap-6 mb-12 mt-6 pt-[120px]">
        {/* Mobile Filter Button */}
        <div className="md:hidden w-full mb-4">
          <button onClick={() => setIsModalOpen(true)} className="w-full py-3 px-4 bg-gradient-to-r from-[color:var(--custom-orange)] to-orange-400 text-white rounded-xl flex items-center justify-center gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
            Filter Resep
          </button>
        </div>

        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block md:w-1/4">
          <FilterSidebar selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
<<<<<<< HEAD
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error Loading Data
              </h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <>
              <SelectedFilters
                selectedFilters={selectedFilters}
                totalRecipes={recipes.length}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
              <RecipeCardGrid recipes={filteredRecipes} />
            </>
          )}
        </div>
      </main>

      {/* Filter Modal */}
      <FilterControlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
=======
          <SelectedFilters selectedFilters={selectedFilters} totalRecipes={filteredRecipes.length} onRemoveFilter={handleRemoveFilter} onClearAll={handleClearAllFilters} />
          <RecipeCardGrid recipes={recipes} />
        </div>
      </main>

      {/* Filter Modal for both mobile and desktop */}
      <FilterControlModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c

      <Footer />
    </div>
  );
};

export default Resep;
