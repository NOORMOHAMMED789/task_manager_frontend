import { auth } from "@/firebase";

export const getHeader = async () => {
   if(auth.currentUser){
     const accessToken = await auth.currentUser.getIdToken();
     return {
       Authorization: `Bearer ${accessToken}`,
       "Content-Type": "application/json",
     };
   }
};
