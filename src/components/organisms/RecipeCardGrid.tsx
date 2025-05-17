import React from "react";
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

interface RecipeCardGridProps {
  recipes: Recipe[];
}

const RecipeCardGrid: React.FC<RecipeCardGridProps> = ({ recipes }) => {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-8 justify-start">
      {recipes.map((recipe, idx) => (
        <div key={idx} className="mb-4">
          <Card {...recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeCardGrid;
