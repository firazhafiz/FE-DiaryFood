import React from "react";

const categories = [
  { name: "Breakfast", icon: "🥞", href: "/breakfast", count: 1 },
  { name: "Lunch", icon: "🍽️", href: "/lunch", count: 1 },
  { name: "Dinner", icon: "🍲", href: "/dinner", count: 1 },
  { name: "Dessert", icon: "🍰", href: "/dessert", count: 1 },
  { name: "Snacks", icon: "🍪", href: "/snacks", count: 1 },
  { name: "Drinks", icon: "🥤", href: "/drinks", count: 1 },
];

const CategoryBoxes: React.FC = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[320px] z-30 w-full flex justify-center">
      <div className="flex flex-row gap-4 md:gap-8 px-2 md:px-0">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:bg-gray-100 border border-gray-100 min-w-[120px] min-h-[120px] transition-all duration-200 text-center"
            style={{ marginTop: "-2rem" }}
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="text-sm font-semibold">{category.name}</span>
            <span className="text-xs text-gray-500">
              {category.count} Recipes
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryBoxes;
