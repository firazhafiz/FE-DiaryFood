"use client";

import React, { useState } from "react";

interface Ingredient {
  text: string;
  checked: boolean;
}

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ ingredients: initialIngredients }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);

  const toggleCheck = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      checked: !newIngredients[index].checked,
    };
    setIngredients(newIngredients);
  };

  return (
    <div className="min-h-auto w-full">
      <div className=" rounded-2xl p-6 ">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
        <ul className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" checked={ingredient.checked} onChange={() => toggleCheck(index)} className="sr-only peer" />
                  <div className="w-5 h-5 border-2 border-slate-700 rounded-md peer-checked:border-[color:var(--custom-orange)] peer-checked:bg-[color:var(--custom-orange)] transition-colors"></div>
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className={`text-gray-700 text-sm ${ingredient.checked ? "line-through text-gray-400" : ""}`}>{ingredient.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsSection;
