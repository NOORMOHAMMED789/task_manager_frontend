// app/protected/page.js
"use client";
import withAuth from "@/components/withAuth";

const ProtectedPage = () => {
  return (
    <div>
        This is a protected route
    </div>
  );
};

export default withAuth(ProtectedPage)
