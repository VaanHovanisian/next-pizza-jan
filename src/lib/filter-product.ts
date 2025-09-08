import { GetSearchParams } from "@/@types/filter";
import { prisma } from "@/prisma/prizma-client";

export const filterProduct = async (params: GetSearchParams) => {
    const types = params.types?.split(",").map(Number)
    const sizes = params.sizes?.split(",").map(Number)
    const ingredients = params.ingredients?.split(",").map(Number)
    const priceFrom = Number(params.priceFrom) || 0;
    const priceTo = Number(params.priceTo) || 5000;


    const products = await prisma.category.findMany({
        include:{
            products:{
                where:{
                    ingredients: ingredients ? {
                        some:{
                            id: {in: ingredients}
                        }
                    } : undefined,
                    variants: {
                        some:{
                            pizzaType: {in: types},
                            size: {in: sizes},
                            price: {
                                gte: priceFrom, lte: priceTo
                            }
                        }
                    }
                },
                include:{
                    ingredients:true,
                    variants:true
                }
            }
        }
    })

    return products

}