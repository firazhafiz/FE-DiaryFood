"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Comment } from "@/types/recipe-detail"; // Use RecipeDetail's Comment type
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import getRelativeTime from "@/helper/relativeTime";
import { DefaultProfile } from "../../../public/assets";
import { config } from "@/config";

interface CommentsSectionProps {
  recipeId: string;
  onCommentAdded: (newComment: Comment, newTotal: number) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ recipeId, onCommentAdded }) => {
  const router = useRouter();
  const { currentUser, isLoggedIn } = useAuth();
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [visibleCommentCount, setVisibleCommentCount] = useState(5);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        const response = await fetch(`${config.apiUrl}/resep/${recipeId}/comment`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            toast.error("Sesi habis. Silakan login kembali.");
            Cookies.remove("token");
            router.push("/login");
            return;
          }
          throw new Error(`Failed to fetch comments: ${response.status}`);
        }

        const result = await response.json();
        setLocalComments(
          result.data.map((c: any) => ({
            id: c.id.toString(),
            content: c.comment,
            rating: c.rating,
            createdAt: c.createdAt,
            resepId: c.resepId,
            user: {
              id: c.user.id,
              name: c.user.name || "Anonymous",
              photo: c.user.photo || DefaultProfile.src,
            },
          }))
        );
        setFetchError(null);
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : "Gagal mengambil komentar");
        toast.error(err instanceof Error ? err.message : "Gagal mengambil komentar");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [recipeId, router]);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleLoadMore = () => {
    setVisibleCommentCount((prev) => prev + 5);
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

    const optimisticComment: Comment = {
      id: Date.now().toString(),
      content: comment,
      rating,
      createdAt: new Date().toISOString(),
      resepId: parseInt(recipeId),
      user: {
        id: currentUser.id,
        name: currentUser.name || "Anonymous",
        photo: currentUser.photo || DefaultProfile.src,
      },
    };
    setLocalComments([optimisticComment, ...localComments]);
    setComment("");
    setRating(0);

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      const response = await fetch(`${config.apiUrl}/resep/${recipeId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, rating }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setSubmitError("Sesi habis. Silakan login kembali.");
          toast.error("Sesi habis. Silakan login kembali.");
          Cookies.remove("token");
          router.push("/login");
          throw new Error("Unauthorized");
        }
        throw new Error(`Failed to post comment: ${response.status}`);
      }

      const result = await response.json();
      const newComment: Comment = {
        id: result.data.id.toString(),
        content: result.data.comment,
        rating: result.data.rating,
        createdAt: result.data.createdAt,
        resepId: result.data.resepId,
        user: {
          id: currentUser.id,
          name: currentUser.name || "Anonymous",
          photo: currentUser.photo || DefaultProfile.src,
        },
      };
      setLocalComments((prev) => [newComment, ...prev.filter((c) => c.id !== optimisticComment.id)]);
      onCommentAdded(newComment, localComments.length + 1);
      toast.success("Komentar dan rating berhasil dikirim!");
    } catch (err) {
      setLocalComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
      setSubmitError(err instanceof Error ? err.message : "Gagal mengirim komentar");
      toast.error(err instanceof Error ? err.message : "Gagal mengirim komentar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="mt-8 max-w-xl animate-pulse">Memuat...</div>;
  }

  if (fetchError) {
    return <div className="mt-8 max-w-xl text-red-500 text-sm">{fetchError}</div>;
  }

  const displayedComments = [...localComments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, visibleCommentCount);

  return (
    <div className="mt-8 max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Komentar</h2>
      </div>
      {submitError && <p className="text-red-500 text-sm mb-4">{submitError}</p>}
      {isLoggedIn ? (
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="gap-3">
            <div className="gap-6 mb-4">
              <div className="flex items-center gap-4">
                <Image src={currentUser?.photo || DefaultProfile.src} alt="Avatar" height={32} width={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{currentUser?.name || "Anonymous"}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => handleRatingChange(star)} className="text-2xl focus:outline-none" disabled={isSubmitting}>
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
                  disabled={isSubmitting}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className={`px-4 py-1.5 text-sm font-medium rounded-sm ${!isSubmitting ? "bg-[color:var(--custom-orange)] text-white hover:bg-orange-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 rounded-md text-center">
          <p className="text-sm text-gray-700 mb-2">Silakan login untuk mengirim komentar</p>
          <button onClick={handleLoginRedirect} className="px-4 py-1.5 text-sm font-medium rounded-sm bg-[color:var(--custom-orange)] text-white hover:bg-orange-600">
            Login
          </button>
        </div>
      )}
      <div className="space-y-4">
        {displayedComments.length > 0 ? (
          displayedComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-md shadow-xs p-4">
              <div className="flex gap-3">
                <Image src={comment.user?.photo || DefaultProfile.src} alt={comment.user?.name || "User Avatar"} className="w-8 h-8 rounded-full object-cover flex-shrink-0" width={32} height={32} />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{comment.user?.name || "Anonymous"}</h4>
                      <p className="text-xs text-gray-500">{getRelativeTime(new Date(comment.createdAt))}</p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                  {comment.rating !== undefined && (
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
      {localComments.length > visibleCommentCount && (
        <div className="mt-4 text-center">
          <button onClick={handleLoadMore} className="text-sm text-[color:var(--custom-orange)] hover:text-orange-700 font-medium">
            Lihat lebih banyak
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
