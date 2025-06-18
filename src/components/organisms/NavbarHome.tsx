"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "../molecules/SearchBar";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { DefaultProfile } from "../../../public/assets";

const NavbarHome: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, isLoggedIn } = useAuth();

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
    if (isLoggedIn && currentUser) {
      return (
        <Link href="/profile" className="hidden md:flex">
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
    <nav className={`py-2 px-6 transition-all duration-300 w-full shadow-none fixed top-0 left-0 z-30 ${isMobileMenuOpen ? "bg-white text-black " : "text-white"} ${isSticky ? "bg-white border-b-gray-300" : "text-white"}`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
                Diary
                <span className={`font-bold text-2xl  ${isSticky ? "text-gray-800" : `${isMobileMenuOpen ? "text-black" : "text-white"}`}`}>Food</span>
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
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : `${isMobileMenuOpen ? "bg-black" : "bg-white"}`}  transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-black" : ""}`}></span>
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : `${isMobileMenuOpen ? "bg-black" : "bg-white"}`} transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 " : ""}`}></span>
              <span className={`w-full h-0.5 ${isSticky ? "bg-gray-800" : `${isMobileMenuOpen ? "bg-black" : "bg-white"}`} transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-black" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="px-6 py-8 space-y-6">
            {/* SearchBar in mobile menu */}
            <div className="block md:hidden mb-6">
              <SearchBar isSticky={true} isPath={false} />
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
