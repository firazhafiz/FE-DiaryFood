"use client";

import React from "react";

interface InputSearchProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex-grow px-4 py-2 bg-transparent outline-none rounded-l-full ${className}`}
    />
  );
};

export default InputSearch;
