import { auth } from "@/firebase";

export const getHeader = async (dontUseSessionToken = false) => {
  const accessToken = await auth.currentUser.getIdToken();
  return {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};
