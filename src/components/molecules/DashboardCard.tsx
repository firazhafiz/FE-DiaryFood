import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`  rounded-3xl  ${className}`}>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
