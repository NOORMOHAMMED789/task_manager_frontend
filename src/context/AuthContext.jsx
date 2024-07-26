"use client";
import React, { useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "@/firebase"; // Ensure correct import
import { toast } from "react-toastify";
import Link from "next/link";
import Login from "@/app/login/page";
import Header from "@/components/Header";
import SignUp from "@/app/signup/page";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname()
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        router.replace("/dashboard/tasks");
        setShow(true);
        toast.success("Welcome to the dashboard.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const googleLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      router.push("/dashboard/tasks");
      setShow(true);
      toast.success("Welcome to the dashboard.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error("Google login failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShow(false);
      router.push("/login");
      toast.success("Successfully logged out.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const createUser = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      router.replace("/dashboard/tasks");
      setShow(true);
      toast.success("Welcome to the dashboard.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Sign-up error:", error.message);
      toast.error("Sign-up failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const checkAccess = async (fbUser) => {
    const idTokenRes = await fbUser.getIdTokenResult();
    if (idTokenRes) {
      fbUser.claims = idTokenRes.claims;
      setUser(fbUser);
      setShow(true);
    } else {
      setUser(null);
      setShow(false);
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
          setShow(false);
        }
      } catch (err) {
        console.log(err);
        setUser(null);
        setShow(false);
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
    createUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading &&
        (show ? (
          children
        ) : (
          <div>
            <Header />
            {pathname === "/login" && <Login />}
            {pathname === "/signup" && <SignUp />}
          </div>
        ))}{" "}
    </AuthContext.Provider>
  );
};
