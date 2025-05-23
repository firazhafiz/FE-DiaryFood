"use client";

import { useEffect, useState } from "react";
import { UserManagement } from "@/components/organisms/UserManagement";
import { useRouter } from "next/navigation";
import { FaSearch, FaSort } from "react-icons/fa";

interface User {
  id: string;
  email: string;
  name: string;
  photo: string;
  username: string;
  createdAt?: string;
  recipeCount?: number;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // BARU: Validasi token
      router.push("/login");
      return;
    }

    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/v1/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.data.users); // DIUBAH: Sesuai struktur API yang diberikan
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [router]); // DIUBAH: Tambahkan router sebagai dependency

  function showDetail() {
    if (selectedUser) {
      router.push(`/dashboard/users/detail?id=${selectedUser.id}`);
    }
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--custom-orange)]"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - User List */}
          <div className={`${selectedUser ? "lg:col-span-8" : "lg:col-span-12"} transition-all duration-700 ease-in-out`}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-slate-900">Users Management</h1>
              </div>

              {/* Search and Sort Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-2 rounded-md border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors cursor-pointer">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaSort className="text-slate-400" />
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors placeholder:text-slate-700"
                  />
                </div>
              </div>

              {/* User Management Component */}
              <UserManagement users={users} onUserSelect={setSelectedUser} searchQuery={searchQuery} sortBy={sortBy} setUsers={setUsers} />
            </div>
          </div>

          {/* Sidebar - User Details */}
          {selectedUser && (
            <div className="lg:col-span-4 animate-slide-in">
              <div className="sticky top-8">
                <div className="bg-white/60 border-2 rounded-3xl p-6 transform transition-all duration-500 ease-out hover:scale-[1.02]">
                  <div className="flex flex-col items-center relative">
                    <button onClick={() => setSelectedUser(null)} className="absolute top-0 right-0 p-2 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <img src={selectedUser.photo} alt={selectedUser.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-6 object-cover animate-fade-in" />
                    <h1 className="text-lg font-semibold text-gray-900 text-center animate-fade-in-delay-1">{selectedUser.name}</h1>
                    <p className="text-slate-500 text-center animate-fade-in-delay-2">{selectedUser.email}</p>

                    <div className="w-full mt-8 grid grid-cols-2 gap-4 animate-fade-in-delay-3">
                      <div className="bg-white rounded-xl p-3 text-center transform transition-all duration-300 ease-out hover:scale-105">
                        <p className="text-slate-500 font-medium text-sm">Total Recipes</p>
                        <p className="text-slate-700 font-medium text-lg">{selectedUser.recipeCount || 0}</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center transform transition-all duration-300 ease-out hover:scale-105">
                        <p className="text-slate-500 font-medium text-sm">Since</p>
                        <p className="text-slate-700 font-medium text-sm">
                          {selectedUser.createdAt
                            ? new Date(selectedUser.createdAt).toLocaleDateString("id-ID") // DIUBAH: Format tanggal ke Indonesia
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
