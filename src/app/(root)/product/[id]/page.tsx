import { Product } from "@/components/product"
import { prisma } from "@/prisma/prizma-client"
import { notFound } from "next/navigation"

export default async function ProductUnicPage({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    const product = await prisma.product.findFirst({
        where: {
            id
        },
        include: {
            variants: true,
            ingredients: true
        }
    })

    if (!product) {
        return notFound()
    }

    return (
        <>
            <Product product={product} />
        </>
    )
}