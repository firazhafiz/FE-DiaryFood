import React, { useState, useRef, useEffect } from "react";
import { FaEllipsis, FaEye, FaTrash } from "react-icons/fa6";

interface User {
  id: string;
  email: string;
  username: string;
}

interface UserTableProps {
  users: User[];
  onDelete?: (id: string) => void;
  onShow?: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onShow }) => {
  return (
    <div className="">
      <div className="flex justify-between py-2 px-6">
        <p className="text-slate-700 font-medium text-sm">No</p>
        <p className="text-slate-700 font-medium text-sm">Email</p>
        <p className="text-slate-700 font-medium text-sm">Actions</p>
      </div>

      <div className="flex flex-col gap-2">
        {users.map((user, index) => (
          <UserRow key={user.id} {...user} index={index + 1} onDelete={onDelete} onShow={onShow} />
        ))}
      </div>
    </div>
  );
};

interface UserRowProps extends User {
  index: number;
  onDelete?: (id: string) => void;
  onShow?: (id: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ id, email, username, index, onDelete, onShow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsConfirmingDelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle showing user details
  const handleShow = () => {
    if (onShow) {
      onShow(id);
      setIsOpen(false);
    }
  };

  // Handle deletion with confirmation
  const handleDelete = () => {
    if (isConfirmingDelete) {
      if (onDelete) {
        onDelete(id);
      }
      setIsOpen(false);
      setIsConfirmingDelete(false);
    } else {
      setIsConfirmingDelete(true);
    }
  };

  // Cancel delete confirmation
  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(false);
  };

  return (
    <div id={id} className="flex justify-between items-center bg-white/60 border-2 rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-slate-700 font-medium">{index}</div>
        <img src="/assets/images/image_login.png" alt="user" className="w-10 h-10 rounded-full" />
        <p className="text-slate-700 font-medium">{username}</p>
      </div>

      <p className="text-slate-700 font-medium">{email}</p>

      <div className="relative" ref={dropdownRef}>
        <button className="cursor-pointer text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="User actions">
          <FaEllipsis />
        </button>

        {isOpen && (
          <div className="absolute top-10 right-0 z-10">
            <div className="bg-white shadow-lg rounded-xl py-1 min-w-32 border border-slate-100">
              {!isConfirmingDelete ? (
                <>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleShow}>
                    <FaEye className="text-slate-500" />
                    <span>Show</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 font-medium text-sm hover:bg-slate-50 transition-colors" onClick={handleDelete}>
                    <FaTrash className="text-red-500" />
                    <span>Delete</span>
                  </button>
                </>
              ) : (
                <div className="p-3">
                  <p className="text-slate-700 font-medium text-sm mb-2">Are you sure you want to delete this user?</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors" onClick={handleDelete}>
                      Confirm
                    </button>
                    <button className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-300 transition-colors" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
