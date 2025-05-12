"use client";

import React from "react";

const ShareSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow p-8 my-8">
    <div className="flex gap-4 mb-4 md:mb-0">
      <img
        src="/share1.jpg"
        alt="Share 1"
        className="w-32 h-32 rounded-lg object-cover"
      />
      <img
        src="/share2.jpg"
        alt="Share 2"
        className="w-32 h-32 rounded-lg object-cover"
      />
    </div>
    <div className="flex-1 ml-0 md:ml-8">
      <h3 className="text-2xl font-bold mb-2">
        Bagikan <span className="text-[color:var(--custom-orange)]">Resep</span>{" "}
        Anda
      </h3>
      <p className="mb-4 text-gray-600">
        Tunjukkan kreasi masakan favoritmu dengan mengunggah resep lengkap
        beserta foto, langkah memasak, dan tips andalan.
      </p>
      <button
        className="px-6 py-2"
        style={{
          background: "var(--custom-orange)",
          color: "white",
          borderRadius: "0.5rem",
          fontWeight: "600",
        }}
      >
        Buat Resep Sekarang
      </button>
    </div>
  </div>
);

export default ShareSection;
