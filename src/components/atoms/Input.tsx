import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        className={`w-full p-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--custom-orange)] ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
