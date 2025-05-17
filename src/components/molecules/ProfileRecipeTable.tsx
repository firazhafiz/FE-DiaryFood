"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisH, FaEye, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { CatDessert } from "../../../public/assets";

interface Recipe {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft";
}

interface ProfileRecipeTableProps {
  recipes: Recipe[];
  onShow?: (id: string) => void;
  onDelete?: (id: string) => void;
}

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

export const ProfileRecipeTable: React.FC<ProfileRecipeTableProps> = ({ recipes, onShow, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-6">
        <button className="bg-[var(--custom-orange)] text-white px-4 py-1 rounded-md text-xs cursor-pointer" onClick={() => setIsModalOpen(true)}>
          + Add Recipe
        </button>
        <div className="flex items-center gap-4 ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="pl-4 pr-10 py-2 text-slate-500 text-sm border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] placeholder:text-slate-500 placeholder:text-sm"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          <select className="px-4 py-2 border-2 border-white rounded-md focus:border-[var(--custom-orange)] cursor-pointer focus:outline-none text-slate-500 focus:ring-blue-500 placeholder:text-sm text-sm">
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      <div className="rounded-xl ">
        <div className="grid grid-cols-5 py-4 px-6 border-b">
          <p className="text-slate-700 font-medium text-sm col-span-2">Recipe</p>
          <p className="text-slate-700 font-medium text-sm">Category</p>
          <p className="text-slate-700 font-medium text-sm">Status</p>
          <p className="text-slate-700 font-medium text-sm text-right pr-3">Actions</p>
        </div>

        <div className="flex flex-col gap-4">
          {recipes.map((recipe, index) => (
            <RecipeRow key={recipe.id} {...recipe} index={index + 1} onDelete={onDelete} onShow={onShow} />
          ))}
        </div>
      </div>

      {isModalOpen && <AddRecipeModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

interface RecipeRowProps extends Recipe {
  index: number;
  onDelete?: (id: string) => void;
  onShow?: (id: string) => void;
}

const RecipeRow: React.FC<RecipeRowProps> = ({ id, title, author, category, status, onDelete, onShow }) => {
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
    <div id={id} className="grid grid-cols-5 items-center py-4 px-6 border-b bg-white/60 rounded-xl border-white/60 hover:bg-gray-50">
      <div className="flex items-center gap-3 col-span-2">
        <img src={CatDessert} alt="thumbnail" className="w-10 h-10 rounded-lg object-cover" />
        <div>
          <p className="text-slate-700 font-medium">{title}</p>
          <p className="text-slate-500 text-xs">Chef {author}</p>
        </div>
      </div>

      <div>
        <p className="text-slate-700">{category}</p>
      </div>

      <div>
        <span className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{status}</span>
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
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleShow}>
                    <FaEye className="text-slate-500" />
                    <span>Show</span>
                  </button>
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

interface AddRecipeModalProps {
  onClose: () => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ onClose }) => {
  // State for the form
  const [recipeName, setRecipeName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Ingredients state
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: 1, name: "", amount: "" }]);

  // Steps state
  const [steps, setSteps] = useState<Step[]>([{ id: 1, order: 1, description: "" }]);

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for submission
    const recipeData = {
      name: recipeName,
      category_id: parseInt(categoryId),
      ingredients: ingredients.filter((ing) => ing.name.trim() !== ""),
      steps: steps.filter((step) => step.description.trim() !== ""),
    };

    // Here you would normally submit the form to your API
    console.log("Submitting recipe:", recipeData);

    // Close the modal
    onClose();
  };

  return (
    <div className="absolute top-24 left-1/2 -translate-x-1/2  bg-opacity-30 flex items-center justify-center z-50 w-full h-full  ">
      <div className="bg-white rounded-xl p-6 w-[900px] max-h-[90vh] overflow-y-auto ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Add New Recipe</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6  ">
          {/* Basic Recipe Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm mb-4 font-medium text-slate-700">Recipe Thumbnail</label>
              <label htmlFor="file-upload" className="cursor-pointer bg-white/80   rounded-full hover:bg-white transition-colors">
                <div
                  className="flex justify-center  items-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg h-64 relative"
                  style={{ backgroundImage: thumbnailPreview ? `url(${thumbnailPreview})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {!thumbnailPreview && (
                    <div className="space-y-1 text-center">
                      <input id="file-upload" name="file-upload" type="file" className="sr-only " accept="image/*" onChange={handleThumbnailChange} />
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
                  {thumbnailPreview && (
                    <div className="absolute bottom-2 right-2">
                      <FaEdit className="text-slate-700" />
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleThumbnailChange} />
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Recipe Details */}
            <div className="pt-7 md:col-span-1 space-y-7">
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
                  required>
                  <option value="">Select category</option>
                  <option value="1">Appetizer</option>
                  <option value="2">Main Course</option>
                  <option value="3">Dessert</option>
                  <option value="4">Beverage</option>
                  <option value="5">Snack</option>
                </select>
              </div>
              <div>
                <label htmlFor="recipe-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>

                <textarea
                  onChange={(e) => setRecipeName(e.target.value)}
                  name="recipe-name"
                  id="recipe-name"
                  placeholder="Enter your recipe description"
                  required
                  className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent text-sm"></textarea>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-800">Ingredients</h3>
              <button type="button" onClick={addIngredient} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-orange-50 rounded-md hover:bg-orange-100 transition-colors">
                <FaPlus className="mr-1" /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
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
              <button type="button" onClick={addStep} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-orange-50 rounded-md hover:bg-orange-100 transition-colors">
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
                      className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2  text-sm focus:ring-[var(--custom-orange)] focus:border-transparent"
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

          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-800">Note (Optional)</h3>

              {showNote ? (
                <button type="button" onClick={() => setShowNote(!showNote)} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-orange-50 rounded-md hover:bg-orange-100 transition-colors">
                  <FaTrash className="mr-1" />
                </button>
              ) : (
                <button type="button" onClick={() => setShowNote(!showNote)} className="inline-flex items-center px-3 py-1 text-sm font-medium text-[var(--custom-orange)] bg-orange-50 rounded-md hover:bg-orange-100 transition-colors">
                  <FaPlus className="mr-1" />
                </button>
              )}
            </div>

            {showNote && (
              <textarea
                name="note"
                id="note"
                className="w-full px-3 py-2 border text-slate-700 border-slate-300 rounded-lg focus:outline-none focus:ring-2 text-sm focus:ring-[var(--custom-orange)] focus:border-transparent"
                placeholder="Add your recipe notes here..."></textarea>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[var(--custom-orange)] rounded-lg hover:bg-orange-600 transition-colors">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
