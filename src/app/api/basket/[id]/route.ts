import { updateBasketTotalAmount } from "@/lib/update-basket-total-amount";
import { prisma } from "@/prisma/prizma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = req.cookies.get("basketToken")?.value;
        const { id } = params;

        if (!token) {
            return NextResponse.json({ message: "Token not found" }, { status: 404 });
        }

        const findBasket = await prisma.cart.findFirst({
            where: {
                token,
            },
        });

        if (!findBasket) {
            return NextResponse.json(
                { message: "Basket not found" },
                { status: 404 }
            );
        }

        const basketProduct = await prisma.cartProduct.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!basketProduct) {
            return NextResponse.json(
                { message: "BasketProduct not found" },
                { status: 404 }
            );
        }

        await prisma.cartProduct.delete({
            where: {
                id: basketProduct.id,
            },
        });

        const updateBasket = updateBasketTotalAmount(token);

        return NextResponse.json(updateBasket);
    } catch (error) {
        console.log("BASKET_DELETE Server-Error", error);
        return NextResponse.json({ message: "basket product not delete" });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        const token = req.cookies.get("basketToken")?.value;
        const id = Number(params.id);
        const data = (await req.json()) as { quantity: number };

        if (!token) {
            return NextResponse.json({ message: "Token not found" }, { status: 404 });
        }
        const findBasket = await prisma.cart.findFirst({
            where: {
                token,
            },
        });

        if (!findBasket) {
            return NextResponse.json(
                { message: "Basket not found" },
                { status: 404 }
            );
        }

        const findProduct = await prisma.cartProduct.findUnique({
            where: {
                id,
            },
        });

        if (!findProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        await prisma.cartProduct.update({
            where: {
                id: findProduct.id,
            },
            data: {
                quantity: data.quantity,
            },
        });


        const updateBasket = updateBasketTotalAmount(token);

        return NextResponse.json(updateBasket);
    } catch (error) {
        console.log("BASKET_PATCH Server-Error", error);
        return NextResponse.json({ message: "basket product not update" }, { status: 500 });
    }
}

