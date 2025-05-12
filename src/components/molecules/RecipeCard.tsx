import React from "react";
import Card from "../atoms/Card";

interface RecipeCardProps {
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
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return <Card {...props} />;
};

export default RecipeCard;
