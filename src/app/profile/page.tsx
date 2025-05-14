"use client";

import { Title } from "@/components/atoms/Title";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { CatBreakfast } from "../../../public/assets";
import { FaUser, FaBook, FaBookmark, FaCog } from "react-icons/fa";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Gadang Jatu Mahiswara",
    gender: "",
    phone: "",
    dob: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex bg-amber-50 min-h-screen">
      <nav className="bg-white  w-1/5 px-6 h-screen fixed py-10">
        <div className="mb-8">
          <Title />
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#FF7A5C] text-white font-semibold">
            <FaUser /> Profile
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <FaBook /> My Recipe
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <FaBookmark /> Saved
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <FaCog /> Settings
          </Link>
        </div>
      </nav>
      <div className=" w-4/5 ml-[20%] px-16 py-10">
        <div className="w-full max-w-5xl mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}, {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className=" bg-white rounded-xl p-10  w-full mx-auto  flex flex-col  gap-8">
          {/* <button className="absolute top-6 right-8 bg-[#FF7A5C] text-white px-6 py-1 rounded-lg text-sm font-medium" onClick={() => setIsEditing((prev) => !prev)}>
            {isEditing ? "Cancel" : "Edit"}
          </button> */}
          <div className="flex gap-4 items-center justify-between ">
            <div className="flex items-center  gap-4">
              <Image src={CatBreakfast} alt="profile" className="rounded-full object-cover border-4 border-white shadow w-36 h-36" />
              <div className="flex flex-col ">
                <h4 className="text-black font-semibold text-lg">{form.name}</h4>
                <p className="text-gray-400 text-sm ">Gadang@gmail.com</p>
              </div>
            </div>
            <div className="pr-8">
              <button className=" bg-[#FF7A5C] text-white px-6 py-2 rounded-md text-sm font-medium">Edit</button>
            </div>
          </div>
          <form className="flex flex-col gap-6 w-full ">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-gray-100 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Gender</label>
              <input
                type="text"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-gray-100 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
                placeholder="Your Gender"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-gray-100 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
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
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-gray-100 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
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
                disabled={!isEditing}
                className="block w-full rounded-md border-0 bg-gray-100 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-orange-200 disabled:opacity-70 placeholder-gray-400"
                placeholder="Your Address"
              />
            </div>
            <button type="button" className="mt-4 bg-[#FF7A5C] text-sm text-white px-6 py-2 rounded-md self-start disabled:opacity-60" disabled={!isEditing} onClick={() => setIsEditing(false)}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
