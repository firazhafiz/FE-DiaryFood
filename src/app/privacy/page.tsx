"use client";

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { privacySections } from "@/data/privacy";

export default function PrivacySecurity() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="bg-gray-100 flex w-full pt-[115px] pb-16 px-2 mt-6">
        <div className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[color:var(--custom-orange)]">
            Privacy & Policy
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm max-w-xl mx-auto">
            The following privacy and security policies apply to all services,
            features, and content available on the DiaryFood website.
          </p>
          <div className="space-y-8">
            {privacySections.map((section, idx) => (
              <section key={idx}>
                <h2 className="font-bold text-lg mb-2 text-gray-900">
                  {section.title}
                </h2>
                <div className="text-gray-700 text-sm leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
