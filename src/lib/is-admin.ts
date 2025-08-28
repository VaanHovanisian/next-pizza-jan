import { authOptions } from "@/constants/auth-options";
import { getServerSession } from "next-auth";

export const isAdmin = async () => {
  try {
    const isUser = await getServerSession(authOptions);

    if (!isUser?.user) {
      return false;
    }

    return isUser?.user.role === "ADMIN" || false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
