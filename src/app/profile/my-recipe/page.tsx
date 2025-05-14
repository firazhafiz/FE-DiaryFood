"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { IlustrasiCooking } from "../../../../public/assets";
import Image from "next/image";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface Recipe {
  id: string;
  title: string;
  category: string;
  date: string;
  status: "published" | "draft" | "pending";
  views: number;
  likes: number;
}

const MyRecipePage = () => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    publishedRecipes: 0,
    totalViews: 0,
    totalLikes: 0,
    recipeCategories: [] as { category: string; count: number }[],
    recipeViews: [] as { date: string; views: number }[],
  });

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/recipes/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    // Fetch recipes
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/my-recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchStats();
    fetchRecipes();
  }, []);

  // Chart data for recipe statistics
  const recipeChartData = {
    labels: ["Total Recipes", "Published", "Draft"],
    datasets: [
      {
        label: "Recipe Statistics",
        data: [stats.totalRecipes, stats.publishedRecipes, stats.totalRecipes - stats.publishedRecipes],
        backgroundColor: [
          "rgba(255, 114, 94, 0.8)", // Custom orange
          "rgba(34, 197, 94, 0.8)", // Green
          "rgba(234, 179, 8, 0.8)", // Yellow
        ],
        borderColor: ["rgb(255, 114, 94)", "rgb(34, 197, 94)", "rgb(234, 179, 8)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for recipe views
  const viewsChartData = {
    labels: stats.recipeViews.map((item) => item.date),
    datasets: [
      {
        label: "Recipe Views",
        data: stats.recipeViews.map((item) => item.views),
        borderColor: "rgb(255, 114, 94)",
        backgroundColor: "rgba(255, 114, 94, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--custom-orange)]">My Recipes</h1>
        <p className="text-gray-500">
          <span className="font-semibold">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span>, {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Welcome Section */}
      <div className="flex justify-center items-center gap-8 bg-white rounded-lg p-8 w-full">
        <div className="w-2/3">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome to Your Recipe Dashboard!</h1>
          <p className="text-gray-500">Manage and track your recipes' performance here.</p>
        </div>
        <div className="w-1/3">
          <Image src={IlustrasiCooking} alt="ilustrasi cooking" className="w-[300px] object-cover" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recipe Statistics Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recipe Statistics</h3>
          <div className="h-[300px]">
            <Bar data={recipeChartData} options={chartOptions} />
          </div>
        </div>

        {/* Recipe Views Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recipe Views</h3>
          <div className="h-[300px]">
            <Line data={viewsChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recipes List Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Recipes</h2>
          <button className="bg-[#FF7A5C] text-white px-4 py-2 rounded-md hover:bg-[#ff6b4a] transition-colors">Add New Recipe</button>
        </div>
        {recipes.length === 0 ? (
          <p className="text-gray-500">No recipes found. Start by adding your first recipe!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recipe.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recipe.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${recipe.status === "published" ? "bg-green-100 text-green-800" : recipe.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>
                        {recipe.status.charAt(0).toUpperCase() + recipe.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recipe.views}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recipe.likes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipePage;
