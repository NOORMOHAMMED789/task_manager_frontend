import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiMemoPad } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import UserCard from "../UserCard";
const Header = () => {
  const { googleLogin, logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const googleSignIn = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-2 bg-blue-700">
      <div>
        <CiMemoPad size={34} color="white" />
      </div>
      {!user && (
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <div
            onClick={googleSignIn}
            className="cursor-pointer px-2 py-2 md:px-2 md:py-2 lg:px-3 lg:py-2 flex justify-center bg-white text-blue-600 rounded-md items-center"
          >
            <div className="text-[12px] md:text-[14px] lg:text-[16px] hover:cursor-pointer hover:shadow-2xl">
              Login
            </div>
            <div>
              <CiLogin size={24} />
            </div>
          </div>
          <Link
            href="/signup"
            className="text-[12px] text-white md:text-[14px] lg:text-[16px] hover:underline hover:shadow-2xl hover:cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      )}
      {user && (
        <div
          className="relative cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <RxAvatar size={30} color="white" />
          {showDropdown && (
            <div className="absolute right-0 lg:-top-20 md:-top-14 -top-[70px]">
              <UserCard />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
