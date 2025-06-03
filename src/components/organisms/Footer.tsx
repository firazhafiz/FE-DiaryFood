"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import Link from "next/link";

const Footer = () => (
  <footer className="bg-gradient-to-b from-gray-100 to-blue-100 py-8 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start justify-center text-center md:text-left place-items-center md:place-items-start justify-items-center md:justify-items-center transition-all duration-300">
      {/* Kiri: Logo & Description */}
      <div>
        <Link href="/">
          <div className="mb-2">
            <span className="font-bold text-2xl md:text-3xl" style={{ color: "var(--custom-orange)" }}>
              Diary
            </span>
            <span className="font-bold text-2xl md:text-3xl text-gray-900">Food</span>
          </div>
        </Link>
        <p className="text-gray-700 text-sm max-w-xs leading-relaxed">
          DiaryFood is a recipe website with a wide selection of delicious menus, easy-to-use search features, and a warm cooking enthusiast community. Find inspiration, share your creations, and let&apos;s cook together!
        </p>
      </div>
      {/* Tengah: About DiaryFood */}
      <div>
        <h4 className="font-bold text-md mb-3 text-gray-900">About DiaryFood</h4>
        <ul className="text-gray-700 text-sm space-y-3">
          <li>
            <Link href="/" className="hover:text-[color:var(--custom-orange)]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/recipes" className="hover:text-[color:var(--custom-orange)]">
              Recipes
            </Link>
          </li>
          <li>
            <Link href="/ask-ai" className="hover:text-[color:var(--custom-orange)]">
              Ask AI
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-[color:var(--custom-orange)]">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-[color:var(--custom-orange)]">
              Register
            </Link>
          </li>
        </ul>
      </div>
      {/* Kanan: Help */}
      <div>
        <h4 className="font-bold text-md mb-3 text-gray-900">Help</h4>
        <ul className="text-gray-700 text-sm space-y-3">
          <li>
            <Link href="/contact" className="hover:text-[color:var(--custom-orange)]">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="hover:text-[color:var(--custom-orange)]">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-[color:var(--custom-orange)]">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-[color:var(--custom-orange)]">
              Privacy & Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
    {/* Follow Us */}
    <div className="mt-12 flex flex-col items-center">
      <div className="font-bold text-md mb-3 text-gray-900">Follow Us</div>
      <div className="flex space-x-6 text-xl">
        <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors">
          <FaInstagram />
        </a>
        <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors">
          <FaTwitter />
        </a>
        <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors">
          <FaLinkedin />
        </a>
        <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors">
          <FaFacebook />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
