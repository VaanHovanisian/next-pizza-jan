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
      <header className="p-5">
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <a href="/admin/category">Category</a>
            </li>
            <li>
              <a href="/admin/ingredient">Ingredient</a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
