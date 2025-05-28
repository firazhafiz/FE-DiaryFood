"use client";

import React from "react";
import { FiStar } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface CardProps {
  recipe?: Recipe; // Make recipe optional
  loading?: boolean; // Optional loading prop to trigger skeleton
}

const extractNumber = (timeString: string | undefined): number => {
  if (!timeString) return 0;
  const match = timeString.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

function formatTime(time: string | number) {
  let t = String(time)
    .replace(/\s*mins?/i, "")
    .trim();
  return `${t} Min`;
}

function formatRupiah(price?: number) {
  if (!price) return "";
  return "Rp. " + price.toLocaleString("id-ID", { minimumFractionDigits: 0 });
}


const Card: React.FC<CardProps> = ({ recipe, loading = false }) => {
  if (loading || !recipe) {
    return (
      <div className="bg-white rounded-2xl shadow-xs overflow-hidden animate-pulse w-[250px] h-[320px] flex flex-col cursor-pointer">
        {/* Skeleton for image */}
        <div className="w-full h-36 bg-gray-200" />
        {/* Skeleton for content */}
        <div className="flex-1 flex flex-col justify-between p-4 pb-2 h-full">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="w-10 h-4 bg-gray-200 rounded" />
              <div className="w-10 h-4 bg-gray-200 rounded" />
              <div className="w-12 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-1" />
            <div className="w-1/2 h-4 bg-gray-200 rounded mb-5" />
          </div>
          <div className="flex items-center pt-2 border-t border-gray-200 gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const title = recipe.nama || "Resep Tanpa Nama";
  const image = recipe.photoResep || "/default-recipe.jpg";
  const prepTime = extractNumber(recipe.preparationTime);
  const cookTime = extractNumber(recipe.cookingTime);
  const servingTime = extractNumber(recipe.servingTime);
  const totalTime = prepTime + cookTime + servingTime;
  const isFree = true;
  const rating = 4.5;
  const author = {
    name: recipe.user?.name || "Pengguna Tidak Diketahui",
    avatar: recipe.user?.photo || "/default-avatar.jpg",
  };

  const navPath = `/recipe-detail?recipeId=${recipe.id}`;

  const handleClick = () => {
    console.log("Navigating to:", navPath);
    console.log("Recipe ID:", recipe.id);
  };

  return (
    <Link href={navPath} className="block" onClick={handleClick}>
      <div className="bg-white rounded-2xl shadow-xs overflow-hidden hover:shadow-md transition-all duration-300 w-[250px] h-[320px] flex flex-col cursor-pointer hover:scale-[1] active:scale-95">
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        <div className="flex-1 flex flex-col justify-between p-4 pb-2 h-full">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className={isFree ? "text-green-500 font-semibold text-xs" : "text-red-500 font-semibold text-xs"}>{isFree ? "Free" : "Paid"}</span>
              {!isFree && <span className="text-red-500 font-semibold text-xs">{formatRupiah(undefined)}</span>}
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <FiStar className="inline" fill="#FFD700" />
                <span className="text-gray-700 font-medium text-xs">{rating}</span>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-3">
              {title}
            </h3>
            <div className="flex items-center mb-5">
              <span className="font-bold text-[color:var(--custom-orange)] text-base">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>
          <div className="flex items-center pt-2 border-t border-gray-200 gap-2">
            <Image
              src={author.avatar}
              alt={author.name}
              width={1000}
              height={1000}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-gray-800 text-xs font-medium">
              {author.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
