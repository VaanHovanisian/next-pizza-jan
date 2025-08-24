import { Modal } from "@/components"
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
        return <h1>not Found</h1>
    }

    return (
        <>
            <Modal product={product} />
        </>
    )
}