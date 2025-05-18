import React from "react";
import { Input } from "../atoms/Input";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

interface FormFieldWithIconProps {
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const FormFieldWithIcon: React.FC<FormFieldWithIconProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}) => {
  const getIcon = () => {
    switch (type) {
      case "email":
        return <MdOutlineEmail className="w-5 h-5 text-gray-400" />;
      case "password":
        return <MdLockOutline className="w-5 h-5 text-gray-400" />;
      default:
        return <FaRegUser className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
        {getIcon()}
      </div>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full pl-10 px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/20 focus:ring-2 focus:ring-orange-200 focus:border-transparent text-gray-700 placeholder-gray-400 ${className}`}
      />
    </div>
  );
};
