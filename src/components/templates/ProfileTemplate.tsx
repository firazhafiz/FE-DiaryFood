import React from "react";
import { motion } from "framer-motion";

interface ProfileTemplateProps {
  children: React.ReactNode;
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen ">
      <div className="py-2">
        <div className="w-full">{children}</div>
      </div>
    </motion.div>
  );
};
