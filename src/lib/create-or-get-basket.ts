import { prisma } from "@/prisma/prizma-client"

export const createOrGetBasket = async (token: string) => {

    let userBasket = await prisma.cart.findFirst({ where: { token } })
    if (!userBasket) {
        userBasket = await prisma.cart.create({ data: { token } })
    }
    return userBasket

}