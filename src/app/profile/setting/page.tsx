// src/app/settings/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

function SettingPageContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    try {
      logout(); // Panggil fungsi logout dari AuthContext
      toast.success("Berhasil logout!");
      setTimeout(() => {
        router.push("/");
      }, 1000); // Beri jeda untuk menampilkan toast
    } catch (error) {
      console.error("Error saat logout:", error);
      toast.error("Gagal logout. Silakan coba lagi.");
    } finally {
      setShowLogoutModal(false);
    }
  };

  return (
    <Suspense>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
        <div className="flex flex-col gap-8">
          <div className="mb-4">
            <h4 className="text-slate-700 font-semibold mb-2">
              Delete Account
            </h4>
            <div className="rounded-md bg-white/50 backdrop-blur-sm p-6 flex justify-between items-center gap-8">
              <div className="max-w-3xl">
                <p className="font-semibold text-slate-700">
                  Do you want to delete your account?
                </p>
                <p className="text-slate-700 text-sm mt-2">
                  Once you delete your account, things related to your personal
                  information will be disabled, including:
                </p>
                <ul className="text-decoration text-slate-700 list-disc ml-4 text-sm mt-2 space-y-1">
                  <li>Personal data.</li>
                  <li>Engagement from promotional campaigns.</li>
                  <li>
                    For event creators, your event history will be lost after
                    account deletion.
                  </li>
                </ul>
              </div>
              <button className="bg-[#FF7A5C] text-white py-2 px-6 rounded-md hover:bg-[#ff6b4a] transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-slate-700 font-semibold mb-2">
              Log Out Account
            </h4>
            <div className="rounded-md bg-white/50 backdrop-blur-sm p-6 flex justify-between items-center gap-8">
              <p className="font-semibold text-slate-700">
                Do you want to log out from your account?
              </p>
              <button
                className="bg-[#FF7A5C] text-white py-2 px-6 rounded-md hover:bg-[#ff6b4a] transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Log Out
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin keluar dari akun Anda?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#FF7A5C] hover:bg-[#ff6b4a] rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Suspense>
  );
}

export default function SettingPage() {
  return (
    <AuthProvider>
      <SettingPageContent />
    </AuthProvider>
  );
}
