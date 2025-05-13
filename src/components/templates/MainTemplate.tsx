"use client";

import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import HeroBanner from "../organisms/HeroBanner";
import RecipeList from "../organisms/RecipeList";
import ShareSection from "../organisms/ShareSection";
import InfoSection from "../organisms/InfoSection";
import CategoryList from "../organisms/CategoryList";
import Footer from "../organisms/Footer";
import MoreButton from "../atoms/MoreButton";

interface Recipe {
  title: string;
  image: string;
  time: string;
  category: string;
}

interface MainTemplateProps {
  recipes: Recipe[];
}

const MainTemplate: React.FC<MainTemplateProps> = ({ recipes }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 50); // Aktifkan sticky dan dark mode setelah scroll 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      <div suppressHydrationWarning>
        <Header isSticky={isSticky} />
        <main className="max-w-6xl mx-auto px-4">
          <div suppressHydrationWarning>
            <HeroBanner />
          </div>
          <section suppressHydrationWarning>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[color:var(--custom-orange)] text-xl">
                Rekomendasi Terkini
              </h3>
              <h2 className="text-sm text-gray-800 font-semibold hover:text-[color:var(--custom-orange)] cursor-pointer">
                Liat Semua
              </h2>
            </div>
            <RecipeList recipes={recipes} />
          </section>
          <div suppressHydrationWarning className="my-8">
            <ShareSection />
          </div>
          <section>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[color:var(--custom-orange)] text-xl">
                Cepat dan Praktis
              </h3>
              <h2 className="text-sm text-gray-800 font-semibold hover:text-[color:var(--custom-orange)] cursor-pointer">
                Liat Semua
              </h2>
            </div>
            <RecipeList recipes={recipes} />
          </section>
        </main>
        <div suppressHydrationWarning className="my-10">
          <InfoSection />
        </div>
        <main className="max-w-6xl mx-auto px-4 mb-12">
          <section className="mb-10">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[color:var(--custom-orange)] text-xl">
                Resep Pilihan
              </h3>
              <h2 className="text-sm text-gray-800 font-semibold hover:text-[color:var(--custom-orange)] cursor-pointer">
                Liat Semua
              </h2>
            </div>
            <RecipeList recipes={recipes} />
          </section>
          <section suppressHydrationWarning className="mb-10">
            <CategoryList />
          </section>
          <section suppressHydrationWarning>
            <MoreButton />
          </section>
        </main>
        <div suppressHydrationWarning>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;
