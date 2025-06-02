"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import ContactForm from "@/components/molecules/ContactForm";
import ContactInfoCard from "@/components/molecules/ContactInfoCard";
import FaqSite from "@/components/molecules/FaqSite";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className="min-h-screen flex flex-col  ">
      <Navbar />
      <main className="bg-gray-100 flex-1 w-full pt-[115px] pb-16 px-2 mt-6">
        <div className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[color:var(--custom-orange)]">Contact</h1>
          <p className="text-center text-gray-500 mb-8 text-sm max-w-xl mx-auto">Wherever you are, we are here to help you.</p>
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <button className={`px-6 py-2 font-semibold focus:outline-none transition-colors ${activeTab === "customer" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500"}`} onClick={() => setActiveTab("customer")}>
              Feedback & FAQ
            </button>
            <button className={`px-6 py-2 font-semibold focus:outline-none transition-colors ${activeTab === "career" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500"}`} onClick={() => setActiveTab("career")}>
              Contact & Location
            </button>
          </div>
        </div>
        {/* Tab Content */}
        <div className="w-full max-w-5xl mx-auto">
          {activeTab === "customer" ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start mt-8">
              <ContactForm />
              <FaqSite />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-8">
              <ContactInfoCard />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.33316564077393!2d112.7181485361937!3d-7.3167040079847165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb7cfcd5f739%3A0xf4d3f3f67ffddcb7!2sJl.%20Jambangan%20Baru%20II%20No.15%2C%20RT.001%2FRW.04%2C%20Jambangan%2C%20Kec.%20Jambangan%2C%20Surabaya%2C%20Jawa%20Timur%2060232!5e0!3m2!1sid!2sid!4v1747744599226!5m2!1sid!2sid"
                className="border rounded-lg w-full h-full"
                loading="lazy"
                // referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
