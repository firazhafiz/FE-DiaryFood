"use client";

import React from "react";
import useSWR from "swr";

import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import FeedbackSkeleton from "@/components/skeletons/FeedbackSkeleton";
import Image from "next/image";

interface Feedback {
  id: string;
  fullname: string;
  email: string;
  subject: string;
  message: string;
  tanggalFeedback: string;
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
  };
}

// SWR fetcher function with Bearer token
const fetcher = async (url: string) => {
  const token = localStorage.getItem("token"); // Adjust based on your auth setup
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch feedback: ${response.statusText}`);
  }
  const data = await response.json();

  return data.data;
};

// Skeleton component for loading state

const FeedbackPage = () => {
  const {
    data: feedbacks,
    error,
    isLoading,
  } = useSWR<Feedback[], Error>("http://localhost:4000/v1/feedbacks", fetcher, {
    revalidateOnFocus: false, // Optional: adjust based on your needs
    revalidateOnReconnect: true,
  });
  console.log(feedbacks);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-xl font-bold mb-6 text-slate-800">User Feedback</h1>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <FeedbackSkeleton key={index} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center p-10 bg-red-50 rounded-lg">
          <p className="text-red-500">{error.message || "An error occurred while fetching feedback"}</p>
        </div>
      )}

      {!isLoading && !error && (!feedbacks || feedbacks.length === 0) && (
        <div className="text-center p-10 bg-slate-50 rounded-lg mt-4">
          <p className="text-slate-500">No feedback available at the moment.</p>
        </div>
      )}

      {!isLoading && !error && feedbacks && feedbacks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
              {/* Header with user info */}
              <div className="flex flex-col p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                    <Image src={feedback.user.photo} alt={feedback.fullname} height={100} width={100} className="text-orange-500 text-xs object-cover rounded-full" />
                  </div>
                  <h3 className="font-medium text-slate-800 text-sm">{feedback.fullname}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <FaEnvelope className="text-orange-400 text-xs" />
                  <span className="truncate">{feedback.email}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500 mt-2">
                  <FaCalendarAlt className="text-orange-400 mr-2 text-xs" />
                  <span>{new Date(feedback.tanggalFeedback).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-medium text-slate-800 mb-2 text-sm truncate">{feedback.subject}</h4>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{feedback.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
