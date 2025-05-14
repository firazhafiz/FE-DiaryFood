"use client";

import React, { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";

interface Recipe {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  submittedAt: string;
}

export default function ApproveRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "Spaghetti Carbonara",
      author: "John Doe",
      category: "Italian",
      status: "pending",
      submittedAt: "2024-03-20",
    },
    {
      id: "2",
      title: "Spaghetti Carbonara",
      author: "John Doe",
      category: "Italian",
      status: "pending",
      submittedAt: "2024-03-20",
    },
    // Add more sample data as needed
  ]);

  const handleAccept = async (id: string) => {
    try {
      // TODO: Add your API call here
      Swal.fire({
        title: "Recipe Accepted!",
        text: "The recipe has been approved successfully.",
        icon: "success",
        confirmButtonColor: "#ff725e",
      });

      // Update local state
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to accept the recipe. Please try again.",
        icon: "error",
        confirmButtonColor: "#ff725e",
      });
    }
  };

  const handleReject = async (id: string) => {
    const { value: formValues } = await Swal.fire({
      title: "Reject Recipe",
      html:
        '<div class="mb-4">' +
        '<label class="block text-gray-700 text-sm font-bold mb-2">Reason for Rejection</label>' +
        '<textarea id="reason" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>' +
        "</div>",
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#ff725e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Reject Recipe",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = (document.getElementById("reason") as HTMLTextAreaElement).value;
        if (!reason) {
          Swal.showValidationMessage("Please provide a reason for rejection");
          return false;
        }
        return reason;
      },
    });

    if (formValues) {
      try {
        // TODO: Add your API call here with the rejection reason
        Swal.fire({
          title: "Recipe Rejected",
          text: "The recipe has been rejected successfully.",
          icon: "success",
          confirmButtonColor: "#ff725e",
        });

        // Update local state
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to reject the recipe. Please try again.",
          icon: "error",
          confirmButtonColor: "#ff725e",
        });
      }
    }
  };

  const handleView = (id: string) => {
    // TODO: Implement view recipe details
    Swal.fire({
      title: "View Recipe",
      text: "Recipe details will be shown here",
      icon: "info",
      confirmButtonColor: "#ff725e",
    });
  };

  return (
    <div className="bg-white/60 rounded-3xl shadow overflow-hidden">
      <div className="px-6 py-4 mb-6 ">
        <h2 className="text-lg  font-semibold text-gray-800">Recipe Approvals</h2>
        <p className="mt-1 text-sm text-gray-600">Review and manage pending recipe submissions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead className=" border-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Recipe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className=" ">
            {recipes.map((recipe) => (
              <tr key={recipe.id} className="divide-y divide-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{recipe.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{recipe.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{recipe.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recipe.submittedAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => handleView(recipe.id)} className="text-blue-600 hover:text-blue-900" title="View Recipe">
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleAccept(recipe.id)} className="text-green-600 hover:text-green-900" title="Accept Recipe">
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleReject(recipe.id)} className="text-red-600 hover:text-red-900" title="Reject Recipe">
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No pending recipes to review</p>
        </div>
      )}
    </div>
  );
}
