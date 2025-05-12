"use client";

import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import HeroBanner from "../organisms/HeroBanner";
import RecipeList from "../organisms/RecipeList";
import ShareSection from "../organisms/ShareSection";
import InfoSection from "../organisms/InfoSection";
import CategoryList from "../organisms/CategoryList";
import Footer from "../organisms/Footer";

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      <div suppressHydrationWarning>
        <Header />
        <main className="max-w-6xl mx-auto px-4">
          <div suppressHydrationWarning>
            <HeroBanner />
          </div>
          <section suppressHydrationWarning>
            <h3 className="font-bold text-[color:var(--custom-orange)] text-xl">
              Rekomendasi Terkini
            </h3>
            <RecipeList recipes={recipes} />
          </section>
          <div suppressHydrationWarning>
            <ShareSection />
          </div>
          <div suppressHydrationWarning>
            <InfoSection />
          </div>
          <section suppressHydrationWarning>
            <h3 className="font-bold text-xl mb-4">Kategori Pilihan</h3>
            <CategoryList />
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
