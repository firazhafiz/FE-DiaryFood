// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Diary Food - Your Recipe Platform",
  description: "Discover, share, and create delicious recipes with Diary Food.",
  openGraph: {
    title: "Diary Food",
    description: "A vibrant community for food enthusiasts to explore and share recipes.",
    url: "/",
    images: ["/assets/images/og-image.jpg"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
};

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" aria-label="Notifications" />
    </AuthProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${workSans.variable}`}>
      <body className="font-poppins">
        <Suspense fallback={<div>Loading...</div>}>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Suspense>
      </body>
    </html>
  );
}
