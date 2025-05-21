import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

interface SocialLoginProps {
  googleLogin: () => Promise<void>;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ googleLogin }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex gap-x-6">
        <button onClick={googleLogin} className="cursor-pointer p-3 rounded-full bg-white/50 hover:bg-white/70 transition-all duration-300 shadow-md">
          <FcGoogle className="w-6 h-6" />
        </button>
        <Link href="#" className="p-3 rounded-full bg-white/50 hover:bg-white/70 transition-all duration-300 shadow-md">
          <FaFacebook className="w-6 h-6 text-blue-600" />
        </Link>
      </div>
    </div>
  );
};
