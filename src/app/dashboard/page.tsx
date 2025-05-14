"use client";

import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { IlustrasiCooking } from "../../../public/assets/index";
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
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft" | "pending";
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
          "rgba(255, 114, 94, 0.8)", // Custom orange
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
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            <span className="font-semibold">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </span>
            ,{" "}
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Welcome Section */}
        <div className="flex justify-center items-center gap-8 bg-white rounded-lg p-8 w-full">
          <div className="w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome, Admin!
            </h1>
            <p className="text-gray-500">
              Manage your recipes and users efficiently with our dashboard.
            </p>
          </div>
          <div className="w-1/3">
            <Image
              src={IlustrasiCooking}
              alt="ilustrasi cooking"
              className="w-[300px] object-cover"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recipe Statistics Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recipe Statistics
            </h3>
            <div className="h-[300px]">
              <Bar data={recipeChartData} options={chartOptions} />
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              User Growth
            </h3>
            <div className="h-[300px]">
              <Line data={userGrowthChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Pending Recipes Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pending Recipe Approvals
          </h2>
          {pendingRecipes.length === 0 ? (
            <p className="text-gray-500">No pending recipes to approve</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingRecipes.map((recipe) => (
                    <tr key={recipe.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {recipe.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {recipe.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {recipe.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {recipe.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(recipe.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(recipe.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
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
