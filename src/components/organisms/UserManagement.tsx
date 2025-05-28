"use client";

import React, { useState, useMemo } from "react"; // DIUBAH: Hapus useEffect yang tidak perlu
import { UserTable } from "../molecules/UserTable";
import { DashboardCard } from "../molecules/DashboardCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface User {
  id: number;
  email: string;
  name: string;
  photo: string;
  username: string;
  createdAt?: string;
  recipeCount?: number;
}

interface UserManagementProps {
  users: User[];
  onUserSelect: (user: User | null) => void; // DIUBAH: Perbarui tipe untuk menerima null
  searchQuery: string;
  sortBy: string;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onUserSelect,
  searchQuery,
  sortBy,
  setUsers,
}) => {
  const [currentPage, setCurrentPage] = useState(1); // BARU: State untuk paginasi
  const itemsPerPage = 7;

  // Filter pengguna berdasarkan pencarian
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]); // BARU: Gunakan useMemo untuk optimasi

  // Urutkan pengguna berdasarkan sortBy
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
          );
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredUsers, sortBy]); // BARU: Gunakan useMemo untuk optimasi

  // Hitung total halaman dan pengguna untuk halaman saat ini
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage); // BARU: Definisikan totalPages
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // BARU: Ambil pengguna untuk halaman saat ini

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page: number) => {
    // BARU: Definisikan handlePageChange
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fungsi untuk menghapus pengguna
  const handleDeleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://localhost:4000/v1/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== id));
      onUserSelect(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error instanceof Error ? error.message : "Failed to delete user");
    }
  };

  // Fungsi untuk memilih pengguna
  const handleShow = (id: number) => {
    const selectedUser = users.find((user) => user.id === id);
    onUserSelect(selectedUser || null);
  };

  return (
    <DashboardCard>
      {sortedUsers.length === 0 ? ( // BARU: Tangani kasus tidak ada data
        <div className="text-center py-4">No users found.</div>
      ) : (
        <div>
          <UserTable
            users={paginatedUsers} // DIUBAH: Kirim pengguna yang sudah dipaginasi
            onDelete={handleDeleteUser}
            onShow={handleShow}
          />

          {totalPages > 1 && (
            <div className="flex justify-end items-center mt-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-slate-700 hover:bg-white/60 transition-colors"
                }`}
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${
                    currentPage === index + 1
                      ? "bg-[#FF7A5C] text-white"
                      : "text-slate-700 hover:bg-white/60 transition-colors"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-slate-700 hover:bg-white/60 transition-colors"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </DashboardCard>
  );
};
