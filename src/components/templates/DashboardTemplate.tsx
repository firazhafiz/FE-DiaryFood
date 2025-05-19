import React from "react";
import { motion } from "framer-motion";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen ">
      <div className="p-8 ">{children}</div>
    </motion.div>
  );
};
