"use client";

import React from "react";

interface InputSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          flex-1 h-full px-4 
          bg-transparent 
          border-0 
          text-gray-800 
          placeholder-gray-400
          placeholder:text-sm
          focus:outline-none 
          focus:ring-0
          disabled:opacity-50 
          disabled:cursor-not-allowed
          transition-all duration-200
          ${className}
        `}
        style={{ display: "flex", alignItems: "center" }}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <div className="h-4 w-px bg-gray-300"></div>
      </div>
    </div>
  );
};

export default InputSearch;
