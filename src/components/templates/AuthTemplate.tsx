import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import Image from "next/image";

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  // Variants untuk animasi
  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: {
      x: -100, // Selalu mulai dari kiri
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
      },
    },
  };

  return (
    <Suspense>
      <div className="fixed inset-0 h-screen w-screen overflow-hidden">
        <Image
          src="/assets/images/image_login.jpg"
          alt="Login background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <motion.div className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8" variants={containerVariants} initial="hidden" animate="visible">
          <div className="w-full max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key="content" variants={contentVariants} className="w-full max-w-md mx-auto lg:mx-0 lg:ml-20 px-4 sm:px-0">
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Suspense>
  );
};
