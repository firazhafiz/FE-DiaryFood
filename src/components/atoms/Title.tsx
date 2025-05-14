import React from "react";

interface TitleProps {
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ className = "" }) => {
  return (
    <h1 className={`text-2xl font-bold text-[color:var(--custom-orange)] ${className}`}>
      Diary<span className="text-slate-800">Food</span>
    </h1>
  );
};
