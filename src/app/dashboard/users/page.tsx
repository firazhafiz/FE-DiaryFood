"use client";

import { UserManagement } from "@/components/organisms/UserManagement";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
      </div>
      <UserManagement />
    </div>
  );
}
