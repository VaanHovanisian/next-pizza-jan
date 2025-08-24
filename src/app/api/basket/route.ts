import { CreateBasketValues } from "@/@types/basket";
import { createOrGetBasket } from "@/lib/create-or-get-basket";
import { updateBasketTotalAmount } from "@/lib/update-basket-total-amount";
import { prisma } from "@/prisma/prizma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('basketToken')?.value
        if (!token) {
            return NextResponse.json({ message: "token not found" }, { status: 404 })
        }


        const findBasket = await prisma.cart.findFirst({
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
        })

        return NextResponse.json(findBasket)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }

}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('basketToken')?.value

        if (!token) {
            token = crypto.randomUUID()

        }

        const userBasket = await createOrGetBasket(token)
        const data = (await req.json()) as CreateBasketValues;

        const findProduct = await prisma.cartProduct.findFirst({
            where: {
                variantid: data.variantId,
                cartId: userBasket.id,
                ingredients: {
                    some: {
                        id: {
                            in: data.ingredients
                        }
                    }
                }
            }
        })

        if (findProduct) {
            await prisma.cartProduct.update({
                where: {
                    id: findProduct.id
                },
                data: {
                    quantity: findProduct.quantity + 1
                }
            })
        } else {
            await prisma.cartProduct.create({
                data: {
                    quantity: 1,
                    variantid: data.variantId,
                    cartId: userBasket.id,
                    ingredients: {
                        connect: data.ingredients?.map((ingredientId) => ({
                            id: ingredientId
                        }))
                    }
                }
            })
        }

        const updateBasket = updateBasketTotalAmount(token)
        const res = NextResponse.json(updateBasket)
        res.cookies.set("basketToken", token)
        return res

    } catch (error) {
        console.log("BASKET_POST Server-Error", error)
        return NextResponse.json({ message: "basketCard post error" }, { status: 500 })
    }
}