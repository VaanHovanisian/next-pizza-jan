import { FormProfile } from "@/components";
import { getUser } from "@/lib/get-user";
import { prisma } from "@/prisma/prizma-client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const userData = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });

  if (!userData) {
    return notFound();
  }

  if (userData.role === "ADMIN") {
    return (
      <FormProfile user={userData}>
        <Link
          className="text-blue-500 bg-accent px-3 py-1 inline-block rounded my-5"
          href="/admin/category"
        >
          Admin
        </Link>
      </FormProfile>
    );
  }

  return <FormProfile user={userData} />;
}
