// components/skeletons/ProfileSkeleton.tsx
import React from "react";
import { ProfileTemplate } from "@/components/templates/ProfileTemplate";

const ProfileSkeleton = () => {
  return (
    <ProfileTemplate>
      <div className="flex justify-between mb-6">
        <div className="h-8 w-32 bg-white rounded animate-pulse"></div>
        <div className="text-right">
          <div className="h-5 w-24 bg-white rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-white rounded animate-pulse mt-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-36 h-36 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="pr-8">
            <div className="h-10 w-20 bg-white rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <div className="h-5 w-24 bg-white rounded animate-pulse mb-1"></div>
            <div className="h-10 w-full bg-white rounded-md animate-pulse"></div>
          </div>
          <div>
            <div className="h-5 w-24 bg-white rounded animate-pulse mb-1"></div>
            <div className="h-10 w-full bg-white rounded-md animate-pulse"></div>
          </div>
          <div>
            <div className="h-5 w-24 bg-white rounded animate-pulse mb-1"></div>
            <div className="h-10 w-full bg-white rounded-md animate-pulse"></div>
          </div>
          <div>
            <div className="h-5 w-24 bg-white rounded animate-pulse mb-1"></div>
            <div className="h-10 w-full bg-white rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </ProfileTemplate>
  );
};

export default ProfileSkeleton;
