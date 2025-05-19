"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { ArrowLeft, CatDinner } from "../../../../../public/assets";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  recipeCount?: number;
  bio?: string;
  location?: string;
  joinDate?: string;
}

const DetailUser: React.FC = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = searchParams.get("id");
    if (userId) {
      fetchUserData(userId);
    }
  }, [searchParams]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Link href={"/dashboard/users"} className="bg-white/60 border-2 border-white mb-6 py-1 px-6 rounded-xl text-slate-700 cursor-pointer">
        Back
      </Link>
      <div className="max-w-2xl mx-auto  rounded-xl  bg-white/60 border-2  overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <img src="/assets/images/image_login.png" alt={user.name} className="w-32 h-32 rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-700 text-center mb-2">{user.name}</h1>
          <p className="text-slate-500 text-center mb-6">{user.email}</p>

          {user.bio && (
            <div className="text-center mb-6">
              <p className="text-slate-600 italic">"{user.bio}"</p>
            </div>
          )}

          {user.location && (
            <div className="text-center mb-6">
              <p className="text-slate-500">
                <span className="inline-block w-4 h-4 mr-2">📍</span>
                {user.location}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-slate-500 font-medium text-sm">Total Recipes</p>
              <p className="text-slate-700 font-medium text-lg">{user.recipeCount || 0}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-slate-500 font-medium text-sm">Member Since</p>
              <p className="text-slate-700 font-medium text-lg">{user.joinDate || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div>
          <div className="rounded-xl ">
            <div className="grid grid-cols-5 py-4 px-6 border-b">
              <p className="text-slate-700 font-medium text-sm col-span-2">Recipe</p>
              <p className="text-slate-700 font-medium text-sm">Category</p>
              <p className="text-slate-700 font-medium text-sm">Status</p>
              <p className="text-slate-700 font-medium text-sm text-right pr-3">Actions</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-5 items-center py-4 px-6 border-b bg-white/60 rounded-xl border-white/60 hover:bg-gray-50">
                <div className="flex items-center gap-3 col-span-2">
                  <Image src={CatDinner} alt="thumbnail" className="w-32 h-20 rounded-lg object-cover " />
                  <div>
                    <p className="text-slate-700 font-medium">Bakwan</p>
                    <p className="text-slate-500 text-xs">Chef Ilham</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-700">Gorengan</p>
                </div>

                <div>
                  <span className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{status}</span>
                </div>

                <div className="relative flex justify-end">
                  <button className="cursor-pointer text-slate-500 p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Recipe actions">
                    <FaEllipsisH />
                  </button>

                  {/* {isOpen && (
                    <div className="absolute top-10 right-0 z-10">
                      <div className="bg-white shadow-lg rounded-xl py-1 min-w-32 border border-slate-100">
                        {!isConfirmingDelete ? (
                          <>
                            <Link href={"/detail_resep?recipe=chicken-curry"} className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleShow}>
                              <FaEye className="text-slate-500" />
                              <span>Show</span>
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleShow}>
                              <FaEdit className="text-slate-500" />
                              <span>Edit</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleDelete}>
                              <FaTrash className="text-red-500" />
                              <span>Delete</span>
                            </button>
                          </>
                        ) : (
                          <div className="p-3">
                            <p className="text-slate-700 font-medium text-sm mb-2">Are you sure you want to delete this recipe?</p>
                            <div className="flex gap-2 mt-2">
                              <button className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors" onClick={handleDelete}>
                                Confirm
                              </button>
                              <button className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-300 transition-colors" onClick={handleCancelDelete}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
