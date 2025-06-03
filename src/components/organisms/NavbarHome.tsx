"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "../molecules/SearchBar";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { DefaultProfile } from "../../../public/assets";

const NavbarHome: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { currentUser, isLoggedIn, loading } = useAuth();

  const staticCategories = [
    { id: 1, nama: "Breakfast" },
    { id: 2, nama: "Lunch" },
    { id: 3, nama: "Dinner" },
    { id: 4, nama: "Dessert" },
    { id: 5, nama: "Snacks" },
    { id: 6, nama: "Drinks" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const photoSrc = currentUser?.photo && currentUser.photo.trim() !== "" ? currentUser.photo : DefaultProfile;
  const altText = currentUser?.name && currentUser.name.trim() !== "" ? currentUser.name : "Profile";

  const renderAuthSection = () => {
    if (loading) {
      return <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>;
    }
    if (isLoggedIn && currentUser) {
      return (
        <Link href="/profile">
          <Image src={photoSrc} alt={altText} height={40} width={40} className="rounded-full border-2 border-white" />
        </Link>
      );
    }
    return (
      <div className="text-xs flex gap-x-4">
        <Link
          href="/login"
          className={`px-6 py-2 font-semibold border border-[var(--custom-orange)] rounded-sm transition-colors duration-200 ${
            isSticky ? "text-gray-600 hover:bg-gray-700 hover:text-white" : "text-white hover:bg-gray-100 hover:text-[var(--custom-orange)]"
          }`}>
          Login
        </Link>
        <Link href="/register" className={`px-6 py-2 rounded-sm text-white hover:opacity-90 ${isSticky ? "bg-[color:var(--custom-orange)]" : "bg-[color:var(--custom-orange)]"}`}>
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className={`pt-4 px-6 transition-all duration-300 w-full shadow-none fixed top-0 left-0 z-30 ${isSticky ? "bg-white border-b-gray-300" : "text-white"}`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
                Diary
                <span className={`font-bold text-2xl ${isSticky ? "text-gray-800" : "text-white"}`}>Food</span>
              </h1>
            </Link>
          </div>
          <div className="flex-1 max-w-md">
            <SearchBar isSticky={isSticky} isPath={false} />
          </div>
          <div className="flex gap-8 items-center text-sm">
            <Link href="/" className={`min-w-[50px] px-2 py-1 text-center hover:text-[color:var(--custom-orange)] ${isSticky ? "text-gray-600" : "text-white"}`}>
              Home
            </Link>
            <Link href="/recipes" className={`min-w-[60px] px-2 py-1 text-center hover:text-[color:var(--custom-orange)] ${isSticky ? "text-gray-600" : "text-white"}`}>
              Recipes
            </Link>
            <Link href="/ask-ai" className={`min-w-[60px] px-2 py-1 text-center hover:text-[color:var(--custom-orange)] ${isSticky ? "text-gray-600" : "text-white"}`}>
              Ask AI
            </Link>
          </div>
          {renderAuthSection()}
        </div>
        <div className={`flex justify-start gap-12 overflow-x-auto bg-cover py-2 ${isSticky ? "text-gray-600" : "text-white"}`}>
          {staticCategories.length > 0 ? (
            staticCategories.map((category) => (
              <Link
                key={category.id}
                href={`/recipes?category=${category.nama}`}
                onClick={() => setActiveCategory(category.nama)}
                className={`transition-all rounded text-sm flex items-center justify-center h-8 ${activeCategory === category.nama && !isSticky ? "" : "hover:text-[var(--custom-orange)]"}`}>
                {category.nama}
              </Link>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No categories available</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
