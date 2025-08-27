import { prisma } from "@/prisma/prizma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients = await prisma.category.findMany();

  return NextResponse.json(ingredients);
}
