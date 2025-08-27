import { authOptions } from "@/constants/auth-options";
import { getServerSession } from "next-auth";

export const isAdmin = async () => {
  try {
    const isUser = await getServerSession(authOptions);

    if (!isUser?.user?.email) {
      return null;
    }

    return isUser?.user.role === "ADMIN" || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
