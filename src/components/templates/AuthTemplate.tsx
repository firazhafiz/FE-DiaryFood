import React from "react";
import Image from "next/image";
import { ImageLogin, ImageRegister } from "../../../public/assets/index";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  // Tentukan gambar berdasarkan path
  const authImage = isLogin ? ImageLogin : ImageRegister;
  const imageAlt = isLogin ? "Login" : "Register";

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

  const imageVariants = {
    hidden: {
      x: isLogin ? -100 : 100,
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

  const contentVariants = {
    hidden: {
      x: isLogin ? 100 : -100,
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
    <motion.div className={`flex h-screen  bg-white ${!isLogin ? "flex-row-reverse" : ""}`} variants={containerVariants} initial="hidden" animate="visible">
      <AnimatePresence mode="wait">
        <motion.div key="content" variants={contentVariants} className="w-full max-w-md m-auto">
          {children}
        </motion.div>
      </AnimatePresence>

      <motion.div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" variants={imageVariants}>
        <Image src={authImage} alt={imageAlt} className="w-full h-full object-contain py-10" priority />
      </motion.div>
    </motion.div>
  );
};
