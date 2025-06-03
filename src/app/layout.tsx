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

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Suspense>
      </body>
    </html>
  );
}
