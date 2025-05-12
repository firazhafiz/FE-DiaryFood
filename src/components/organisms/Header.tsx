"use client";

import React from "react";
import SearchBar from "../molecules/SearchBar";

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 px-6 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1
            className="font-bold text-2xl"
            style={{ color: "var(--custom-orange)" }}
          >
            Diary<span className="font-bold text-2xl text-gray-800">Food</span>
          </h1>
        </div>
        {/* SearchBar */}
        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>
        <nav className="flex gap-8 items-center">
          <a
            href="#"
            className="text-gray-600 hover:text-[color:var(--custom-orange)] hover:font-bold"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[color:var(--custom-orange)] hover:font-bold"
          >
            Resep
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[color:var(--custom-orange)] hover:font-bold"
          >
            Tanya AI
          </a>
        </nav>
        {/* Auth Buttons */}
        <div className="flex gap-x-2">
          <button className="px-6 py-2 text-gray-800 font-bold">Login</button>
          <button
            className="px-6 py-2 rounded-sm text-white hover:opacity-90"
            style={{ background: "var(--custom-orange)" }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
