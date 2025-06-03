"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";

interface ProfileTemplateProps {
  children: React.ReactNode;
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen ">
        <div className="">
          <div className="w-full p-8">{children}</div>
        </div>
      </motion.div>
    </Suspense>
  );
};
