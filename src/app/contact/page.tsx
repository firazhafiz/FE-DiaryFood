"use client";

import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import ContactForm from "@/components/molecules/ContactForm";
import ContactInfoCard from "@/components/molecules/ContactInfoCard";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 w-full pt-[120px] pb-16 ">
        <div className="py-6  items-center justify-center text-slate-800">
          <h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
          <p className="text-center font-regular text-sm">
            Wherever you are, we are here to help you.
          </p>
        </div>
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-8">
            <ContactForm />
            <ContactInfoCard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
