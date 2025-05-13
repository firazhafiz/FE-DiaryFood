"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import Link from "next/link";

const Footer = () => (
  <footer className="bg-gradient-to-b from-gray-100 to-blue-100 py-8 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start justify-center text-center md:text-left place-items-center md:place-items-start justify-items-center md:justify-items-center transition-all duration-300">
      {/* Kiri: Logo & Deskripsi */}
      <div>
        <div className="mb-2">
          <span
            className="font-bold text-2xl md:text-3xl"
            style={{ color: "var(--custom-orange)" }}
          >
            Diary
          </span>
          <span className="font-bold text-2xl md:text-3xl text-gray-900">
            Food
          </span>
        </div>
        <p className="text-gray-700 text-base md:text-[16px] max-w-xs leading-relaxed">
          DiaryFood adalah website resep masakan dengan beragam pilihan menu
          lezat, fitur pencarian yang mudah digunakan, dan komunitas pecinta
          masak yang hangat. Temukan inspirasi, bagikan kreasi, dan mari masak
          bersama!
        </p>
      </div>
      {/* Tengah: Tentang DiaryFood */}
      <div>
        <h4 className="font-bold text-base md:text-lg mb-3 text-gray-900">
          Tentang DiaryFood
        </h4>
        <ul className="text-gray-700 text-base space-y-1">
          <li>
            <Link href="/" className="hover:text-[color:var(--custom-orange)]">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tanya-ai"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Tanya AI
            </Link>
          </li>
          <li>
            <Link
              href="/resep"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Resep
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Masuk
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Daftar
            </Link>
          </li>
        </ul>
      </div>
      {/* Kanan: Bantuan */}
      <div>
        <h4 className="font-bold text-base md:text-lg mb-3 text-gray-900">
          Bantuan
        </h4>
        <ul className="text-gray-700 text-base space-y-1">
          <li>
            <Link
              href="/kontak"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Kontak
            </Link>
          </li>
          <li>
            <Link
              href="/syarat-ketentuan"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Syarat & Ketentuan
            </Link>
          </li>
          <li>
            <Link
              href="/privasi"
              className="hover:text-[color:var(--custom-orange)]"
            >
              Privasi & Keamanan
            </Link>
          </li>
        </ul>
      </div>
    </div>
    {/* Ikuti Kami */}
    <div className="mt-12 flex flex-col items-center">
      <div className="font-bold text-base md:text-lg mb-3 text-gray-900">
        Ikuti Kami
      </div>
      <div className="flex space-x-6">
        <a
          href="#"
          aria-label="Instagram"
          className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors text-2xl"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors text-2xl"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          aria-label="LinkedIn"
          className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors text-2xl"
        >
          <FaLinkedin />
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="text-gray-700 hover:text-[color:var(--custom-orange)] transition-colors text-2xl"
        >
          <FaFacebook />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
