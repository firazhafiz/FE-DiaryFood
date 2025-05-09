import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <h1 className={`text-2xl font-bold text-orange-600 ${className}`}>
      Diary<span className="text-slate-800">Food</span>
    </h1>
  );
};
