import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    url: "/", // Relative path resolved by metadataBase
    images: ["/assets/images/og-image.jpg"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"), // Dynamic base URL
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${workSans.variable}`}>
      <body suppressHydrationWarning className="font-poppins">
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF7A5C] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading...</p>
                </div>
              </div>
            }>
            {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
