"use server";
import { prisma } from "@/prisma/prizma-client";
import { isAdmin as checkAdmin } from "@/lib/is-admin";

export async function categoryAdmin(
  data: { name: string },
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
      const category = await prisma.category.findFirst({
        where: {
          name: data.name,
        },
      });

      if (category) {
        exist = true;
        return exist;
      }

      await prisma.category.create({
        data: {
          name: data.name,
        },
      });
    }

    if (action === "update" && id) {
      const category = await prisma.category.findUnique({
        where: {
          id: id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      await prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          name: data.name,
        },
      });
    }

    let countent;

    if (action === "delete" && id) {
      const category = await prisma.category.findUnique({
        where: {
          id: id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      const count = await prisma.product.count({
        where: { categoryId: category.id },
      });

      if (count > 0) {
        countent = true;
        return countent;
      }

      await prisma.category.delete({
        where: {
          id: category.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function categoryForm(mode: string, data: any, id?: number) {
//   try {
//     if (mode === "create") {
//       await prisma.category.create({ data: { name: data.category } });
//     } else if (mode === "update" && id) {
//       const category = await prisma.category.findFirst({
//         where: { name: data.category },
//         include: { products: true },
//       });
//       if (category) {
//         throw new Error("category already exists");
//       }
//       await prisma.category.update({
//         where: { id },
//         data: { name: data.category },
//       });
//     } else if (mode === "delete" && id) {
//       const count = await prisma.product.count({ where: { categoryId: id } });
//       if (count > 0) {
//         throw new Error("category has products");
//       }
//       await prisma.category.delete({ where: { id } });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
