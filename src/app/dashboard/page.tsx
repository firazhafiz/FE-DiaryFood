"use client";

import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import {
  IlustrasiCategories,
  IlustrasiCooking,
  IlustrasiRecipes,
  IlustrasiUsers,
} from "../../../public/assets/index";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Recipe {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  status: "published" | "draft";
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    publishedRecipes: 0,
    userGrowth: [] as { date: string; count: number }[],
    recipeCategories: [] as { category: string; count: number }[],
  });
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    // Fetch pending recipes
    const fetchPendingRecipes = async () => {
      try {
        const response = await fetch("/api/recipes?status=pending");
        const data = await response.json();
        setPendingRecipes(data);
      } catch (error) {
        console.error("Error fetching pending recipes:", error);
      }
    };

    fetchStats();
    fetchPendingRecipes();
  }, []);

  const handleApprove = async (recipeId: string) => {
    try {
      await fetch(`/api/recipes/${recipeId}/approve`, {
        method: "POST",
      });
      setPendingRecipes(
        pendingRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error approving recipe:", error);
    }
  };

  const handleReject = async (recipeId: string) => {
    try {
      await fetch(`/api/recipes/${recipeId}/reject`, {
        method: "POST",
      });
      setPendingRecipes(
        pendingRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error rejecting recipe:", error);
    }
  };

  // Chart data for recipe statistics
  const recipeChartData = {
    labels: ["Total Recipes", "Published", "Pending"],
    datasets: [
      {
        label: "Recipe Statistics",
        data: [
          stats.totalRecipes,
          stats.publishedRecipes,
          pendingRecipes.length,
        ],
        backgroundColor: [
          "rgba(0, 10, 50, 1)", // Custom orange
          "rgba(34, 197, 94, 0.8)", // Green
          "rgba(234, 179, 8, 0.8)", // Yellow
        ],

        borderColor: [
          "rgb(255, 114, 94)",
          "rgb(34, 197, 94)",
          "rgb(234, 179, 8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for user growth
  const userGrowthChartData = {
    labels: stats.userGrowth.map((item) => item.date),
    datasets: [
      {
        label: "User Growth",
        data: stats.userGrowth.map((item) => item.count),
        borderColor: "rgb(0, 0, 50)",
        backgroundColor: "rgba(0, 10, 50, 1)",
        tension: 0.9,
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
    <DashboardTemplate>
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <div className=" text-xs text-right">
            <span className="font-medium text-sm text-slate-700">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </span>
            <p className="text-slate-500">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="flex justify-center items-center gap-8 bg-white/40 border border-white rounded-3xl py-4 px-8 w-full">
          <div className="w-2/3">
            <h1 className="text-3xl font-semibold text-slate-700">
              Welcome, Admin!
            </h1>
            <p className="text-slate-500">
              Manage your recipes and users efficiently with our dashboard.
            </p>
          </div>
          <div className="w-1/3">
            <Image
              src={IlustrasiCooking}
              alt="ilustrasi cooking"
              className="w-[400px] object-cover"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 ">
          <div className="bg-white/50 rounded-3xl p-6 flex  items-center justify-center gap-6 border-2 border-white/60">
            <Image
              src={IlustrasiUsers}
              alt="ilustrasi users"
              className="w-[100px] object-cover"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center font-semibold text-slate-700 mb-2">
                100
              </h2>
              <p className="text-slate-500 text-sm">User Active</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-6 flex  items-center justify-center gap-6 border-2 border-white/60">
            <Image
              src={IlustrasiRecipes}
              alt="ilustrasi users"
              className="w-[100px] object-cover"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center font-semibold text-slate-700 mb-2">
                200+
              </h2>
              <p className="text-slate-500 text-sm">Recipes</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-6 flex  items-center justify-center gap-6 border-2 border-white/60">
            <Image
              src={IlustrasiCategories}
              alt="ilustrasi users"
              className="w-[100px] object-cover"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center font-semibold text-slate-700 mb-2">
                20+
              </h2>
              <p className="text-slate-500 text-sm">Categories</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 ">
          <div className="bg-white/50 rounded-3xl p-6 border-2 border-white/60">
            <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">
              Recipe Statistics
            </h2>
            <div className="h-[200px]">
              <Bar data={recipeChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-6 border-2 border-white/60">
            <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">
              User Growth
            </h2>
            <div className="h-[200px]">
              <Line data={userGrowthChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Pending Recipes Section */}
        <div className="bg-white/50 rounded-3xl p-6  border-white/60 border-2">
          <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">
            Pending Recipe Approvals
          </h2>

          {pendingRecipes.length === 0 ? (
            <p className="text-slate-500">No pending recipes to approve</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {pendingRecipes.map((recipe) => (
                    <tr key={recipe.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {recipe.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {recipe.author.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {recipe.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {recipe.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(recipe.id)}
                            className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-slate-900 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(recipe.id)}
                            className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-colors"
                          >
                            Reject
                          </button>
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
    </DashboardTemplate>
  );
}
