import { prisma } from "@/prisma/prizma-client"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const category = await prisma.category.findMany()
        return NextResponse.json(category)
    } catch (error) {
        console.log("SERVER_ERROR", error)
        return NextResponse.json({ message: "Server Error category" }, { status: 500 })
    }
}