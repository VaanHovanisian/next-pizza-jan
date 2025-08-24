import { FormProfile } from "@/components";
import { getUser } from "@/lib/get-user";
import { prisma } from "@/prisma/prizma-client";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  console.log(user);

  const userData = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!userData) {
    return notFound();
  }

  return <FormProfile user={userData} />;
}
