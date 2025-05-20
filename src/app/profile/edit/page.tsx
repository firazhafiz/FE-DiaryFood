"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CatBreakfast } from "../../../../public/assets";
import { ProfileTemplate } from "@/components/templates/ProfileTemplate";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Gadang Jatu Mahiswara",
    gender: "",
    phone: "081615697675",
    dob: "",
    address: "jl majapahit ",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      router.push("/profile");
    }, 3000);
  };

  return (
    <ProfileTemplate>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-700">Edit Profile</h1>
        <div className=" text-xs text-right">
          <span className="font-medium text-sm text-slate-700">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span>
          <p className="text-slate-500">{new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src={CatBreakfast} alt="profile" className="rounded-full object-cover border-4 border-white shadow-lg w-36 h-36" />
            <div className="flex flex-col">
              <h4 className="text-black font-semibold text-lg">{form.name}</h4>
              <p className="text-gray-400 text-sm">Gadang@gmail.com</p>
            </div>
          </div>
          <div className={`${isEditing ? "pr-8" : "hidden"}`}>
            <button className="bg-[#FF7A5C] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#ff6b4a] transition-colors">Edit</button>
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
              disabled={isEditing}
              className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={isEditing}
              className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
              placeholder="Your Phone Number"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              disabled={isEditing}
              className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
              placeholder="Your Date of Birth"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={isEditing}
              className="block w-full rounded-md border-0 bg-white/50 backdrop-blur-sm py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
              placeholder="Your Address"
            />
          </div>
          <button type="button" className="mt-4 bg-[#FF7A5C] text-sm text-white px-6 py-2 rounded-md self-start disabled:opacity-60 hover:bg-[#ff6b4a] transition-colors cursor-pointer" onClick={() => handleSave()}>
            Save Changes
          </button>
        </form>
        {isSuccessModalOpen && <SuccessModal />}
      </div>
    </ProfileTemplate>
  );
};

export default ProfilePage;

const SuccessModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  animate-fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-58 w-full mx-4 transform transition-all duration-300 animate-slideIn">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4 animate-bounceIn">
          <svg className="w-8 h-8 text-green-500 animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-700 mb-2 animate-fadeInUp">Profile Updated!</h1>
      </div>
    </div>
  );
};
