// context/AuthContext.js
"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/firebase"; // Ensure correct import

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [show, showContent] = useState(null)
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    provider.setCustomParameters({
      prompt: "select_account", // Always prompt for account selection
    });
    await signInWithPopup(auth, provider);
    router.push("/dashboard/tasks")
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const checkAccess = async (fbUser) => {
    const idTokenRes = await fbUser.getIdTokenResult();
    if (idTokenRes) {
      fbUser.claims = idTokenRes.claims;
      setUser(fbUser);
    } else {
      setUser(null);
    }
    return idTokenRes;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      setLoading(true);
      try {
        if (fbUser) {
          await checkAccess(fbUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  const value = {
    user,
    login,
    logout,
    googleLogin,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!show && <span>no</span>} */}
      {!show && children}
    </AuthContext.Provider>
  );
};
