import React from "react";
import { FaUser, FaEnvelope, FaComment, FaCalendarAlt } from "react-icons/fa";

interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Temporary mock data - replace with actual API call
const mockFeedbacks: Feedback[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Great Service!",
    message: "I really enjoyed using your platform. The recipes are amazing!",
    createdAt: "2024-03-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Feature Request",
    message: "It would be great to have more vegetarian options.",
    createdAt: "2024-03-19",
  },
];

const FeedbackPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-slate-800">User Feedback</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockFeedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
            {/* Header with user info */}
            <div className="flex flex-col p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                  <FaUser className="text-orange-500 text-xs" />
                </div>
                <h3 className="font-medium text-slate-800 text-sm">{feedback.name}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FaEnvelope className="text-orange-400 text-xs" />
                <span className="truncate">{feedback.email}</span>
              </div>
              <div className="flex items-center text-xs text-slate-500 mt-2">
                <FaCalendarAlt className="text-orange-400 mr-2 text-xs" />
                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
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

      {mockFeedbacks.length === 0 && (
        <div className="text-center p-10 bg-slate-50 rounded-lg mt-4">
          <p className="text-slate-500">No feedback available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
