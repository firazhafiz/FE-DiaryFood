"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import RecipeCardGrid from "@/components/organisms/RecipeCardGrid";
import FilterSidebar, { FilterItem } from "@/components/atoms/FilterSidebar";
import SelectedFilters from "@/components/atoms/SelectedFilters";
import FilterControlModal from "@/components/molecules/FilterControlModal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { Suspense } from "react";
import { config } from "@/config";

const Resep = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/category`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: Gagal mengambil kategori`);
        }
        const data = await response.json();
        if (data?.data && Array.isArray(data.data)) {
          setCategories(data.data.map((cat: { nama: string }) => cat.nama));
        } else {
          console.error("Invalid category data structure:", data);
          throw new Error("Format data kategori tidak valid");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error instanceof Error ? error.message : "Gagal mengambil kategori");
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${config.apiUrl}/resep`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: Gagal mengambil resep`);
        }
        const data = await response.json();
        if (!data?.data?.reseps || !Array.isArray(data.data.reseps)) {
          throw new Error("Format data resep tidak valid");
        }
        const fetchedRecipes = data.data.reseps;
        setRecipes(fetchedRecipes);
        setAllRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error instanceof Error ? error.message : "Gagal mengambil resep");
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
      sessionStorage.setItem("isNavigating", "true");
    }
  }, [isInitialLoad]);

  // Reset filters on true page refresh
  useEffect(() => {
    if (!isInitialLoad) return;

    const categoryFromUrl = searchParams.get("category");
    console.log("Reset useEffect - URL category:", categoryFromUrl, "isInitialLoad:", isInitialLoad, "pathname:", pathname);

    const isNavigating = sessionStorage.getItem("isNavigating") === "true";
    if (!isNavigating && categoryFromUrl) {
      setSelectedFilters([]);
      router.replace("/recipes", { scroll: false });
      console.log("Page refresh: Cleared category from URL");
    }

    sessionStorage.removeItem("isNavigating");
    setIsInitialLoad(false);
  }, [isInitialLoad, searchParams, router, pathname]);

  // Sync filters with URL category after initial load
  useEffect(() => {
    if (isInitialLoad) return;

    const categoryFromUrl = searchParams.get("category");
    console.log("Filter sync useEffect - URL category:", categoryFromUrl, "isInitialLoad:", isInitialLoad, "pathname:", pathname);

    if (categoryFromUrl && categories.length > 0) {
      const matchedCategory = categories.find((cat) => cat.toLowerCase() === categoryFromUrl.toLowerCase());
      if (matchedCategory) {
        setSelectedFilters([{ category: "Category", value: matchedCategory }]);
        console.log("Applied filter for category:", matchedCategory);
      } else {
        console.warn(`Category "${categoryFromUrl}" not found in categories:`, categories);
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
      router.replace(`/recipes?category=${encodeURIComponent(filters[0].value)}`, { scroll: false });
      console.log("Updated URL to:", `/recipes?category=${filters[0].value}`);
    } else {
      router.replace("/recipes", { scroll: false });
      console.log("Cleared URL category");
    }
  };

  const handleRemoveFilter = (filterToRemove: FilterItem) => {
    const newFilters = selectedFilters.filter((filter) => !(filter.category === filterToRemove.category && filter.value === filterToRemove.value));
    setSelectedFilters(newFilters);
    if (newFilters.length === 0) {
      router.replace("/recipes", { scroll: false });
      console.log("Removed filter, cleared URL");
    }
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    router.replace("/recipes", { scroll: false });
    console.log("Cleared all filters and URL");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Suspense fallback={null}>
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
            {error ? (
              <div className="text-center py-8">
                <div className="text-red-500 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : (
              <>
                <SelectedFilters selectedFilters={selectedFilters} totalRecipes={recipes.length} onRemoveFilter={handleRemoveFilter} onClearAll={handleClearAllFilters} />
                <RecipeCardGrid recipes={filteredRecipes} isLoading={isLoading} initialRecipeCount={allRecipes.length > 0 ? allRecipes.length : 6} />
              </>
            )}
          </div>
        </main>

        {/* Filter Modal */}
        <FilterControlModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />

        <Footer />
      </Suspense>
    </div>
  );
};

export default Resep;
