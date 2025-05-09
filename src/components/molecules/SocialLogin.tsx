import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SocialButton } from "../atoms/SocialButton";

export const SocialLogin: React.FC = () => {
  return (
    <div className="flex gap-x-4">
      <SocialButton icon={FcGoogle} text="Google" variant="google" />
      <SocialButton icon={FaFacebook} text="Facebook" variant="facebook" />
    </div>
  );
};
