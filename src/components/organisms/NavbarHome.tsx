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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    );
  };

  return (
    <nav className={`py-2 px-6 transition-all duration-300 w-full shadow-none fixed top-0 left-0 z-30 ${isSticky ? "bg-white border-b-gray-300" : "text-white"}`}>
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
          <div className="hidden md:flex flex-1 max-w-md">
            <SearchBar isSticky={isSticky} isPath={false} />
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm">
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

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : "bg-white"} transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : "bg-white"} transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : "bg-white"} transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full min-h-screen left-0 w-full bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="px-6 py-4 space-y-4">
            <div className="pt-8  border-gray-200">
              {!isLoggedIn && (
                <div className="flex  justify-evenly">
                  <Link href="/login" className="w-[100px] py-2  text-center font-semibold border border-[var(--custom-orange)] rounded-sm text-gray-800 hover:bg-gray-100">
                    Login
                  </Link>
                  <Link href="/register" className="w-[100px] py-2 text-center bg-[var(--custom-orange)] text-white rounded-sm hover:opacity-90">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8 pt-8">
              <Link href="/" className={`text-gray-800 hover:text-[var(--custom-orange)] font-medium`}>
                Home
              </Link>
              <Link href="/recipes" className={`text-gray-800 hover:text-[var(--custom-orange)] font-medium`}>
                Recipes
              </Link>
              <Link href="/ask-ai" className={`text-gray-800 hover:text-[var(--custom-orange)] font-medium`}>
                Ask AI
              </Link>
            </div>
          </div>
        </div>

        <div className={`hidden md:flex justify-start gap-12 overflow-x-auto bg-cover py-2 ${isSticky ? "text-gray-600" : "text-white"}`}>
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
