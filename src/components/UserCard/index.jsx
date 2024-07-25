import { useAuth } from "@/context/AuthContext";

const UserCard = () => {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="shadow-2xl px-2 py-2 md:px-2 md:py-2 lg:px-3 lg:py-3 translate-y-[100%] transition-all lg:w-[300px] bg-white">
      <div className="flex flex-col gap-3 ext-[12px] md:text-[14px] lg:text-[16px] font-medium text-black font-serif">
        <span>{user?.claims?.name}</span>
        <span>{user?.claims?.email}</span>
        <span
          onClick={handleLogout}
          className="bg-blue-500 hover:shadow-2xl hover:cursor-pointer text-white text-[12px] md:text-[14px] lg:text-[16px] text-center"
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default UserCard;
