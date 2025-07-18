// components/skeletons/RecipeTableSkeleton.tsx
import React from "react";
import { DashboardCard } from "../molecules/DashboardCard";

const RecipeTableSkeleton = () => {
  return (
    <DashboardCard>
      <div className="flex flex-col gap-4  mt-4">
        <div className="mt-4 flex justify-between">
          <div className="bg-white h-8 w-28 rounded-lg animate-pulse"></div>
          <div className="flex gap-4">
            <div className="bg-white h-8 w-56 rounded-lg animate-pulse"></div>
            <div className="bg-white h-8 w-28 rounded-lg animate-pulse"></div>
          </div>
        </div>
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded-2xl mt-6 ">
          <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-100 rounded animate-pulse"></div>
        </div>
        {/* Table Rows */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 p-4  rounded-2xl bg-white border-b animate-pulse"
          >
            <div className="h-24 w-full  rounded-2xl animate-pulse"></div>
            <div className="h-24 w-full  rounded-2xl animate-pulse"></div>
            <div className="h-24 w-full  rounded-2xl animate-pulse"></div>
            <div className="h-24 w-full  rounded-2xl animate-pulse"></div>
            <div className="h-24 w-full  rounded-2xl animate-pulse"></div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecipeTableSkeleton;
