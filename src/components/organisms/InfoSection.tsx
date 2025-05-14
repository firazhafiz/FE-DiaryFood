"use client";

import React from "react";
import InfoFeature from "../molecules/InfoFeature";
import { FaBlender, FaListAlt, FaSmile } from "react-icons/fa";

const InfoSection = () => (
  <section className="w-full py-12 px-4 md:px-8 bg-gradient-to-br from-orange-50 to-orange-100">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Kenapa Memilih Kami?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-md">
          Temukan pengalaman memasak yang menyenangkan dengan berbagai fitur
          unggulan kami
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <InfoFeature
            icon={
              <FaBlender className="text-4xl text-[color:var(--custom-orange)] mb-4" />
            }
            title="Mudah & Praktis"
            description="Cari dan buat resep favoritmu dengan mudah, dilengkapi panduan langkah demi langkah"
          />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <InfoFeature
            icon={
              <FaListAlt className="text-4xl text-[color:var(--custom-orange)] mb-4" />
            }
            title="Resep Beragam"
            description="Ribuan resep pilihan dari berbagai kategori dan tingkat kesulitan"
          />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <InfoFeature
            icon={
              <FaSmile className="text-4xl text-[color:var(--custom-orange)] mb-4" />
            }
            title="Pengalaman Seru"
            description="Nikmati proses memasak yang menyenangkan dengan tips dan trik dari para ahli"
          />
        </div>
      </div>
    </div>
  </section>
);

export default InfoSection;
