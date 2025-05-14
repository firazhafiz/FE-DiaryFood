import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = "" }) => {
  return <td className={`px-6 py-4 whitespace-nowrap text-xs text-slate-500 ${className}`}>{children}</td>;
};
