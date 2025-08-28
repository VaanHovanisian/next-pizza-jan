import { authOptions } from "@/constants/auth-options";
import { getServerSession } from "next-auth";

export const getUser = async () => {
  const isUser = await getServerSession(authOptions);

  return isUser?.user || false;
};
