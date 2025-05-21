"use client";

import React, { useState, useEffect, useMemo } from "react";
import { UserTable } from "../molecules/UserTable";
import { DashboardCard } from "../molecules/DashboardCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt?: string;
  recipeCount?: number;
}

interface UserManagementProps {
  onUserSelect: (user: User | null) => void;
  searchQuery: string;
  sortBy: string;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  onUserSelect,
  searchQuery = "",
  sortBy = "newest",
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchUsers();
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          onUserSelect?.(null);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleShow = (id: string) => {
    const selectedUser = users.find((user) => user.id === id);
    onUserSelect?.(selectedUser || null);
  };

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortableFiltered = [...filtered];

    sortableFiltered.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );
      } else if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "username-asc") {
        return a.username.localeCompare(b.username);
      } else if (sortBy === "username-desc") {
        return b.username.localeCompare(a.username);
      }
      return 0;
    });

    return sortableFiltered;
  }, [users, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <DashboardCard>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div>
          <UserTable
            users={currentUsers}
            onDelete={handleDelete}
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
