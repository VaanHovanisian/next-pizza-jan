"use server";
import { prisma } from "@/prisma/prizma-client";

export async function categoryForm(mode: string, data: any, id?: number) {
  try {
    if (mode === "create") {
      await prisma.category.create({ data: { name: data.category } });
    } else if (mode === "update" && id) {
      const category = await prisma.category.findFirst({
        where: { name: data.category },
        include: { products: true },
      });
      if (category) {
        throw new Error("category already exists");
      }
      await prisma.category.update({
        where: { id },
        data: { name: data.category },
      });
    } else if (mode === "delete" && id) {
      const count = await prisma.product.count({ where: { categoryId: id } });
      if (count > 0) {
        throw new Error("category has products");
      }
      await prisma.category.delete({ where: { id } });
    }
  } catch (error) {
    console.log(error);
  }
}
