import React from "react";
import { FcGoogle } from "react-icons/fc";

interface SocialLoginProps {
  googleLogin: () => Promise<void>;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ googleLogin }) => {
  return (
    <div className="box-border flex flex-col items-center gap-4">
      <div className="relative w-full flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div
        className="cursor-pointer flex flex-row w-full justify-center items-center gap-2 py-2.5 rounded-full bg-white/30 hover:bg-white/70 hover:border hover:border-gray-500/50 transition-all duration-300"
        onClick={googleLogin}
        style={{ minHeight: "50px" }}
      >
        <button className="flex items-center bg-transparent focus:outline-none">
          <FcGoogle size={25} />
        </button>
        <h1 className="text-sm text-gray-500 font-medium">
          Continue with Google
        </h1>
      </div>
    </div>
  );
};
