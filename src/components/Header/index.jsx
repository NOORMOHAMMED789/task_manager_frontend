import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { CiMemoPad } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
const Header = () => {
  const { googleLogin, logout, user } = useAuth();

  const googleSignIn = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-2 bg-blue-700">
      <div>
        <CiMemoPad size={34} color="white"/>
      </div>
      {!user && (
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <div
            onClick={googleSignIn}
            className="cursor-pointer px-2 py-2 md:px-2 md:py-2 lg:px-3 lg:py-2 flex justify-center bg-white text-blue-600 rounded-md items-center"
          >
            <div className="text-[12px] md:text-[14px] lg:text-[16px]">
              Login
            </div>
            <div>
              <CiLogin size={24} />
            </div>
          </div>
          <div className="text-[12px] text-white md:text-[14px] lg:text-[16px]">
            Sign up
          </div>
        </div>
      )}
      {user && <div onClick={handleLogout}>Logout</div>}
    </div>
  );
};

export default Header;
