import { isAdmin } from "@/lib/is-admin"
import Link from "next/link"
import { notFound } from "next/navigation"




export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    if (!(await isAdmin())) {
        return notFound()
    }
    return (
        <>
            <header>
                <nav>
                    <ul className="flex items-center gap-5 p-5">
                        <li>
                            <Link href="/admin/category">Category</Link>
                        </li>
                        <li>
                            <Link href="/admin/ingredient">Ingredient</Link>
                        </li>
                        <li>
                            <Link href="/admin/product">Product</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            {children}


        </>
    )
}