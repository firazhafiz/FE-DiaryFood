"use client";

import React from "react";
import InfoFeature from "../molecules/InfoFeature";
import { FaBlender, FaListAlt, FaSmile } from "react-icons/fa";

const InfoSection = () => (
  <section className="w-full py-12 px-4 md:px-8 bg-gradient-to-br from-orange-50 to-orange-100">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-md">Discover an enjoyable cooking experience with our outstanding features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <InfoFeature icon={<FaBlender className="text-4xl text-[color:var(--custom-orange)] mb-4" />} title="Easy & Practical" description="Find and create your favorite recipes easily, complete with step-by-step guides" />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <InfoFeature icon={<FaListAlt className="text-4xl text-[color:var(--custom-orange)] mb-4" />} title="Diverse Recipes" description="Thousands of selected recipes from various categories and difficulty levels" />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <InfoFeature icon={<FaSmile className="text-4xl text-[color:var(--custom-orange)] mb-4" />} title="Community Support" description="Join our community of food lovers and share your cooking journey" />
        </div>
      </div>
    </div>
  </section>
);

export default InfoSection;
