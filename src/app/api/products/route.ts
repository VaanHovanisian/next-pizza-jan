import { prisma } from "@/prisma/prizma-client";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {

    const products = await prisma.product.findMany({
        include: {
            variants: true,
            category: true,
            ingredients: true
        }


    })
    return NextResponse.json(products)
}