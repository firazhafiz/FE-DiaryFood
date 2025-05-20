import React from "react";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({  children, className = "" }) => {
  return (
    <div className={`  rounded-3xl  ${className}`}>
      <div className="">{children}</div>
    </div>
  );
};
