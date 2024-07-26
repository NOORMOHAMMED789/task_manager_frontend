// context/AuthContext.js
"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "@/firebase"; // Ensure correct import
import { toast } from "react-toastify";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [show, showContent] = useState(null)
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if(response.user) {
      router.replace("/dashboard/tasks")
       setTimeout(() => {
         toast.success("Welcome to dashboard.", {
           position: "top-right",
           autoClose: 1500,
           hideProgressBar: false,
           closeOnClick: true,
           progress: undefined,
           theme: "light",
         });
       }, 400);
    }
  };

  const googleLogin = async () => {
    provider.setCustomParameters({
      prompt: "select_account", 
    });
    await signInWithPopup(auth, provider);
    router.push("/dashboard/tasks")
    setTimeout(() => {
      toast.success("Welcome to dashboard.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    },400)
  };

  const logout = async () => {
    router.push("/login");
    await signOut(auth);
    setUser(null);
     setTimeout(() => {
       toast.success("Successfully logged-out.", {
         position: "top-right",
         autoClose: 1500,
         hideProgressBar: false,
         closeOnClick: true,
         progress: undefined,
         theme: "light",
       });
     }, 400);
  };

  const createUser = async (email,password,firstName, lastName) => {
     try {
       const userCredential = await createUserWithEmailAndPassword(
         auth,
         email,
         password
       );
       const user = userCredential.user;

       // Update the user's profile with the display name
       await updateProfile(user, {
         displayName: `${firstName} ${lastName}`,
       });
       router.replace("/dashboard/tasks")
        setTimeout(() => {
          toast.success("Welcome to dashboard.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
          });
        }, 400);
     } catch (error) {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.error("Error creating user:", errorCode, errorMessage);
     }
  }

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
    createUser
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!show && <span>no</span>} */}
      {!show && children}
    </AuthContext.Provider>
  );
};
