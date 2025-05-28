"use client";

import React, { useState } from "react";
import getRelativeTime from "@/helper/relativeTime";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DefaultProfile } from "../../../public/assets";

interface DetailHeaderProps {
  recipe: {
    id: number;
    nama: string;
    photoResep: string;
    tanggalUnggahan: string;
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

const DetailHeader = ({ recipe }: DetailHeaderProps) => {
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

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleBack}
        className="px-4 py-1 flex gap-2 w-fit items-center rounded-lg border border-[var(--custom-orange)] text-slate-700 hover:bg-[var(--custom-orange)] hover:text-white transition-colors"
        aria-label="Back to recipes">
        <FaArrowLeft />
        Back
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight mt-8">{recipe.nama}</h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src={recipe.user?.photo ? recipe.user.photo : DefaultProfile} alt={recipe.nama} className="w-6 h-6 rounded-full object-cover" width={100} height={100} />
            <span className="font-medium text-gray-700">{recipe.user?.name}</span>
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            {new Date(recipe.tanggalUnggahan).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">0 comments</span>
          <span>•</span>
          <span className="flex items-center gap-1">0 saves</span>
          <span>•</span>
          <span className="flex items-center gap-1">
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
        <button className="flex items-center cursor-pointer gap-1 px-3 py-1 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition-colors">Share</button>
      </div>
      <div className="rounded-2xl overflow-hidden mb-4 w-full max-w-2xl">
        <img src={recipe.photoResep} alt="Dummy Recipe" className="w-full h-72 object-cover" />
      </div>
      <div className="flex gap-8 mb-4 text-center">
        <div>
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
      <div className="text-gray-700 text-sm max-w-2xl mb-2">This is a dummy description for the recipe.</div>
    </div>
  );
};

export default DetailHeader;
