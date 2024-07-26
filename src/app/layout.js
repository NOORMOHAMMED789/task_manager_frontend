// app/layout.js
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataProvider";
import { AuthProvider } from "@/context/AuthContext"; // Ensure correct import
import Header from "@/components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = usePathname().split("/")[3]
  const paths = ['edit', 'delete', 'view-details']
  return (
    <html lang="en">
      <body className={`${paths.includes(params) ? "bg-black bg-opacity-55": ""}`}>
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
