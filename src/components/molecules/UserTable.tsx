import React from "react";
import { TableHeader } from "../atoms/TableHeader";
import { TableCell } from "../atoms/TableCell";
import { ActionButton } from "../atoms/ActionButton";

interface User {
  id: string;
  email: string;
  username: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <TableHeader>No</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-colors">Delete</button>
                </div>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
