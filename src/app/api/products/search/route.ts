import { prisma } from "@/prisma/prizma-client";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get("search") || ""
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchQuery,
                mode: "insensitive"
            }
        },

        take: 5
    })
    return NextResponse.json(products)
}