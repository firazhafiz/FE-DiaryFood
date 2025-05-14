import React from "react";
import { TableHeader } from "../atoms/TableHeader";
import { TableCell } from "../atoms/TableCell";
import { ActionButton } from "../atoms/ActionButton";

interface Recipe {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft";
}

interface RecipeTableProps {
  recipes: Recipe[];
  onShow: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RecipeTable: React.FC<RecipeTableProps> = ({ recipes, onShow, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <TableCell>{recipe.title}</TableCell>
              <TableCell>{recipe.author}</TableCell>
              <TableCell>{recipe.date}</TableCell>
              <TableCell>{recipe.category}</TableCell>
              <TableCell>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${recipe.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{recipe.status}</span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <ActionButton type="show" onClick={() => onShow(recipe.id)} />
                  <ActionButton type="delete" onClick={() => onDelete(recipe.id)} />
                </div>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
