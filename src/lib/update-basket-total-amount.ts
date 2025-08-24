import { prisma } from "@/prisma/prizma-client";
import { calcBasketPrice } from "./calc-basket-price";

export const updateBasketTotalAmount = async (token: string,) => {
    const userBasket = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            products: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    ingredients: true,
                    variant: {
                        include: {
                            product: true,
                        }
                    }
                }
            }
        }
    });

    if (!userBasket) {
        return
    }

    const totalAmount = userBasket.products.reduce((acc, el) => acc + calcBasketPrice(el), 0);


    return await prisma.cart.update({
        where: {
            id: userBasket.id
        },
        data: {
            totalAmount
        },
        include: {
            products: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    ingredients: true,
                    variant: {
                        include: {
                            product: true,
                        }
                    }
                }
            }
        }
    })



}

