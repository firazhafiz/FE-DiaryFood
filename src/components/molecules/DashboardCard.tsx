import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`  rounded-3xl  ${className}`}>
      <div className="py-6">{children}</div>
    </div>
  );
};
