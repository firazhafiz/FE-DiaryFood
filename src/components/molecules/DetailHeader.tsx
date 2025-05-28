"use client";

<<<<<<< HEAD
import React from "react";
import Link from "next/link";
import { RecipeDetail } from "@/types/recipe-detail";
import Image from "next/image";

interface DetailHeaderProps {
  recipe: RecipeDetail;
}

const DetailHeader = ({ recipe }: DetailHeaderProps) => {
  const author = {
    name: recipe.user?.name || "Pengguna Tidak Diketahui",
    avatar: recipe.user?.photo || "/assets/images/image_login.jpg",
  };
  console.log(recipe);
  return (
    <div className="mb-8">
      <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
        <Link
          href="/"
          className="hover:text-[color:var(--custom-orange)] transition-colors"
        >
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link
          href="/recipes"
          className="hover:text-[color:var(--custom-orange)] transition-colors"
        >
          Recipes
        </Link>
        <span className="mx-1">/</span>
        <span className="text-[color:var(--custom-orange)] font-semibold">
          {recipe.nama}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
        {recipe.nama}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={author.avatar}
              alt="Author"
              className="w-6 h-6 rounded-full object-cover"
              width={24}
              height={24}
            />
            <span className="font-medium text-gray-700">{author.name}</span>
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            {new Date(recipe.tanggalUnggahan).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
=======
import React, { useState } from "react";
import getRelativeTime from "@/helper/relativeTime";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface DetailHeaderProps {
  recipe: {
    id: number;
    nama: string;
    photoResep: string;
    tanggalUnggahan
: string;
    category: string;
    isFree?: boolean;
    rating?: number;
    user?: {
      name: string;
      photo: string;
    };
    price?: number;
    slug?: string;
  };
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ recipe }) => {
  const [saved, setSaved] = useState(false);
  const [rated, setRated] = useState(false);
  const [saves, setSaves] = useState(recipe.saves);
  const [rating, setRating] = useState(recipe.rating);
  const [ratingCount, setRatingCount] = useState(recipe.ratingCount);
  const router = useRouter();

  const handleSave = () => {
    if (saved) {
      setSaves(saves - 1);
    } else {
      setSaves(saves + 1);
    }
    setSaved(!saved);
  };

  const handleRate = () => {
    if (rated) {
      // If already rated, remove the rating
      const newCount = ratingCount - 1;
      // If this was the only rating, reset to original rating
      if (newCount === 0) {
        setRating(0);
      } else {
        // Otherwise recalculate rating by removing the 5-star rating
        const totalStars = rating * ratingCount;
        const newRating = (totalStars - 5) / newCount;
        setRating(parseFloat(newRating.toFixed(1)));
      }
      setRatingCount(newCount);
      setRated(false);
    } else {
      // Add a new 5-star rating
      const newRating = (rating * ratingCount + 5) / (ratingCount + 1);
      setRating(parseFloat(newRating.toFixed(1)));
      setRatingCount(ratingCount + 1);
      setRated(true);
    }
  };

  // Function to handle share
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleBack =() =>{
    router.back();
  }

  return (
    <div className="mb-8">
     <button
     onClick={handleBack}
  className="px-4 py-1 flex gap-2 w-fit items-center rounded-lg border border-[var(--custom-orange)] text-slate-700 hover:bg-[var(--custom-orange)] hover:text-white transition-colors"
  aria-label="Back to recipes"
>
  <FaArrowLeft />
  Back
</button>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight mt-8">{recipe.nama}</h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={recipe.user?.photo} alt={recipe.nama} className="w-6 h-6 rounded-full object-cover" />
            <span className="font-medium text-gray-700">{recipe.user?.name}</span>
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
            </svg>
            {getRelativeTime(recipe.tanggalUnggahan)}
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">0 comments</span>
          <span>•</span>
          <span className="flex items-center gap-1">0 saves</span>
          <span>•</span>
          <span className="flex items-center gap-1">
<<<<<<< HEAD
            {recipe.rating ? (
              <>
                <span className="text-yellow-400">★</span>
                {recipe.rating.toFixed(1)} ({recipe.reviewers} reviews)
              </>
            ) : (
              <>
                <span className="text-gray-400">★</span>
                0.0 (0 reviews)
              </>
            )}
          </span>
        </div>
        <button className="flex items-center cursor-pointer gap-1 px-3 py-1 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
=======
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {/* {recipe.comments.length} comments */}
          </span>
          <span>•</span>
          <span className={`flex items-center gap-1 cursor-pointer ${saved ? "text-[color:var(--custom-orange)]" : "text-gray-400 hover:text-[color:var(--custom-orange)]"}`} onClick={handleSave}>
            <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            {saves} saves
          </span>
          <span>•</span>
          <span className={`flex items-center gap-1 cursor-pointer ${rated ? "text-[color:var(--custom-orange)]" : "text-gray-500 hover:text-[color:var(--custom-orange)]"}`} onClick={handleRate}>
            <svg width="16" height="16" fill={rated ? "currentColor" : "none"} stroke={rated ? "" : "currentColor"} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {rating} <span className="text-gray-400 font-normal">({ratingCount} reviews)</span>
          </span>
        </div>
        <button className="flex items-center cursor-pointer gap-1 px-3 py-1 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition-colors" onClick={handleShare}>
          <svg className="w-4 h-4 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c
          Share
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden mb-4 w-full max-w-2xl">
<<<<<<< HEAD
        <img
          src={recipe.photoResep}
          alt="Dummy Recipe"
          className="w-full h-72 object-cover"
        />
=======
        <img src={recipe.photoResep} alt={recipe.nama} className="w-full h-72 object-cover" />
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c
      </div>
      <div className="flex gap-8 mb-4 text-center">
        <div>
<<<<<<< HEAD
          <div className="font-bold text-gray-800 text-lg">10 Min</div>
          <div className="text-xs text-gray-500">Prep Time</div>
        </div>
        <div>
          <div className="font-bold text-gray-800 text-lg">20 Min</div>
          <div className="text-xs text-gray-500">Cooking Time</div>
        </div>
        <div>
          <div className="font-bold text-gray-800 text-lg">5 Min</div>
          <div className="text-xs text-gray-500">Serving Time</div>
        </div>
      </div>
      <div className="text-gray-700 text-sm max-w-2xl mb-2">
        This is a dummy description for the recipe.
      </div>
=======
          {/* <div className="font-bold text-gray-800 text-lg">{recipe.prepTime} Min</div> */}
          <div className="text-xs text-gray-500">Prep time</div>
        </div>
        <div>
          {/* <div className="font-bold text-gray-800 text-lg">{recipe.cookTime} Min</div> */}
          <div className="text-xs text-gray-500">Cooking</div>
        </div>
        <div>
          {/* <div className="font-bold text-gray-800 text-lg">{recipe.serveTime} Min</div> */}
          <div className="text-xs text-gray-500">Serving</div>
        </div>
      </div>
      {/* Description */}
      {/* <div className="text-gray-700 text-sm max-w-2xl mb-2">{recipe.description}</div> */}
>>>>>>> 7b7066a501956835e8f7aff0f7f220656402602c
    </div>
  );
};

export default DetailHeader;
