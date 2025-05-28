// frontend/components/skeletons/EditRecipeSkeleton.tsx
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const EditRecipeSkeleton = () => {
  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="inline-flex items-center gap-2 mb-6">
        <FaArrowLeft className="w-4 h-4 text-gray-200" />
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-6">
            <div>
              <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between mb-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-grow h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/3 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between mb-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-grow h-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between mb-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeSkeleton;
