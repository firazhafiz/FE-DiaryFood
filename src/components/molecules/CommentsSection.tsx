"use client";

import React, { useState } from "react";

interface User {
  name: string;
  avatar: string;
}

interface Reply {
  user: User;
  text: string;
  time: string;
  likes: number;
  id: string;
}

interface Comment {
  user: User;
  text: string;
  time: string;
  likes: number;
  replies: Reply[];
  id: string;
}

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments: initialComments,
}) => {
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );
  const [likedReplies, setLikedReplies] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the comment to your backend
    console.log("Submitting comment:", newComment);
    setNewComment("");
  };

  // Toggle like on a comment
  const handleLikeComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          const isLiked = likedComments[commentId];
          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );

    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Toggle like on a reply
  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === replyId) {
                const isLiked = likedReplies[replyId];
                return {
                  ...reply,
                  likes: isLiked ? reply.likes - 1 : reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      })
    );

    setLikedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  // Only show the first 2 comments by default, or all if showAllComments is true
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="mt-8 max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
        {comments.length > 2 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-sm text-[color:var(--custom-orange)] hover:text-orange-700 transition-colors"
          >
            {showAllComments ? "Show less" : "Show all"}
          </button>
        )}
      </div>

      {/* Comment form - more compact */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <img
            src="/assets/images/image_login.png"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 text-gray-800 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[color:var(--custom-orange)] focus:border-transparent"
              rows={2}
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-1.5 text-sm bg-[color:var(--custom-orange)] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments list - more compact */}
      <div className="space-y-4">
        {displayedComments.map((comment, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex gap-3">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">
                      {comment.user.name}
                    </h4>
                    <p className="text-xs text-gray-500">{comment.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className={`${
                        likedComments[comment.id]
                          ? "text-[color:var(--custom-orange)]"
                          : "text-gray-400 hover:text-[color:var(--custom-orange)]"
                      }`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <svg
                        width="14"
                        height="14"
                        fill={
                          likedComments[comment.id] ? "currentColor" : "none"
                        }
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-500">
                      {comment.likes}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-700">{comment.text}</p>

                {/* Reply button */}
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

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l border-gray-100 space-y-3">
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="flex gap-2">
                        <img
                          src={reply.user.avatar}
                          alt={reply.user.name}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-semibold text-xs text-gray-900">
                                {reply.user.name}
                              </h5>
                              <p className="text-xs text-gray-500">
                                {reply.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <button
                                className={`${
                                  likedReplies[reply.id]
                                    ? "text-[color:var(--custom-orange)]"
                                    : "text-gray-400 hover:text-[color:var(--custom-orange)]"
                                }`}
                                onClick={() =>
                                  handleLikeReply(comment.id, reply.id)
                                }
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  fill={
                                    likedReplies[reply.id]
                                      ? "currentColor"
                                      : "none"
                                  }
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                              </button>
                              <span className="text-xs text-gray-500">
                                {reply.likes}
                              </span>
                            </div>
                          </div>
                          <p className="mt-1 text-xs text-gray-700">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
