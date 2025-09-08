"use server";
import { isAdmin as checkAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prizma-client";
import { Variation } from "@prisma/client";

interface DataProps {
    name: string;
    imgUrl: string | File;
    categoryId: number;
    variants: Array<{
        price: number;
        size: number | null;
        pizzaType: string | null;
    }>

    ingredients: Record<string, boolean>[];
}
export async function productAdmin(data: DataProps, action: "create" | "update" | "delete", id?: number) {
    try {
        const isAdmin = await checkAdmin()

        if (!isAdmin) {
            throw new Error("You are not admin")
        }

        let exist = false;
        if (action === "create") {
            const product = await prisma.product.findFirst({
                where: {
                    name: data.name,
                },
            })

            if (product) {
                exist = true;
                return exist;
            }

            await prisma.product.create({
                data: {
                    name: data.name,
                    imgUrl: data.imgUrl as string,
                    categoryId: data.categoryId,
                    variants: {
                        create: data.variants.map((variant) => ({
                            price: variant.price,
                            size: variant.size ? Number(variant.size) : undefined,
                            pizzaType: variant.pizzaType ? Number(variant.pizzaType) : undefined,
                        }))
                    },
                    ingredients: data.ingredients.length ?
                        { connect: data.ingredients.map((id) => ({ id: Number(id) })) } : undefined
                },
            })

        }

        if (action === "update" && id) {
            const product = await prisma.product.findUnique({
                where: {
                    id: id,
                },
            })

            if (!product) {
                throw new Error("Product not found")
            }

            await prisma.product.update({
                where: {
                    id: product.id,
                },
                data: {
                    name: data.name,
                    imgUrl: data.imgUrl as string,
                    categoryId: data.categoryId,
                    variants: {
                        deleteMany: {},
                        create: data.variants.map((variant) => ({
                            price: variant.price,
                            size: variant.size ? Number(variant.size) : undefined,
                            pizzaType: variant.pizzaType ? Number(variant.pizzaType) : undefined,
                        }))
                    },
                    ingredients: data.ingredients.length ?
                        { connect: data.ingredients.map((id) => ({ id: Number(id) })) } : undefined
                },
            })
        }

        let countent;

        if (action === "delete" && id) {
            const product = await prisma.product.findUnique({
                where: {
                    id: id,
                },
            })

            if (!product) {
                throw new Error("Product not found")
            }


            await prisma.product.delete({
                where: {
                    id: product.id,
                },
            })
        }
    } catch (error) {
        console.log(error);
    }
}
