import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={` bg-white/60 rounded-3xl overflow-hidden ${className}`}>
      <div className="px-4 py-5 sm:px-6  ">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
