"use client";

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
        <button className="flex items-center cursor-pointer gap-1 px-3 py-1 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
          Share
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden mb-4 w-full max-w-2xl">
        <img
          src={recipe.photoResep}
          alt="Dummy Recipe"
          className="w-full h-72 object-cover"
        />
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
      <div className="text-gray-700 text-sm max-w-2xl mb-2">
        This is a dummy description for the recipe.
      </div>
    </div>
  );
};

export default DetailHeader;
