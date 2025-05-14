import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "../molecules/SearchBar";

const NavbarHome: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`pt-4 px-6 transition-all duration-300 w-full shadow-none fixed top-0 left-0 z-30 ${
        isSticky
          ? "bg-gray-200 text-gray-800 border-b-gray-300"
          : "text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Section: Logo, Search, Navigation, Auth */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
              Diary
              <span
                className={`font-bold text-2xl ${
                  isSticky ? "text-gray-800" : "text-white"
                }`}
              >
                Food
              </span>
            </h1>
          </div>

          {/* Categories Dropdown and Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar isSticky={isSticky} isPath={false} />
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8 items-center text-sm">
            <Link
              href="/"
              className={`hover:text-[color:var(--custom-orange)] hover:font-semibold  ${
                isSticky ? "text-gray-600" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/resep"
              className={`hover:text-[color:var(--custom-orange)] hover:font-semibold ${
                isSticky ? "text-gray-600" : "text-white"
              }`}
            >
              Resep
            </Link>
            <Link
              href="/tanya-ai"
              className={`hover:text-[color:var(--custom-orange)] hover:font-semibold ${
                isSticky ? "text-gray-600" : "text-white"
              }`}
            >
              Tanya AI
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="text-xs flex gap-x-4">
            <Link
              href="/login"
              className={`px-6 py-2 font-semibold border border-[var(--custom-orange)] rounded-sm transition-colors duration-200 ${
                isSticky
                  ? "text-gray-600 hover:bg-gray-700 hover:text-white"
                  : "text-white hover:bg-gray-100 hover:text-[var(--custom-orange)]"
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`px-6 py-2 rounded-sm text-white hover:opacity-90 ${
                isSticky
                  ? "bg-[color:var(--custom-orange)]"
                  : "bg-[color:var(--custom-orange)]"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div
          className={`flex justify-start gap-12 overflow-x-auto bg-[url('/wood-background.jpg')] bg-cover py-2 ${
            isSticky ? "text-gray-600" : "text-white"
          }`}
        >
          {["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Drinks"].map(
            (category) => (
              <Link
                key={category}
                href={`/${category.toLowerCase()}`}
                onClick={() => setActiveCategory(category)}
                className={`transition-all rounded text-sm flex items-center justify-center h-8 ${
                  activeCategory === category && !isSticky
                    ? ""
                    : "hover:text-[var(--custom-orange)]"
                }`}
              >
                {category}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
