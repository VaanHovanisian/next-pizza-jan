import { isAdmin } from "@/lib/is-admin";
import { notFound } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) {
    return notFound();
  }

  return (
    <>
      <h1>Dashboard Header</h1>
      {children}
    </>
  );
}
