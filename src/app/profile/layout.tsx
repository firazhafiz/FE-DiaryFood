import ProfileSidebar from "@/components/molecules/ProfileSIdebar";
import { Suspense } from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="min-h-screen relative">
        {/* Background gradient with blur effect - improved colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200  to-violet-200 z-0"></div>

        {/* Decorative blobs for more visual interest */}
        <div className="h-[500px] w-[400px] rounded-full blur-3xl bg-purple-100 absolute top-20 right-50 z-0 opacity-60"></div>
        <div className="h-[500px] w-[600px] rounded-full blur-3xl backdrop-blur-3xl bg-blue-100 absolute top-5 left-10 z-0 opacity-60"></div>

        <div className="flex relative z-10">
          {/* Sidebar with improved glassmorphism effect */}
          <ProfileSidebar />

          {/* Main Content - 4/5 width */}
          <div className="w-5/6 ml-[17%]">
            <div className="my-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Content container with subtle glass effect */}
                <div className="bg-white/30 backdrop-blur-sm overflow-hidden rounded-2xl border-2 border-white/60 shadow">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
