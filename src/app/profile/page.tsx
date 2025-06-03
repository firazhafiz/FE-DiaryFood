"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ProfileTemplate } from "@/components/templates/ProfileTemplate";
import { useRouter } from "next/navigation";
import { DefaultProfile } from "../../../public/assets";
import useSWR from "swr";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { FaCheck } from "react-icons/fa";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  photo: string;
  createdAt: string;
  phoneNumber?: string | null;
}

const fetcher = async (url: string) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch profile data");
  }

  return response.json();
};

function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState<UserProfile>({
    id: 0,
    name: "",
    email: "",
    photo: "",
    createdAt: "",
    phoneNumber: "",
  });
  const router = useRouter();
  const modalButtonRef = useRef<HTMLButtonElement>(null);

  const { data, error, isLoading } = useSWR("http://localhost:4000/v1/profile", fetcher, {
    onError: (error) => {
      if (error.message === "No token found" || error.message.includes("401")) {
        toast.error("Session expired. Please log in again.");
        Cookies.remove("token");
        router.push("/login");
      } else {
        toast.error(error.message);
      }
    },
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data?.data) {
      setForm({
        id: data.data.id || 0,
        name: data.data.name || "",
        email: data.data.email || "",
        photo: data.data.photo || "",
        createdAt: data.data.createdAt || "",
        phoneNumber: data.data.phoneNumber ?? "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (showSuccessModal && modalButtonRef.current) {
      modalButtonRef.current.focus(); // Focus close button for accessibility
    }
  }, [showSuccessModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        Cookies.remove("token");
        router.push("/login");
        return;
      }

      const payload: Partial<UserProfile> = {
        name: form.name,
        photo: form.photo,
      };
      if (form.phoneNumber) {
        payload.phoneNumber = form.phoneNumber;
      }

      const response = await fetch(`http://localhost:4000/v1/user/${form.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      setIsEditing(false);
      setShowSuccessModal(true);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update profile.");
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <ProfileTemplate>
        <div className="text-center py-12 text-red-500">Error loading profile: {error.message}</div>
      </ProfileTemplate>
    );
  }

  return (
    <Suspense fallback={null}>
      <ProfileTemplate>
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
              <div className="flex justify-center mb-4">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Profile Updated</h2>
              <p className="text-gray-600 mb-6 text-sm text-center">Your profile has been successfully updated!</p>
              <button ref={modalButtonRef} onClick={closeModal} className="w-full bg-[#FF7A5C] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#ff6b4a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-200">
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-700">Profile</h1>
          <div className="text-xs text-right">
            <span className="font-medium text-sm text-slate-700">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span>
            <p className="text-slate-500">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src={form.photo || DefaultProfile} alt="profile" width={144} height={144} priority={true} className="rounded-full object-cover border-4 border-white shadow-lg w-36 h-36" />
            </div>
            <div className="pr-8">
              <button className="bg-[#FF7A5C] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#ff6b4a] transition-colors cursor-pointer" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </div>
          </div>
          <form className="flex flex-col gap-6 w-full">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={true} // Email typically not editable
                className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber ?? ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
                placeholder={isEditing ? "Enter phone number" : form.phoneNumber ? form.phoneNumber : "Not provided"}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Since</label>
              <input
                type="text"
                name="createdAt"
                value={
                  form.createdAt
                    ? new Date(form.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"
                }
                disabled={true}
                className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
              />
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <button type="button" className="mt-4 bg-[#FF7A5C] text-sm text-white px-6 py-2 rounded-md disabled:opacity-60 hover:bg-[#ff6b4a] transition-colors cursor-pointer" onClick={handleSave}>
                  Save Changes
                </button>
                <button type="button" className="mt-4 bg-gray-300 text-sm text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors cursor-pointer" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </ProfileTemplate>
    </Suspense>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
