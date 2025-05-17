"use client";

import { UserManagement } from "@/components/organisms/UserManagement";

export default function UsersPage() {
  return (
    <div className="space-y-6 flex gap-4">
      <div className="w-5/7">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-xl font-semibold text-slate-700">Users Management</h1>
        </div>
        <UserManagement />
      </div>
      <div className="w-2/7 mt-22">
        <div className="grid place-items-center bg-white/60 border-2 rounded-3xl px-4 py-8">
          <img src="/assets/images/image_login.png" alt="user" className="w-40 h-40 rounded-full mb-6" />
          <h1 className="text-2xl font-semibold text-gray-900">John Doe</h1>
          <p className="text-slate-500">john.doe@example.com</p>
          <div className="mt-10 flex justify-between gap-8">
              <div className=" bg-white rounded-xl p-2 text-center">
              <p className="text-slate-500 font-medium text-sm">Total Recipes</p>
              <p className="text-slate-700 font-medium text-sm">10</p>
            </div>
            <div className=" bg-white rounded-xl p-2 text-center">
              <p className="text-slate-500 font-medium text-sm">Since</p>
              <p className="text-slate-700 font-medium text-sm">10 Jun 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
