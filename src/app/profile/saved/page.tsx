import Card from "@/components/atoms/Card";
import { head } from "framer-motion/client";
import Head from "next/head";

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
    <div>
      <Head>
        <title>Saved Recipes</title>
        <meta name="description" content="Saved recipes" />
      </Head>
      <div className=" mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Saved</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })},{" "}
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg">
        {sampleRecipes.map((recipe) => (
          <Card key={recipe.title} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default SavedPage;
