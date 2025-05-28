"use client";

import React, { useState } from "react";

const CommentsSection = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rating:", rating, "Comment:", comment);
    // Handle submission logic here
  };

  return (
    <div className="mt-8 max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Comments (2)</h2>
        <button className="text-sm text-[color:var(--custom-orange)] hover:text-orange-700 transition-colors">
          Show all
        </button>
      </div>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <img
            src="/assets/images/image_login.jpg"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-grow">
            <div className="mb-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= rating ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-300">★</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Add a comment..."
              className="w-full bg-white px-3 py-2 text-gray-800 text-sm border rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-[color:var(--custom-orange)] focus:border-transparent"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 text-sm bg-[color:var(--custom-orange)] text-white font-medium rounded-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex gap-3">
            <img
              src="/assets/images/image_login.png"
              alt="User"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    User 1
                  </h4>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 hover:text-[color:var(--custom-orange)]">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500">0</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                This is a dummy comment.
              </p>
              <button className="mt-1 text-xs text-gray-500 hover:text-[color:var(--custom-orange)] flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex gap-3">
            <img
              src="/assets/images/image_login.png"
              alt="User"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    User 2
                  </h4>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 hover:text-[color:var(--custom-orange)]">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500">0</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                Another dummy comment.
              </p>
              <button className="mt-1 text-xs text-gray-500 hover:text-[color:var(--custom-orange)] flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
