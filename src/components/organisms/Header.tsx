"use client";

import React from "react";
import SearchBar from "../molecules/SearchBar";
import Link from "next/link";

const Header: React.FC<{ isSticky?: boolean }> = ({ isSticky = false }) => {
  return (
    <header
      className={`py-4 px-6 mb-6 transition-all duration-300 ${
        isSticky
          ? "sticky top-0 z-50 bg-gray-900 text-white shadow-lg"
          : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
            Diary
            <span
              className={`font-bold text-2xl ${
                isSticky ? "text-white" : "text-gray-800"
              }`}
            >
              Food
            </span>
          </h1>
        </div>
        {/* SearchBar */}
        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>
        <nav className="text-sm flex gap-8 items-center transition-all duration-300">
          <Link
            href="/"
            className={`hover:text-[color:var(--custom-orange)] hover:font-semibold ${
              isSticky ? "text-white" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/resep"
            className={`hover:text-[color:var(--custom-orange)] hover:font-semibold ${
              isSticky ? "text-white" : "text-gray-600"
            }`}
          >
            Resep
          </Link>
          <Link
            href="/tanya-ai"
            className={`hover:text-[color:var(--custom-orange)] hover:font-semibold ${
              isSticky ? "text-white" : "text-gray-600"
            }`}
          >
            Tanya AI
          </Link>
        </nav>
        {/* Auth Buttons */}
        <div className="text-sm flex gap-x-2">
          <Link
            href="/login"
            className={`px-6 py-2 font-semibold hover:text-[color:var(--custom-orange)] ${
              isSticky ? "text-white" : "text-gray-800"
            }`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 rounded-sm text-white hover:opacity-90"
            style={{ background: "var(--custom-orange)" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
