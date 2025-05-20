"use client";

import Image from "next/image";
import Link from "next/link";
import { FaClock, FaStar, FaLock, FaBookmark } from "react-icons/fa";
import { useState } from "react";

const sampleRecipes = [
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
    slug: "chicken-curry",
  },
  {
    title: "Beef Steak",
    image: "/assets/images/image_steak.jpg",
    time: "25",
    category: "American",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    slug: "beef-steak",
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
    slug: "pizza-margherita",
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
    slug: "pizza-margherita-2",
  },
];

const SavedPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const handleRemoveSave = (slug: string) => {
    setSelectedRecipe(slug);
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    // TODO: Implement remove from saved list logic
    console.log("Removing recipe:", selectedRecipe);
    setShowConfirmModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold text-slate-700">Saved</h1>
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
      </div>
      <div className="space-y-4">
        {sampleRecipes.map((recipe) => (
          <div key={recipe.slug} className="bg-white/60 rounded-3xl shadow-sm border-2 border-white/60 p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <div className="relative w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                {!recipe.isFree && (
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                    <FaLock className="text-[#FF7A5C] w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{recipe.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{recipe.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="w-4 h-4" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>
                    <button onClick={() => handleRemoveSave(recipe.slug)} className="text-[#FF7A5C] hover:text-[#ff6b4a] transition-colors cursor-pointer">
                      <FaBookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <FaClock className="w-4 h-4" />
                    <span>{recipe.time} mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={recipe.author.avatar} alt={recipe.author.name} width={20} height={20} className="rounded-full" />
                    <span>{recipe.author.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {!recipe.isFree && <div className="text-[#FF7A5C] font-semibold">Rp {recipe.price?.toLocaleString()}</div>}
                  <Link href={`/detail_resep?recipe=${recipe.slug}`} className="text-[#FF7A5C] hover:text-[#ff6b4a] font-medium text-sm">
                    View Recipe →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Remove from Saved</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove this recipe from your saved list?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button onClick={confirmRemove} className="px-4 py-2 text-sm font-medium text-white bg-[#FF7A5C] hover:bg-[#ff6b4a] rounded-lg">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPage;
