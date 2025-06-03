"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DefaultProfile } from "../../public/assets";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
}

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch("http://localhost:4000/v1/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Gagal mengambil data pengguna: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("fetchUser response:", data);
      const user = data.data || data;
      if (!user.id || !user.email) {
        throw new Error("Data pengguna tidak lengkap");
      }
      const userData: User = {
        id: user.id,
        name: user.name || "Anonymous",
        email: user.email,
        photo: user.photo && user.photo.trim() !== "" ? user.photo : DefaultProfile.src,
      };
      setCurrentUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error di fetchUser:", error);
      Cookies.remove("token");
      setCurrentUser(null);
      setIsLoggedIn(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      fetchUser(token).catch(() => {
        // Jika token tidak valid, redirect ke login
        router.push("/");
      });
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setLoading(false);
    }
  }, [router]);

  const login = async (token: string) => {
    Cookies.set("token", token, {
      expires: 1, // 1 hari
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    await fetchUser(token);

    // Redirect ke returnUrl jika ada, atau ke dashboard
    const returnUrl = searchParams.get("returnUrl") || "/dashboard";
    router.push(decodeURIComponent(returnUrl));
  };

  const logout = () => {
    Cookies.remove("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        login,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
