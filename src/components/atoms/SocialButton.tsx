import React from "react";
import { IconType } from "react-icons";

interface SocialButtonProps {
  icon: IconType;
  text: string;
  onClick?: () => void;
  variant?: "google" | "facebook";
}

export const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon, text, onClick, variant = "google" }) => {
  const variantStyles = {
    google: "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100",
    facebook: "bg-blue-600 text-white hover:bg-sky-600",
  };

  return (
    <button className={`flex items-center justify-center py-3 px-[45px] rounded-md ${variantStyles[variant]}`} onClick={onClick}>
      <Icon className="w-6 h-6 mr-2" />
      <span>{text}</span>
    </button>
  );
};
