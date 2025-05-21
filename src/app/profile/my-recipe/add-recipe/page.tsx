"use client";

import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

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
}

export default function AddRecipePage() {
  // State for the form
  const [recipeName, setRecipeName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState("");

  // Ingredients state
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: 1, name: "", amount: "" }]);

  // Steps state
  const [steps, setSteps] = useState<Step[]>([{ id: 1, order: 1, description: "" }]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle thumbnail upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding new ingredient
  const addIngredient = () => {
    const newId = ingredients.length > 0 ? Math.max(...ingredients.map((i) => i.id)) + 1 : 1;
    setIngredients([...ingredients, { id: newId, name: "", amount: "" }]);
  };

  // Handle removing ingredient
  const removeIngredient = (id: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  // Handle ingredient change
  const handleIngredientChange = (id: number, field: "name" | "amount", value: string) => {
    setIngredients(ingredients.map((ingredient) => (ingredient.id === id ? { ...ingredient, [field]: value } : ingredient)));
  };

  // Handle adding new step
  const addStep = () => {
    const newOrder = steps.length > 0 ? Math.max(...steps.map((s) => s.order)) + 1 : 1;
    const newId = steps.length > 0 ? Math.max(...steps.map((s) => s.id)) + 1 : 1;
    setSteps([...steps, { id: newId, order: newOrder, description: "" }]);
  };

  // Handle removing step
  const removeStep = (id: number) => {
    if (steps.length > 1) {
      const updatedSteps = steps.filter((step) => step.id !== id);
      // Re-order steps
      const reorderedSteps = updatedSteps.map((step, index) => ({
        ...step,
        order: index + 1,
      }));
      setSteps(reorderedSteps);
    }
  };

  // Handle step change
  const handleStepChange = (id: number, value: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, description: value } : step)));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for submission
    const recipeData = {
      name: recipeName,
      category_id: parseInt(categoryId),
      description,
      ingredients: ingredients.filter((ing) => ing.name.trim() !== ""),
      steps: steps.filter((step) => step.description.trim() !== ""),
      note: showNote ? note : "",
    };

    try {
      // Here you would normally submit the form to your API
      console.log("Submitting recipe:", recipeData);

      // After successful submission, redirect to the recipes list
      // router.push('/profile/my-recipes');
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="container mx-auto  p-8 bg-white">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">Add New Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Recipe Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm mb-4 font-medium text-slate-700">Recipe Thumbnail</label>
              <label htmlFor="file-upload" className="cursor-pointer bg-white/80 rounded-full hover:bg-white transition-colors">
                <div
                  className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg h-64 relative"
                  style={{ backgroundImage: thumbnailPreview ? `url(${thumbnailPreview})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {!thumbnailPreview && (
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
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--custom-orange)] hover:text-orange-500">
                          <span>Upload a file</span>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Recipe Details */}
            <div className="space-y-6">
              <div>
                <label htmlFor="recipe-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Recipe Name
                </label>
                <input
                  type="text"
                  id="recipe-name"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-sm"
                  placeholder="Enter recipe name"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 text-sm py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                  required
                  disabled={isLoading}>
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nama}
                    </option>
                  ))}
                </select>
                {isLoading && <p className="mt-1 text-xs text-slate-500">Loading categories...</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-sm"
                  placeholder="Enter your recipe description"
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-800">Ingredients</h3>
              <button type="button" onClick={addIngredient} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-gray-50 rounded-md hover:bg-orange-100 transition-colors">
                <FaPlus className="mr-1" /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center gap-3">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(ingredient.id, "name", e.target.value)}
                      placeholder="Ingredient name"
                      className="w-full px-3 py-2 border text-sm text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <input
                      type="text"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(ingredient.id, "amount", e.target.value)}
                      placeholder="Amount (e.g., 2 tbsp, 300g)"
                      className="w-full px-3 py-2 text-sm border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent"
                      required
                    />
                  </div>
                  <button type="button" onClick={() => removeIngredient(ingredient.id)} className="text-red-500 hover:text-red-700 p-2" disabled={ingredients.length === 1}>
                    <FaTrash size={16} className={ingredients.length === 1 ? "text-red-300" : ""} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Steps Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-800">Preparation Steps</h3>
              <button type="button" onClick={addStep} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-gray-50 rounded-md hover:bg-orange-100 transition-colors">
                <FaPlus className="mr-1" /> Add Step
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-3">
                  <div className="flex items-start pt-2">
                    <span className="w-6 h-6 rounded-full bg-[var(--custom-orange)] text-white flex items-center justify-center text-sm font-medium">{step.order}</span>
                  </div>
                  <div className="flex-grow">
                    <textarea
                      value={step.description}
                      onChange={(e) => handleStepChange(step.id, e.target.value)}
                      placeholder={`Describe step ${step.order}...`}
                      className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-sm"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="flex items-start pt-2">
                    <button type="button" onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-700 p-1" disabled={steps.length === 1}>
                      <FaTrash size={16} className={steps.length === 1 ? "text-red-300" : ""} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-800">Note (Optional)</h3>
              <button type="button" onClick={() => setShowNote(!showNote)} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-gray-50 rounded-md hover:bg-orange-100 transition-colors">
                {showNote ? <FaTrash className="mr-1" /> : <FaPlus className="mr-1" />}
                {showNote ? "Remove Note" : "Add Note"}
              </button>
            </div>

            {showNote && (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-sm"
                placeholder="Add your recipe notes here..."
                rows={3}
              />
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => window.history.back()} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[var(--custom-orange)] rounded-lg hover:bg-orange-600 transition-colors">
              Add Recipe
            </button>
          </div>
        </form>
    </div>
  );
}
