"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Suspense } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-8">
            <h1 className="text-9xl font-bold text-purple-600">404</h1>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">The page you&apos;re looking for seems to have vanished into thin air. Don&apos;t worry, let&apos;s get you back on track!</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <Link
              href="/"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full 
            hover:bg-purple-700 transition-colors duration-300 
            shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Back to Home
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-12">
            <div
              className="w-24 h-24 mx-auto border-4 border-purple-200 rounded-full 
            animate-spin border-t-purple-600"></div>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}
