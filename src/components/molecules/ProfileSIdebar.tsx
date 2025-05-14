"use client";

import Link from "next/link";
import { Title } from "../atoms/Title";
import { FaBook, FaBookmark, FaCog, FaUser } from "react-icons/fa";

const ProfileSidebar = () => {
  return (
    <nav className="w-1/5 px-6 h-screen  fixed bg-white/40 backdrop-blur-lg rounded-3xl m-4 border-2 border-white/60 shadow">
      <div className="flex flex-col h-full gap-8 py-6 justify-center items-center">
        <div className="flex-shrink-0 flex items-center">
          <Title />
        </div>
        <div className="flex flex-col h-full gap-8">
          <div className="hidden sm:flex h-full flex-col gap-8">
            <Link href="/profile" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3 ">
              <FaUser className="text-lg" />
              Profile
            </Link>
            <Link href="/profile/my-recipe" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
              <FaBook className="text-lg" />
              My Recipe
            </Link>
            <Link href="/profile/saved" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
              <FaBookmark className="text-lg" />
              Saved
            </Link>
            <Link href="/profile/setting" className="border-transparent text-slate-700 font-semibold hover:text-slate-900  flex px-1 pt-1 border-b-2 text-md  items-center gap-3">
              <FaCog className="text-lg" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileSidebar;
