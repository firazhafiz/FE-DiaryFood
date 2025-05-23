"use client";

import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { IlustrasiCategories, IlustrasiCooking, IlustrasiRecipes, IlustrasiUsers } from "../../../public/assets/index";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useRouter } from "next/navigation";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalCategories: 0,
    publishedRecipes: 0,
    pendingRecipes: [],
    userGrowth: [] as { date: string; count: number }[],
    recipeCategories: [] as { category: string; count: number }[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Tidak ada token. Silakan login kembali.");
          router.push("/login"); // Redirect ke halaman login jika tidak ada token
          return;
        }

        const response = await fetch("http://localhost:4000/v1/admin/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data) {
          throw new Error("Data tidak ditemukan di respons API");
        }

        // Update stats dengan data dari API
        setStats({
          totalUsers: data.data.totalUsers,
          totalRecipes: data.data.totalRecipes,
          totalCategories: data.data.totalCategories,
          publishedRecipes: data.data.latestRecipes.filter((recipe: any) => recipe.isApproved).length,
          pendingRecipes: data.data.latestRecipes,
          userGrowth: [], // Tambahkan logika jika API menyediakan data ini
          recipeCategories: data.data.latestRecipes.map((recipe: any) => ({
            category: recipe.kategori.nama,
            count: 1, // Hitung per kategori, perlu logika tambahan untuk agregasi
          })),
        });

        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const handleApprove = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Perbarui state untuk menghapus resep yang disetujui
      setStats((prev) => ({
        ...prev,
        pendingRecipes: prev.pendingRecipes.filter((recipe: any) => recipe.id !== recipeId),
        publishedRecipes: prev.publishedRecipes + 1,
      }));
    } catch (error) {
      console.error("Error approving recipe:", error);
      setError("Gagal menyetujui resep");
    }
  };

  const handleReject = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Perbarui state untuk menghapus resep yang ditolak
      setStats((prev) => ({
        ...prev,
        pendingRecipes: prev.pendingRecipes.filter((recipe: any) => recipe.id !== recipeId),
      }));
    } catch (error) {
      console.error("Error rejecting recipe:", error);
      setError("Gagal menolak resep");
    }
  };

  // Chart data for recipe statistics
  const recipeChartData = {
    labels: ["Total Resep", "Disetujui", "Menunggu Persetujuan"],
    datasets: [
      {
        label: "Statistik Resep",
        data: [stats.totalRecipes, stats.publishedRecipes, stats.pendingRecipes.length],
        backgroundColor: ["rgba(0, 10, 50, 1)", "rgba(34, 197, 94, 0.8)", "rgba(234, 179, 8, 0.8)"],
        borderColor: ["rgb(0, 10, 50)", "rgb(34, 197, 94)", "rgb(234, 179, 8)"],

        borderWidth: 1,
      },
    ],
  };

  // Chart data for user growth (dummy data karena API tidak menyediakan)
  const userGrowthChartData = {
    labels: stats.userGrowth.length ? stats.userGrowth.map((item) => item.date) : ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Pertumbuhan Pengguna",
        data: stats.userGrowth.length ? stats.userGrowth.map((item) => item.count) : [10, 20, 30, 25, 40],
        borderColor: "rgb(0, 10, 50)",
        backgroundColor: "rgba(0, 10, 50, 0.5)",
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <div className="text-xs text-right">
            <span className="font-medium text-sm text-slate-700">{new Date().toLocaleDateString("id-ID", { weekday: "long" })}</span>
            <p className="text-slate-500">{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="flex justify-center items-center gap-8 bg-white/40 border border-white rounded-3xl py-4 px-8 w-full">
          <div className="w-2/3">
            <h1 className="text-3xl font-semibold text-slate-700">Wellcome, Admin!</h1>
            <p className="text-slate-500">Manage recipes and users efficiently through our dashboard.</p>
          </div>
          <div className="w-1/3">
            <Image src={IlustrasiCooking} alt="ilustrasi memasak" className="w-[400px] object-cover" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/50 rounded-3xl p-6 flex items-center justify-center gap-6 border-2 border-white/60">
            <Image src={IlustrasiUsers} alt="ilustrasi pengguna" className="w-[100px] object-cover" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center font-semibold text-slate-700 mb-2">{stats.totalUsers}</h2>
              <p className="text-slate-500 text-sm">Active Users</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-6 flex items-center justify-center gap-6 border-2 border-white/60">
            <Image src={IlustrasiRecipes} alt="ilustrasi resep" className="w-[100px] object-cover" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center font-semibold text-slate-700 mb-2">{stats.totalRecipes}</h2>
              <p className="text-slate-500 text-sm">Recipes</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-6 flex items-center justify-center gap-6 border-2 border-white/60">
            <Image src={IlustrasiCategories} alt="ilustrasi kategori" className="w-[100px] object-cover" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl text-center font-semibold text-slate-700 mb-2">{stats.totalCategories}</h2>

              <p className="text-slate-500 text-sm">Categories</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/50 rounded-3xl p-6 border-2 border-white/60">
            <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">Recipe Statistics</h2>
            <div className="h-[200px]">
              <Bar data={recipeChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-6 border-2 border-white/60">
            <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">User Growth</h2>
            <div className="h-[200px]">
              <Line data={userGrowthChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Pending Recipes Section */}

        <div className="bg-white/50 rounded-3xl p-6  border-white/60 border-2">
          <h2 className="text-lg text-center font-semibold text-slate-700 mb-8">Pending Recipe Approvals</h2>

          {pendingRecipes.length === 0 ? (
            <p className="text-slate-500">No pending recipes to approve</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700  tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.pendingRecipes.map((recipe: any) => (
                    <tr key={recipe.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.author.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button onClick={() => handleApprove(recipe.id)} className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-slate-900 transition-colors">
                            Approve
                          </button>
                          <button onClick={() => handleReject(recipe.id)} className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-colors">
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
