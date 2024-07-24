// app/layout.js
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataProvider";
import { AuthProvider } from "@/context/AuthContext"; // Ensure correct import
import ProtectedPage from "./protectedpage/page";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </DataProvider>
      </body>
    </html>
  );
}
