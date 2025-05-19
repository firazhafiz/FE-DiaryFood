"use client";

import React, { useState, useEffect } from "react";
import { UserTable } from "../molecules/UserTable";
import { DashboardCard } from "../molecules/DashboardCard";

interface User {
  id: string;
  email: string;
  username: string;
  createdAt?: string;
  recipeCount?: number;
}

interface UserManagementProps {
  onUserSelect?: (user: User | null) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return <DashboardCard title="Users List">{loading ? <div className="text-center py-4">Loading...</div> : <UserTable users={users} onDelete={handleDelete} onShow={handleShow} />}</DashboardCard>;
};
