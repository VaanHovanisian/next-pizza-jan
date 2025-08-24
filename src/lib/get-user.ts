import { getServerSession } from "next-auth";

export const getUser = async () => {
  const isUser = await getServerSession();

  return isUser?.user || null;
};
