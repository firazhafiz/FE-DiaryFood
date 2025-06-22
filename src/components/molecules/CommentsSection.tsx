"use client";

import { Comment } from "@/types/recipe-detail";
import { useState } from "react";

type CommentsSectionProps = {
  recipeId: string;
  initialComments: Comment[];
  totalComments: number;
  onCommentAdded: (newComment: Comment, newTotal: number) => void;
};

export default function CommentsSection({ recipeId, initialComments, totalComments, onCommentAdded }: CommentsSectionProps) {
  // Example: Form for adding comments
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to add comment
    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentText,
      rating: 5,
      createdAt: new Date(),
      resepId: parseInt(recipeId),
      user: { id: 1, name: "User", photo: "" },
    };
    onCommentAdded(newComment, totalComments + 1);
    setCommentText("");
  };

  return (
    <div>
      <h2>Komentar ({totalComments})</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Tulis komentar..." />
        <button type="submit">Kirim</button>
      </form>
      {initialComments.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
}
