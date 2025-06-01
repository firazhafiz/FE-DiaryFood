"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPaperPlane, FaPlus, FaBars, FaTrash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Loading from "./loading";
import { formatPlanText } from "../../lib/formatPlanText.js";
import { DefaultProfile } from "../../../public/assets";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  thought?: string;
  createdAt: string;
}

interface Thread {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
}

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  photo: string | null | undefined;
}

export default function TanyaAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThreadId, setCurrentThreadId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { currentUser, isLoggedIn, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:4000/v1/threads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch threads");
      const data = await response.json();
      setThreads(
        data.data.map((t: any) => ({
          id: t.id,
          title: t.title,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
          messagesCount: t._count.messages,
        }))
      );
    } catch (err) {
      console.error("Error fetching threads:", err);
      setError("Failed to load threads");
    }
  };

  const fetchMessages = async (threadId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`http://localhost:4000/v1/messages/${threadId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data.data);
      setCurrentThreadId(threadId);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    }
  };

  const deleteThread = async (threadId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`http://localhost:4000/v1/threads/${threadId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete thread");
      setThreads(threads.filter((t) => t.id !== threadId));
      if (currentThreadId === threadId) {
        setMessages([]);
        setCurrentThreadId(null);
      }
    } catch (err) {
      console.error("Error deleting thread:", err);
      setError("Failed to delete thread");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!mounted || loading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const endpoint = currentThreadId ? `http://localhost:4000/v1/messages/${currentThreadId}` : "http://localhost:4000/v1/messages/new";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const data = await response.json();
      const { threadId, messages: newMessages } = data.data;

      setMessages((prev) => [...prev.filter((m) => m.id !== userMessage.id), ...newMessages]);
      if (!currentThreadId) {
        setCurrentThreadId(threadId);
        fetchThreads();
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentThreadId(null);
    setError(null);
  };

  const selectThread = (threadId: number) => {
    fetchMessages(threadId);
    setIsSidebarOpen(false);
  };

  const photoSrc = currentUser?.photo && currentUser.photo.trim() !== "" ? currentUser.photo : DefaultProfile;

  const altText = currentUser?.name && currentUser.name.trim() !== "" ? currentUser.name : "Profile";

  const renderAuthSection = () => {
    if (loading) {
      return <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>;
    }
    if (isLoggedIn && currentUser) {
      return (
        <Link href="/profile">
          <Image src={photoSrc} alt={altText} height={40} width={40} className="rounded-full border-2 border-white" />
        </Link>
      );
    }
    return (
      <div className="hidden md:flex items-center gap-4">
        <Link href="/login" className="px-4 py-2 text-sm font-semibold border border-white rounded-lg hover:bg-[var(--custom-orange)] hover:text-white hover:border-transparent transition-colors">
          Login
        </Link>
        <Link href="/register" className="px-4 py-2 text-sm font-semibold bg-[var(--custom-orange)] text-white rounded-lg hover:bg-orange-600 transition-colors">
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-[var(--custom-orange)]">Diary</span>
                <span className="text-white">Food</span>
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-[var(--custom-orange)] transition-colors">
                Home
              </Link>
              <Link href="/resep" className="text-sm font-medium hover:text-[var(--custom-orange)] transition-colors">
                Resep
              </Link>
              <Link href="/tanya-ai" className="text-sm font-medium hover:text-[var(--custom-orange)] transition-colors">
                Tanya AI
              </Link>
            </div>
            {renderAuthSection()}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors" aria-label="Toggle sidebar">
              <FaBars className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)] w-full mx-auto">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:static md:translate-x-0 w-72 bg-white text-slate-700 shadow-lg flex flex-col transition-transform duration-300 ease-in-out z-40 border-r border-slate-200`}>
          <div className="p-4 border-b border-slate-200">
            <button
              onClick={startNewChat}
              className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold rounded-lg border border-[var(--custom-orange)] text-slate-700 hover:bg-[var(--custom-orange)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)]"
              aria-label="Start new chat">
              <FaPlus className="w-4 h-4" />
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {threads.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No threads yet</p>
            ) : (
              threads.map((thread) => (
                <div key={thread.id} className="flex items-center gap-2 group">
                  <button
                    onClick={() => selectThread(thread.id)}
                    className={`flex-1 flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentThreadId === thread.id ? "bg-[var(--custom-orange)] text-white" : "hover:bg-slate-100 text-slate-700"
                    }`}
                    aria-label={`Select thread ${thread.title}`}>
                    <div className="flex-1 text-left">
                      <p className="truncate">
                        {thread.title.split(" ").slice(0, 3).join(" ")}
                        {thread.title.split(" ").length > 10 ? "..." : ""}
                      </p>
                    </div>
                  </button>
                  <button onClick={() => deleteThread(thread.id)} className="p-2 text-slate-500 cursor-pointer transition-opacity" aria-label={`Delete thread ${thread.title}`}>
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--custom-orange)] text-white flex items-center justify-center">
                <span className="text-sm font-semibold">{currentUser?.name?.charAt(0) || "U"}</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">{currentUser?.name || "User"}</span>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-slate-600 max-w-md mx-auto">
                  <h2 className="text-2xl font-semibold mb-2">Tanya AI</h2>
                  <p className="text-sm text-slate-500">Ask me anything about recipes!</p>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl py-3 px-4 shadow-sm ${message.role === "user" ? "bg-[var(--custom-orange)] text-white" : "bg-slate-50 text-slate-800 border border-slate-200"}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  {message.thought && message.role === "assistant" && <p className="text-sm text-slate-700 mt-2">Thought: {formatPlanText(message.thought)}</p>}
                  <p className="text-xs text-slate-700 mt-1">{new Date(message.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 rounded-xl px-4 py-3 shadow-sm border border-slate-200">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[var(--custom-orange)] rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-[var(--custom-orange)] rounded-full animate-bounce delay-100" />
                    <div className="w-3 h-3 bg-[var(--custom-orange)] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-slate-200 p-4 bg-white shadow-sm">
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-3xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)] focus:border-transparent bg-white text-slate-900"
                disabled={isLoading}
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-[var(--custom-orange)] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--custom-orange)]"
                aria-label="Send message">
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
