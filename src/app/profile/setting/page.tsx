"use client";

import { useRouter } from "next/navigation";

const SettingPage = () => {
  const router = useRouter();

  function handleLogout() {
    router.push("/login");
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      <div className="flex flex-col gap-8">
        <div className="mb-4">
          <h4 className="text-slate-700 font-semibold mb-2">Delete Account</h4>
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
            <button className="bg-[#FF7A5C] text-white py-2 px-6 rounded-md hover:bg-[#ff6b4a] transition-colors cursor-pointer ">
              Delete
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-slate-700 font-semibold mb-2">Log Out Account</h4>
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
    </div>
  );
};

export default SettingPage;
