"use client";

import { useState } from "react";
import { UserManagement } from "@/components/organisms/UserManagement";
import { useRouter } from "next/navigation";

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

  function showDetail() {
    if (selectedUser) {
      router.push(`/dashboard/users/detail?id=${selectedUser.id}`);
    }
  }

  return (
    <div className="space-y-6 flex p-8 gap-4">
      <div className="w-5/7">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-900">Users Management</h1>
        </div>
        <UserManagement onUserSelect={setSelectedUser} />
      </div>
      <div className="w-2/7 mt-22">
        <div className="grid place-items-center bg-white/60 border-2 rounded-3xl px-4 py-8">
          {selectedUser ? (
            <>
              <img src="/assets/images/image_login.png" alt={selectedUser.name} className="w-40 h-40 rounded-full mb-6" />
              <h1 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h1>
              <p className="text-slate-500">{selectedUser.email}</p>
              <div className="mt-10 flex justify-between gap-8 mb-8">
                <div className="bg-white rounded-xl p-2 text-center">
                  <p className="text-slate-500 font-medium text-sm">Total Recipes</p>
                  <p className="text-slate-700 font-medium text-sm">{selectedUser.recipeCount || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-2 text-center">
                  <p className="text-slate-500 font-medium text-sm">Since</p>
                  <p className="text-slate-700 font-medium text-sm">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
              <button className="bg-white rounded-lg cursor-pointer p-2 text-center text-slate-700 px-4 py-1 text-sm " onClick={showDetail}>
                Detail
              </button>
            </>
          ) : (
            <div className="text-center  text-slate-500">
              <p>Select a user to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
