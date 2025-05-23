"use client";

import { useState } from "react";
import { UserManagement } from "@/components/organisms/UserManagement";
import { useRouter } from "next/navigation";
import { FaSearch, FaSort } from "react-icons/fa";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  recipeCount?: number;
}

export default function UsersPage() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  function showDetail() {
    if (selectedUser) {
      router.push(`/dashboard/users/detail?id=${selectedUser.id}`);
    }
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`${selectedUser ? "lg:col-span-8" : "lg:col-span-12"} transition-all duration-700 ease-in-out`}>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-slate-900">Users Management</h1>
            </div>

            {/* Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors cursor-pointer">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaSort className="text-slate-400" />
                </div>
              </div>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-white bg-white/40 focus:outline-none focus:border-[var(--custom-orange)] text-slate-700 transition-colors placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* User Management Component */}
            <UserManagement onUserSelect={setSelectedUser} searchQuery={searchQuery} sortBy={sortBy} />
          </div>
        </div>

        {/* Sidebar - User Details */}
        {selectedUser && (
          <div className="lg:col-span-4 animate-slide-in">
            <div className="sticky top-8">
              <div className="bg-white/60 border-2 rounded-3xl p-6 transform transition-all duration-500 ease-out hover:scale-[1.02]">
                <div className="flex flex-col items-center">
                  <img src="/assets/images/image_login.jpg" alt={selectedUser.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-6 object-cover animate-fade-in" />
                  <h1 className="text-lg font-semibold text-gray-900 text-center animate-fade-in-delay-1">{selectedUser.name}</h1>
                  <p className="text-slate-500 text-center animate-fade-in-delay-2">{selectedUser.email}</p>

                  <div className="w-full mt-8 grid grid-cols-2 gap-4 animate-fade-in-delay-3">
                    <div className="bg-white rounded-xl p-3 text-center transform transition-all duration-300 ease-out hover:scale-105">
                      <p className="text-slate-500 font-medium text-sm">Total Recipes</p>
                      <p className="text-slate-700 font-medium text-lg">{selectedUser.recipeCount || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center transform transition-all duration-300 ease-out hover:scale-105">
                      <p className="text-slate-500 font-medium text-sm">Since</p>
                      <p className="text-slate-700 font-medium text-sm">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>

                  <button className="mt-8 bg-white hover:bg-slate-50 rounded-lg cursor-pointer px-6 py-2 text-center text-slate-700 text-sm transition-all duration-300 ease-out hover:scale-105 animate-fade-in-delay-4" onClick={showDetail}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
