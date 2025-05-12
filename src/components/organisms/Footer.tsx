"use client";

import React from "react";

const Footer = () => (
  <footer className="bg-gray-100 py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <span
          className="font-bold text-xl"
          style={{ color: "var(--custom-orange)" }}
        >
          Diary
        </span>
        <span className="font-bold text-xl text-gray-800">Food</span>
        <p className="text-gray-500 mt-2 text-sm">
          DiaryFood adalah website resep masakan dengan beragam pilihan menu
          lezat, fitur pencarian yang mudah digunakan, dan komunitas pecinta
          masak yang hangat.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Tentang DiaryFood</h4>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>Home</li>
          <li>Tanya AI</li>
          <li>Resep</li>
          <li>Masuk</li>
          <li>Daftar</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Bantuan</h4>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>Kontak</li>
          <li>Syarat & Ketentuan</li>
          <li>Privasi & Keamanan</li>
        </ul>
      </div>
    </div>
    <div className="flex justify-center mt-6 space-x-4">
      {/* Social icons */}
      <a href="#">
        <i className="fab fa-instagram text-xl"></i>
      </a>
      <a href="#">
        <i className="fab fa-facebook text-xl"></i>
      </a>
      <a href="#">
        <i className="fab fa-twitter text-xl"></i>
      </a>
    </div>
  </footer>
);

export default Footer;
