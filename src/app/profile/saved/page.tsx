"use client";

import Card from "@/components/atoms/Card";

const sampleRecipes = [
  {
    title: "Spaghetti Carbonara",
    image: "/assets/images/image_spaghetti.jpg",
    time: "30",
    category: "Italian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    slug: "spaghetti-carbonara",
  },
  {
    title: "Chicken Curry",
    image: "/assets/images/image_curry.jpg",
    time: "45",
    category: "Indian",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    slug: "chicken-curry",
  },
  {
    title: "Beef Steak",
    image: "/assets/images/image_steak.jpg",
    time: "25",
    category: "American",
    isFree: true,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    slug: "beef-steak",
  },
  {
    title: "Pizza Margherita",
    image: "/assets/images/image_pizza.jpg",
    time: "35",
    category: "Italian",
    isFree: false,
    price: 100000,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    slug: "pizza-margherita",
  },
  {
    title: "Pizza Margherita",
    image: "/assets/images/image_pizza.jpg",
    time: "35",
    category: "Italian",
    isFree: false,
    price: 100000,
    rating: 4.5,
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    slug: "pizza-margherita-2",
  },
];

const SavedPage = () => {
  return (
    <div className="p-8">
      <div className=" mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold text-slate-700">Saved</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search recipes..."
            className="pl-4 pr-10 py-2 text-slate-500 text-sm border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] placeholder:text-slate-500 placeholder:text-sm"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  rounded-lg">
        {sampleRecipes.map((recipe) => (
          <Card key={recipe.title} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default SavedPage;
