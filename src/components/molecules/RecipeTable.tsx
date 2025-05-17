import React, { useState, useRef, useEffect } from "react";
import { FaEllipsis, FaEye, FaTrash } from "react-icons/fa6";
import { CatDessert } from "../../../public/assets";

interface Recipe {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft";
}

interface RecipeTableProps {
  recipes: Recipe[];
  onShow?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const RecipeTable: React.FC<RecipeTableProps> = ({ recipes, onShow, onDelete }) => {
  return (
    <div className="w-full">
      <div className="rounded-xl overflow-hidden">
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
    </div>
  );
};

interface RecipeRowProps extends Recipe {
  index: number;
  onDelete?: (id: string) => void;
  onShow?: (id: string) => void;
}

const RecipeRow: React.FC<RecipeRowProps> = ({ id, title, author, category, status, index, onDelete, onShow }) => {
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
    <div id={id} className="grid grid-cols-5 items-center py-4 px-6 border-b bg-white/60 rounded-xl   border-white/60 hover:bg-gray-50">
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
          <FaEllipsis />
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
