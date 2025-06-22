"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "../molecules/SearchBar";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { DefaultProfile } from "../../../public/assets";

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, isLoggedIn } = useAuth();

  const pathname = usePathname();

  // Static categories array
  const staticCategories = [
    { id: 1, nama: "Breakfast" },
    { id: 2, nama: "Lunch" },
    { id: 3, nama: "Dinner" },
    { id: 4, nama: "Dessert" },
    { id: 5, nama: "Snacks" },
    { id: 6, nama: "Drinks" },
  ];

  // Check if we're not on the home page
  const isPath = pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define the custom background color for SearchBar on non-home pages
  const getSearchBarBgColor = () => {
    switch (pathname) {
      case "/resep":
        return "bg-gray-300";
      case "/tanya-ai":
        return "bg-green-100";
      case "/login":
      case "/register":
        return "bg-yellow-100";
      default:
        // For other pages like category pages
        return "bg-gray-100";
    }
  };

  const photoSrc = currentUser?.photo && currentUser.photo.trim() !== "" ? currentUser.photo : DefaultProfile;
  const altText = currentUser?.name && currentUser.name.trim() !== "" ? currentUser.name : "Profile";

  return (
    <nav
      className={`py-2 px-6 transition-all duration-300 w-full shadow-none fixed top-0 left-0 z-30 ${
        isMobileMenuOpen ? "bg-white text-black" : isSticky ? "bg-slate-800 text-gray-800 border-b-gray-300" : isPath ? "bg-gray-100 shadow-md" : "text-gray-800"
      }`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Section: Logo, Search, Navigation, Auth */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
                Diary
                <span className={`font-bold text-2xl ${isSticky ? "text-white" : isMobileMenuOpen ? "text-black" : "text-gray-800"}`}>Food</span>
              </h1>
            </Link>
          </div>

          {/* Categories Dropdown and Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            <SearchBar isSticky={isSticky} isPath={isPath} customBgColor={isPath ? getSearchBarBgColor() : undefined} />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 items-center text-sm">
            <Link href="/" className={`min-w-[50px] px-2 py-1 text-center hover:text-[color:var(--custom-orange)] ${isSticky ? "text-white" : isPath ? "text-gray-800" : "text-gray-600"}`}>
              Home
            </Link>
            <Link href="/recipes" className={`min-w-[60px] px-2 py-1 text-center hover:text-[color:var(--custom-orange)] ${isSticky ? "text-white" : isPath ? "text-gray-800" : "text-gray-600"}`}>
              Recipes
            </Link>
            <Link href="/ask-ai" className={`min-w-[60px] px-2 py-1 text-center hover:text-[color:var(--custom-orange)] ${isSticky ? "text-white" : isPath ? "text-gray-800" : "text-gray-600"}`}>
              Ask AI
            </Link>
          </div>

          {/* Auth Section */}
          {isLoggedIn ? (
            <Link href="/profile" className="hidden md:flex">
              <Image src={photoSrc} alt={altText} height={40} width={40} className="rounded-full border-2 border-white" />
            </Link>
          ) : (
            <div className="hidden md:flex text-xs gap-x-4">
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
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : isMobileMenuOpen ? "bg-black" : "bg-black"} transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-black" : ""}`}></span>
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : isMobileMenuOpen ? "bg-black" : "bg-black"} transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : isMobileMenuOpen ? "bg-black" : "bg-black"} transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-black" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="px-6 py-8 space-y-6">
            {/* SearchBar in mobile menu */}
            <div className="block md:hidden mb-6">
              <SearchBar isSticky={true} isPath={isPath} customBgColor={isPath ? getSearchBarBgColor() : undefined} />
            </div>

            {/* Auth Buttons */}
            <div className="pt-4">
              {!isLoggedIn && (
                <div className="flex justify-center gap-4">
                  <Link href="/login" className="w-[120px] py-2.5 text-center font-medium border-2 border-[var(--custom-orange)] rounded-lg text-gray-800 hover:bg-gray-50 transition-colors duration-200">
                    Login
                  </Link>
                  <Link href="/register" className="w-[120px] py-2.5 text-center font-medium bg-[var(--custom-orange)] text-white rounded-lg hover:bg-[var(--custom-orange)]/90 transition-colors duration-200">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className={`text-gray-800 hover:text-[var(--custom-orange)] font-medium text-lg transition-colors duration-200`}>
                Home
              </Link>
              <Link href="/recipes" className={`text-gray-800 hover:text-[var(--custom-orange)] font-medium text-lg transition-colors duration-200`}>
                Recipes
              </Link>
              <Link href="/ask-ai" className={`text-gray-800 hover:text-[var(--custom-orange)] font-medium text-lg transition-colors duration-200`}>
                Ask AI
              </Link>
            </div>

            {/* Categories in mobile menu */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-gray-800 font-semibold text-lg mb-6">Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {staticCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/recipes?category=${category.nama}`}
                    onClick={() => {
                      setActiveCategory(category.nama);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-[var(--custom-orange)] hover:text-white transition-all duration-200 text-sm font-medium">
                    {category.nama}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className={`hidden md:flex justify-start gap-12 overflow-x-auto bg-cover py-2 ${isSticky ? "text-white" : "text-gray-600"}`}>
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

export default Navbar;
