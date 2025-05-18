import React from "react";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`backdrop-blur-md-80 bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8 mb-8 ${className}`}
    >
      {children}
    </div>
  );
};
