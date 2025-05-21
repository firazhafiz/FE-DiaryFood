import Link from "next/link";
import React from "react";

interface TitleProps {
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ className = "" }) => {
  return (
    <Link href="/">
      <h1
        className={`text-xl font-bold text-[color:var(--custom-orange)] ${className}`}
      >
        Diary<span className="text-slate-800">Food</span>
      </h1>
    </Link>
  );
};
