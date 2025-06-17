"use client";

import { useEffect, useState, useRef } from "react";
import { FaPlus, FaTrash, FaArrowLeft, FaTimes, FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Cookies from "js-cookie";
import { config } from "@/config";


// i
interface Ingredient {
  id: number;
  name: string;
  amount: string;
}

interface Step {
  id: number;
  order: number;
  description: string;
}

interface Kategori {
  id: number;
  nama: string;
  parentId: number | null;
}

interface FormData {
  recipeName: string;
  categoryId: string[];
  thumbnail: File | null;
  description: string;
  thumbnailPreview: string | null;
  preparationTime: string;
  cookingTime: string;
  servingTime: string;
  note: string | undefined;
  ingredients: Ingredient[];
  steps: Step[];
}

const fetcher = async (url: string) => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return (await response.json()).data;
};

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const maxWidth = 800;
    const maxHeight = 800;
    const quality = 0.7;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context not available"));

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export default function AddRecipePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    recipeName: "",
    categoryId: [],
    thumbnail: null,
    description: "",
    thumbnailPreview: null,
    preparationTime: "",
    cookingTime: "",
    servingTime: "",
    note: "",
    ingredients: [{ id: 1, name: "", amount: "" }],
    steps: [{ id: 1, order: 1, description: "" }],
  });
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [mainCategoryDropdownOpen, setMainCategoryDropdownOpen] = useState(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
  const mainCategoryDropdownRef = useRef<HTMLDivElement>(null);
  const subCategoryDropdownRef = useRef<HTMLDivElement>(null);

  const { data: categoriesData } = useSWR(`${config.apiUrl}/category`, fetcher);
  const { data: userData } = useSWR(`${config.apiUrl}/profile`, fetcher);

  useEffect(() => {
    if (userData) {
      setUserId(userData.id);
    }
  }, [userData]);

  useEffect(() => {
    if (categoriesData) {
      console.log("categoriesData", categoriesData);
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (showSuccessModal && modalButtonRef.current) {
      modalButtonRef.current.focus();
    }
  }, [showSuccessModal]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mainCategoryDropdownRef.current && !mainCategoryDropdownRef.current.contains(event.target as Node)) {
        setMainCategoryDropdownOpen(false);
      }
      if (subCategoryDropdownRef.current && !subCategoryDropdownRef.current.contains(event.target as Node)) {
        setSubCategoryDropdownOpen(false);
      }
    }
    if (mainCategoryDropdownOpen || subCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mainCategoryDropdownOpen, subCategoryDropdownOpen]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError("Image size must be less than 10MB");
        return;
      }
      try {
        const compressed = await compressImage(file);
        updateFormData({ thumbnail: file, thumbnailPreview: compressed });
      } catch (error) {
        setSubmitError("Failed to process image");
        console.error("Image compression error:", error);
      }
    }
  };

  const removeThumbnail = () => {
    updateFormData({ thumbnail: null, thumbnailPreview: null });
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const addIngredient = () => {
    const newId = formData.ingredients.length > 0 ? Math.max(...formData.ingredients.map((i) => i.id)) + 1 : 1;
    updateFormData({
      ingredients: [...formData.ingredients, { id: newId, name: "", amount: "" }],
    });
  };

  const removeIngredient = (id: number) => {
    if (formData.ingredients.length > 1) {
      updateFormData({
        ingredients: formData.ingredients.filter((ingredient) => ingredient.id !== id),
      });
    }
  };

  const handleIngredientChange = (id: number, field: "name" | "amount", value: string) => {
    updateFormData({
      ingredients: formData.ingredients.map((ingredient) => (ingredient.id === id ? { ...ingredient, [field]: value } : ingredient)),
    });
  };

  const addStep = () => {
    const newOrder = formData.steps.length > 0 ? Math.max(...formData.steps.map((s) => s.order)) + 1 : 1;
    const newId = formData.steps.length > 0 ? Math.max(...formData.steps.map((s) => s.id)) + 1 : 1;
    updateFormData({
      steps: [...formData.steps, { id: newId, order: newOrder, description: "" }],
    });
  };

  const removeStep = (id: number) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((step) => step.id !== id);
      const reorderedSteps = updatedSteps.map((step, index) => ({
        ...step,
        order: index + 1,
      }));
      updateFormData({ steps: reorderedSteps });
    }
  };

  const handleStepChange = (id: number, value: string) => {
    updateFormData({
      steps: formData.steps.map((step) => (step.id === id ? { ...step, description: value } : step)),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const token = Cookies.get("token");
    if (!token) {
      setSubmitError("No token found. Please log in.");
      router.push("/login");
      return;
    }

    if (!userId) {
      setSubmitError("User ID not found. Please try logging in again.");
      return;
    }

    const filteredIngredients = formData.ingredients.filter((ing) => ing.name.trim() !== "");
    const filteredSteps = formData.steps.filter((step) => step.description.trim() !== "");

    if (!formData.recipeName || !formData.categoryId || !formData.description) {
      setSubmitError("Please fill in required fields: recipe name, category, and description.");
      return;
    }

    const body = {
      nama: formData.recipeName,
      photoResep: formData.thumbnailPreview || undefined,
      kategoriId: formData.categoryId.map(Number),
      description: formData.description,
      preparationTime: formData.preparationTime || undefined,
      cookingTime: formData.cookingTime || undefined,
      servingTime: formData.servingTime || undefined,
      note: formData.note || undefined,
      userId,
      bahan:
        filteredIngredients.length > 0
          ? filteredIngredients.map((ing) => ({
              nama: ing.name,
              jumlah: ing.amount,
            }))
          : undefined,
      langkahPembuatan:
        filteredSteps.length > 0
          ? filteredSteps.map((step) => ({
              urutan: step.order,
              deskripsi: step.description,
            }))
          : undefined,
    };

    const bodySize = new Blob([JSON.stringify(body)]).size;
    if (bodySize > 10 * 1024 * 1024) {
      setSubmitError("Payload too large. Try a smaller image.");
      return;
    }

    console.log("Request body:", body);

    try {
      const response = await fetch(`${config.apiUrl}/profile/recipes`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create recipe (status: ${response.status})`);
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Error submitting recipe:", error);
      setSubmitError(error.message || "Failed to create recipe");
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    router.push("/profile/my-recipe");
  };

  const isSubmitDisabled = !userId || !formData.recipeName || !formData.categoryId || !formData.description;

  const mainCategoryNames = ["Main Course", "Allergies", "Internasional Cuisine", "Regional Cuisine", "Goals", "Preparation Time", "Dietary Pattern"];

  const mainCategories = categories
    .filter((cat) => cat.parentId === null && mainCategoryNames.includes(cat.nama))
    .sort((a, b) => {
      const indexA = mainCategoryNames.indexOf(a.nama);
      const indexB = mainCategoryNames.indexOf(b.nama);
      return indexA - indexB;
    });

  const handleCategoryChange = (id: string) => {
    if (formData.categoryId.includes(id)) {
      // Remove the category and its sub-categories
      const subCategoryIds = categories.filter((cat) => cat.parentId === Number(id)).map((cat) => String(cat.id));
      const newCatIds = formData.categoryId.filter((catId) => catId !== id && !subCategoryIds.includes(catId));
      updateFormData({ categoryId: newCatIds });
    } else {
      // Add the category
      updateFormData({ categoryId: [...formData.categoryId, id] });
    }
  };

  const handleSubCategoryChange = (id: string, parentId: number | null) => {
    if (formData.categoryId.includes(id)) {
      updateFormData({
        categoryId: formData.categoryId.filter((catId) => catId !== id),
      });
    } else {
      if (parentId && !formData.categoryId.includes(String(parentId))) {
        updateFormData({
          categoryId: [...formData.categoryId, String(parentId), id],
        });
      } else {
        updateFormData({ categoryId: [...formData.categoryId, id] });
      }
    }
  };

  const selectedCategories = mainCategories
    .filter((cat) => formData.categoryId.includes(String(cat.id)))
    .map((cat) => cat.nama)
    .join(", ");

  const selectedSubCategories = categories
    .filter((cat) => formData.categoryId.includes(String(cat.id)) && cat.parentId !== null)
    .map((cat) => cat.nama)
    .join(", ");

  return (
    <div className="container mx-auto p-8 bg-white min-h-screen">
      {submitError && <div className="text-center py-4 text-red-500">{submitError}</div>}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recipe Created</h2>
            <p className="text-gray-600 mb-6">Your recipe has been successfully created!</p>
            <button
              ref={modalButtonRef}
              onClick={closeModal}
              className="w-full bg-[var(--custom-orange)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-200">
              Close
            </button>
          </div>
        </div>
      )}
      <div>
        <Link href="/profile/my-recipe" className="inline-flex items-center gap-2 backdrop-blur-lg bg-white/30 border border-white/50 mb-6 py-2 rounded-xl text-slate-700 hover:bg-white/40 transition-all duration-300">
          <FaArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">Add New Recipe</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs mb-4 font-medium text-slate-700">Recipe Thumbnail</label>
            <label htmlFor="file-upload" className="cursor-pointer bg-white/80 rounded-lg hover:bg-gray-50 transition-colors">
              <div
                className="relative flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg h-64 overflow-hidden"
                style={{
                  backgroundImage: formData.thumbnailPreview ? `url(${formData.thumbnailPreview})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
                {formData.thumbnailPreview && (
                  <button type="button" onClick={removeThumbnail} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors" title="Remove image">
                    <FaTimes size={16} />
                  </button>
                )}
                {!formData.thumbnailPreview && (
                  <div className="space-y-1 text-center">
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleThumbnailChange} />
                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-xs text-slate-600 justify-center">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--custom-orange)] hover:text-orange-500">Upload a file</span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="recipe-name" className="block text-xs font-medium text-slate-700 mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                id="recipe-name"
                value={formData.recipeName}
                onChange={(e) => updateFormData({ recipeName: e.target.value })}
                className="w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                placeholder="Enter recipe name"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
              <div className="relative" ref={mainCategoryDropdownRef}>
                <div
                  className={`w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-left flex justify-between items-center cursor-pointer ${
                    mainCategoryDropdownOpen ? "ring-2 ring-[var(--custom-orange)]" : ""
                  }`}
                  onClick={() => setMainCategoryDropdownOpen((open) => !open)}>
                  <span className={selectedCategories ? "font-normal text-slate-700" : "font-normal text-slate-400"}>{selectedCategories || "Select category (multiple)"}</span>
                  <FaAngleDown className={`w-4 h-4 ml-2 transition-transform ${mainCategoryDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                </div>
                {mainCategoryDropdownOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in">
                    {mainCategories.length === 0 && <div className="px-3 py-2 text-xs text-slate-400">No categories available</div>}
                    {mainCategories.map((category) => (
                      <label key={category.id} className="flex items-center px-3 py-2 hover:bg-orange-50 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={formData.categoryId.includes(String(category.id))}
                          onChange={() => handleCategoryChange(String(category.id))}
                          className="mr-2 w-4 h-4 accent-[var(--custom-orange)] rounded bg-[var(--custom-orange)]"
                        />
                        <span className="text-black">{category.nama}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Sub Category</label>
              <div className="relative" ref={subCategoryDropdownRef}>
                <div
                  className={`w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-left flex justify-between items-center cursor-pointer ${
                    subCategoryDropdownOpen ? "ring-2 ring-[var(--custom-orange)]" : ""
                  }`}
                  onClick={() => setSubCategoryDropdownOpen((open) => !open)}>
                  <span className={selectedSubCategories ? "font-normal text-slate-700" : "font-normal text-slate-400"}>{selectedSubCategories || "Select sub category (multiple)"}</span>
                  <FaAngleDown className={`w-4 h-4 ml-2 transition-transform ${subCategoryDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                </div>
                {subCategoryDropdownOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in">
                    {mainCategories
                      .filter((cat) => formData.categoryId.includes(String(cat.id)))
                      .map((parent) => (
                        <div key={parent.id}>
                          <div className="px-3 py-2 text-xs font-semibold text-slate-700">{parent.nama}</div>
                          {categories
                            .filter((sub) => sub.parentId === parent.id)
                            .map((sub) => (
                              <label key={sub.id} className="flex items-center px-6 py-2 hover:bg-orange-50 cursor-pointer text-xs">
                                <input
                                  type="checkbox"
                                  checked={formData.categoryId.includes(String(sub.id))}
                                  onChange={() => handleSubCategoryChange(String(sub.id), parent.id)}
                                  className="mr-2 w-4 h-4 accent-[var(--custom-orange)] rounded bg-[var(--custom-orange)]"
                                />
                                <span className="text-black">{sub.nama}</span>
                              </label>
                            ))}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                className="w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                placeholder="Enter description"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-8 mb-4">
            <div>
              <label htmlFor="preparationTime" className="block text-xs font-medium text-slate-700 mb-1">
                Preparation time
              </label>
              <input
                type="text"
                id="preparationTime"
                value={formData.preparationTime}
                onChange={(e) => updateFormData({ preparationTime: e.target.value })}
                className="w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                placeholder="Enter prep time"
              />
            </div>
            <div>
              <label htmlFor="cookingTime" className="block text-xs font-medium text-slate-700 mb-1">
                Cooking time
              </label>
              <input
                type="text"
                id="cookingTime"
                value={formData.cookingTime}
                onChange={(e) => updateFormData({ cookingTime: e.target.value })}
                className="w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                placeholder="Enter cooking time"
              />
            </div>
            <div>
              <label htmlFor="servingTime" className="block text-xs font-medium text-slate-700 mb-1">
                Serving time
              </label>
              <input
                type="text"
                id="servingTime"
                value={formData.servingTime}
                onChange={(e) => updateFormData({ servingTime: e.target.value })}
                className="w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                placeholder="Enter serving time"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-medium text-slate-800">Ingredients</h3>
            <button type="button" onClick={addIngredient} className="inline-flex items-center px-3 py-1 text-xs font-medium text-[var(--custom-orange)] bg-gray-50 rounded-md hover:bg-orange-100 transition-colors">
              <FaPlus className="mr-1" /> Add Ingredient
            </button>
          </div>

          <div className="space-y-3">
            {formData.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center gap-3">
                <div className="flex items-start pt-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--custom-orange)] text-white flex items-center justify-center text-xs font-medium">{ingredient.id}</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(ingredient.id, "name", e.target.value)}
                    placeholder="Ingredient name"
                    className="w-full px-3 py-2 border text-xs text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                    required
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(ingredient.id, "amount", e.target.value)}
                    placeholder="Amount (e.g., 2 tbsp, 300g)"
                    className="w-full px-3 py-2 text-xs border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                    required
                  />
                </div>
                <button type="button" onClick={() => removeIngredient(ingredient.id)} className="text-red-500 hover:text-red-700 p-2" disabled={formData.ingredients.length === 1}>
                  <FaTrash size={16} className={formData.ingredients.length === 1 ? "text-red-300" : ""} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-medium text-slate-800">Preparation Steps</h3>
            <button type="button" onClick={addStep} className="inline-flex items-center px-3 py-1 text-xs font-medium text-[var(--custom-orange)] bg-gray-50 rounded-md hover:bg-orange-100 transition-colors">
              <FaPlus className="mr-1" /> Add Step
            </button>
          </div>

          <div className="space-y-4">
            {formData.steps.map((step) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex items-start pt-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--custom-orange)] text-white flex items-center justify-center text-xs font-medium">{step.order}</span>
                </div>
                <div className="flex-grow">
                  <textarea
                    value={step.description}
                    onChange={(e) => handleStepChange(step.id, e.target.value)}
                    placeholder={`Describe step ${step.order}...`}
                    className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-xs"
                    rows={2}
                    required
                  />
                </div>
                <div className="flex items-start pt-2">
                  <button type="button" onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-700 p-1" disabled={formData.steps.length === 1}>
                    <FaTrash size={16} className={formData.steps.length === 1 ? "text-red-300" : ""} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <label htmlFor="note" className="block text-xs font-medium text-slate-700 mb-1">
              Note (optional)
            </label>
            <input
              type="text"
              id="note"
              value={formData.note ?? ""}
              onChange={(e) => updateFormData({ note: e.target.value || undefined })}
              className="w-full px-3 py-2 border text-slate-700 text-xs border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
              placeholder="Enter note"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => router.push("/profile/my-recipe")} className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`px-4 py-2 text-xs font-medium text-white rounded-lg transition-colors ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--custom-orange)] hover:bg-orange-600"}`}>
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
