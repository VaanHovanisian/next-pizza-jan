"use server";
import { isAdmin as checkAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prizma-client";

export async function categoryAdmin(data: { name: string }, action: "create" | "update" | "delete", id?: number) {
    try {
        const isAdmin = await checkAdmin()

        if (!isAdmin) {
            throw new Error("You are not admin")
        }

        let exist = false;
        if (action === "create") {
            const category = await prisma.category.findFirst({
                where: {
                    name: data.name,
                },
            })

            if (category) {
                exist = true;
                return exist;
            }

            await prisma.category.create({
                data: {
                    name: data.name,
                },
            })

        }

        if (action === "update" && id) {
            const category = await prisma.category.findUnique({
                where: {
                    id: id,
                },
            })

            if (!category) {
                throw new Error("Category not found")
            }

            await prisma.category.update({
                where: {
                    id: category.id,
                },
                data: {
                    name: data.name,
                },
            })
        }

        let countent;

        if (action === "delete" && id) {
            const category = await prisma.category.findUnique({
                where: {
                    id: id,
                },
            })

            if (!category) {
                throw new Error("Category not found")
            }

            const count = await prisma.product.count({
                where: {
                    categoryId: category.id,
                },
            })

            if (count > 0) {
                countent = true;
                return countent;
            }

            await prisma.category.delete({
                where: {
                    id: category.id,
                },
            })
        }
    } catch (error) {
        console.log(error);
    }
}
