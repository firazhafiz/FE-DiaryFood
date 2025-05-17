"use client";

import React, { useRef } from "react";
import Card from "../atoms/Card";

interface Recipe {
  title: string;
  image: string;
  time: string;
  category: string;
  isFree?: boolean;
  rating?: number;
  author?: {
    name: string;
    avatar: string;
  };
  price?: number;
  slug?: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "right" ? clientWidth * 0.8 : -clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      {/* Arrow left */}
      {recipes.length > 4 && (
        <button
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow rounded-full p-1 border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 ease-in-out flex items-center justify-center"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <svg
            width={18}
            height={18}
            fill="none"
            stroke="#ff725e"
            strokeWidth={2.5}
          >
            <path
              d="M12 15l-5-5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Card slider */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 py-6 scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
      >
        {recipes.map((recipe, index) => (
          <div key={index} className="flex-shrink-0">
            <Card {...recipe} />
          </div>
        ))}
      </div>

      {/* Arrow right */}
      {recipes.length > 4 && (
        <button
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white shadow rounded-full p-1 border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out flex items-center justify-center"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <svg
            width={18}
            height={18}
            fill="none"
            stroke="#ff725e"
            strokeWidth={2.5}
          >
            <path
              d="M6 5l5 5-5 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RecipeList;
