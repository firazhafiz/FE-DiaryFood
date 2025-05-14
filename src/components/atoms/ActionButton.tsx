import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface ActionButtonProps {
  type: "show" | "edit" | "delete";
  onClick: () => void;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, className = "" }) => {
  const buttonStyles = {
    show: "text-slate-700 hover:text-slate-900",
    edit: "text-yellow-600 hover:text-yellow-900",
    delete: "text-red-400 hover:text-red-500",
  };

  const icons = {
    show: FaEye,
    edit: FaEdit,
    delete: FaTrash,
  };

  const Icon = icons[type];

  return (
    <button onClick={onClick} className={`p-2 rounded-full  ${buttonStyles[type]} ${className}`}>
      <Icon className="w-4 h-4" />
    </button>
  );
};
