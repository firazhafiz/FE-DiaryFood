"use client";

import React from "react";
import Card from "../atoms/Card";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  loading?: boolean; // Optional loading prop
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, loading }) => {
  return <Card recipe={recipe} loading={loading} />;
};

export default RecipeCard;
