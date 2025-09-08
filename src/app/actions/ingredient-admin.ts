"use server";
import { isAdmin as checkAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prizma-client";
import { DashboardIngredientSchema } from "@/@types/admin";

export async function ingredientAdmin(data: DashboardIngredientSchema, action: "create" | "update" | "delete", id?: number) {
    try {
        const isAdmin = await checkAdmin()

        if (!isAdmin) {
            throw new Error("You are not admin")
        }

        let exist = false;
        if (action === "create") {
            const ingredient = await prisma.ingredient.findUnique({
                where: {
                    name: data.name,
                },
            })

            if (ingredient) {
                exist = true;
                return exist;
            }

            await prisma.ingredient.create({
                data: {
                    id: id,
                    name: data.name,
                    price: data.price,
                    imgUrl: data.imgUrl as string,
                },
            })

        }

        if (action === "update") {
            const ingredient = await prisma.ingredient.findUnique({
                where: {
                    id: id,
                },
            })

            if (!ingredient) {
                throw new Error("Ingredient not found")
            }

            await prisma.ingredient.update({
                where: {
                    id: ingredient.id,
                },
                data: {
                    name: data.name,
                    price: data.price,
                    imgUrl: data.imgUrl as string,
                },
            })
        }

        let countent;

        if (action === "delete") {
            const ingredient = await prisma.ingredient.findUnique({
                where: {
                    id: id,
                },
            })

            if (!ingredient) {
                throw new Error("Ingredient not found")
            }

            const count = await prisma.product.count({
                where: {
                    ingredients: {
                        some: {
                            id: ingredient.id,
                        },
                    },
                },
            })

            if (count > 0) {
                countent = true;
                return countent;
            }

            await prisma.ingredient.delete({
                where: {
                    id: ingredient.id,
                },
            })
        }
    } catch (error) {
        console.log(error);
    }
}
