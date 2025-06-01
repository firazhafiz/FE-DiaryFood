"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DefaultProfile } from "../../public/assets";
import Cookies from "js-cookie";

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

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch("http://localhost:4000/v1/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("fetchUser response:", data);
      const user = data.data || data;
      if (!user.id || !user.email) {
        throw new Error("Incomplete user data");
      }
      const userData: User = {
        id: user.id,
        name: user.name || "Anonymous",
        email: user.email,
        photo: user.photo && user.photo.trim() !== "" ? user.photo : DefaultProfile.src,
      };
      setCurrentUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Error in fetchUser:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setIsLoggedIn(false);
      throw error;
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    const cachedUser = localStorage.getItem("currentUser");
    console.log("Token from localStorage:", token);
    console.log("Cached user from localStorage:", cachedUser);
    if (token && cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
        fetchUser(token); // Refresh in background
      } catch (error) {
        console.error("Error parsing cached user:", error);
        localStorage.removeItem("currentUser");
        fetchUser(token);
      }
    } else if (token) {
      fetchUser(token);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    // Simpan token di cookie, bukan localStorage
    Cookies.set("token", token, {
      expires: 1, // 1 hari
      secure: true,
      sameSite: "strict",
    });
    await fetchUser(token);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("currentUser");

    setCurrentUser(null);
    setIsLoggedIn(false);
    setLoading(false);
  };

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
