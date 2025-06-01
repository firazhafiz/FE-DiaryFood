"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Comment } from "@/types/comments";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CommentsSectionProps {
  comments: Comment[] | undefined;
  loading: boolean;
  recipeId: string;
  onCommentAdded: (newComment: Comment, newTotal: number) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, loading, recipeId, onCommentAdded }) => {
  const router = useRouter();
  const { currentUser, isLoggedIn } = useAuth();
  const [localComments, setLocalComments] = useState<Comment[]>(comments || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLocalComments(comments || []);
  }, [comments]);

  const handleRatingChange = (value: number) => {
    setRating(value);
    console.log(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn || !currentUser) {
      setSubmitError("Silakan login untuk mengirim komentar");
      toast.error("Silakan login untuk mengirim komentar");
      router.push("/login");
      return;
    }
    if (!comment.trim()) {
      setSubmitError("Komentar tidak boleh kosong");
      toast.error("Komentar tidak boleh kosong");
      return;
    }
    if (rating === 0) {
      setSubmitError("Silakan beri rating sebelum mengirim");
      toast.error("Silakan beri rating sebelum mengirim");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);

    // Optimistic update
    const optimisticComment: Comment = {
      id: Date.now().toString(), // Gunakan string untuk unik
      content: comment,
      rating: rating,
      createdAt: new Date().toISOString(),
      resepId: parseInt(recipeId),
      user: {
        id: currentUser.id,
        name: currentUser.name || "Anonymous",
        photo: currentUser.photo || "/default-avatar.jpg",
      },
    };
    console.log(optimisticComment);
    setLocalComments([optimisticComment, ...localComments]);
    setComment("");
    setRating(0);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }
      const response = await fetch(`http://localhost:4000/v1/resep/${recipeId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, rating }), // Kirim rating ke backend
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setSubmitError("Sesi habis. Silakan login kembali.");
          toast.error("Sesi habis. Silakan login kembali.");
          localStorage.removeItem("token");
          router.push("/login");
          throw new Error("Unauthorized");
        }
        throw new Error("Gagal mengirim komentar");
      }

      const result = await response.json();
      const newComment = {
        ...result.data,
        user: {
          id: currentUser.id,
          name: currentUser.name || "Anonymous",
          photo: currentUser.photo || "/default-avatar.jpg",
        },
      };
      setLocalComments((prev) => [newComment, ...prev.filter((c) => c.id !== optimisticComment.id)]);
      onCommentAdded(newComment, (comments?.length || 0) + 1);
      toast.success("Komentar dan rating berhasil dikirim!");
    } catch (err) {
      setLocalComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
      setSubmitError(err instanceof Error ? err.message : "Gagal mengirim komentar");
      toast.error(err instanceof Error ? err.message : "Gagal mengirim komentar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRelativeTime = (createdAt: Date | string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMs = now.getTime() - created.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} menit yang lalu`;
    }
    return `${diffInHours} jam yang lalu`;
  };

  if (loading) {
    return <div className="mt-8 max-w-xl animate-pulse">Memuat...</div>;
  }

  return (
    <div className="mt-8 max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Komentar</h2>
        <button className="text-sm text-[color:var(--custom-orange)] hover:text-orange-700">Lihat semua</button>
      </div>
      {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="gap-3">
          <div className="gap-6 mb-4">
            <div className="flex items-center gap-4">
              <Image src={currentUser?.photo || "/default-avatar.jpg"} alt="Avatar" height={32} width={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">{currentUser?.name || "Anonymous"}</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => handleRatingChange(star)} className="text-2xl focus:outline-none" disabled={!isLoggedIn || isSubmitting}>
                  {star <= rating ? <span className="text-yellow-400">★</span> : <span className="text-gray-300">★</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow">
            <div className="mb-2">
              <textarea
                placeholder="Tambah komentar..."
                className="w-full bg-white px-3 pt-2 py-6 text-gray-800 text-sm border rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-[color:var(--custom-orange)] focus:border-transparent"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={!isLoggedIn || isSubmitting}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-1.5 text-sm font-medium rounded-sm ${isLoggedIn && !isSubmitting ? "bg-[color:var(--custom-orange)] text-white hover:bg-orange-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  disabled={!isLoggedIn || isSubmitting}>
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="space-y-4">
        {localComments.length > 0 ? (
          localComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-md shadow-xs p-4">
              <div className="flex gap-3">
                <Image src={comment.user?.photo || "/default-avatar.jpg"} alt={comment.user?.name || "User Avatar"} className="w-8 h-8 rounded-full object-cover flex-shrink-0" width={32} height={32} />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{comment.user?.name || "Anonymous"}</h4>
                      <p className="text-xs text-gray-500">{getRelativeTime(comment.createdAt)}</p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{comment.comment}</p>
                  {comment.rating !== undefined && comment.rating >= 0 && (
                    <div className="mt-1 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-lg ${star <= comment.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="mt-1 text-xs text-gray-500 hover:text-[color:var(--custom-orange)] flex items-center gap-1">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Balas
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Belum ada komentar.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
