"use server";
import { prisma } from "@/prisma/prizma-client";
import { isAdmin as checkAdmin } from "@/lib/is-admin";
import { DashboardIngredientSchema } from "@/@types/admin";

export async function ingredientAdmin(
  data: DashboardIngredientSchema,
  action: "create" | "update" | "delete",
  id?: number
) {
  try {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      throw new Error("You are not admin");
    }
    let exist;
    if (action === "create") {
      const category = await prisma.ingredient.findUnique({
        where: {
          name: data.name,
        },
      });

      if (category) {
        exist = true;
        return exist;
      }

      await prisma.ingredient.create({
        data: {
          name: data.name,
          imgUrl: data.imgUrl as string,
          price: data.price,
        },
      });
    }

    if (action === "update" && id) {
      const category = await prisma.ingredient.findUnique({
        where: {
          id: id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      await prisma.ingredient.update({
        where: {
          id: category.id,
        },
        data: {
          name: data.name,
          imgUrl: data.imgUrl as string,
          price: data.price,
        },
      });
    }

    let countent;

    if (action === "delete" && id) {
      const category = await prisma.ingredient.findUnique({
        where: {
          id: id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      const count = await prisma.product.count({
        where: {
          ingredients: {
            some: {
              id: category.id,
            },
          },
        },
      });

      if (count > 0) {
        countent = true;
        return countent;
      }

      await prisma.ingredient.delete({
        where: {
          id: category.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
