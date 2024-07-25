// app/layout.js
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataProvider";
import { AuthProvider } from "@/context/AuthContext"; // Ensure correct import
import Header from "@/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <AuthProvider>
            <ToastContainer />
            <Header />
            {children}
          </AuthProvider>
        </DataProvider>
      </body>
    </html>
  );
}
