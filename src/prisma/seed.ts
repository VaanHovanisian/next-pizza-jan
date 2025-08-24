import { hashSync } from "bcrypt";
import { prisma } from "./prizma-client";
import { categories, ingredients, products } from "./constants";

const createVariant = ({
  productId,
  size,
  pizzaType,
}: {
  productId: number;
  size?: 30 | 40 | 50;
  pizzaType?: 1 | 2;
}) => ({
  price: Math.ceil(Math.random() * 90 + 10) * 10,
  productId,
  size,
  pizzaType,
});
async function create() {
  const user1 = await prisma.user.create({
    data: {
      email: "vahegabrielyan2007adwwd@gmail.com",
      fullName: "Azgosh Jonyan",
      password: hashSync("Aso", 10),
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: "vahe_gabrielyan2007adwwd@gmail.com",
      fullName: "Jovani Spoyan",
      password: hashSync("Alooo", 10),
      role: "ADMIN",
    },
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });
  const pizza1 = await prisma.product.create({
    data: {
      imgUrl: "/pizza1.avif",
      name: "Охлажденный гриль",
      ingredients: { connect: ingredients.slice(0, 5) },
      categoryId: 1,
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      imgUrl: "/pizza2.avif",
      name: "С гавайским манго",
      ingredients: { connect: ingredients.slice(5, 10) },
      categoryId: 1,
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      imgUrl: "/pizza3.avif",
      name: "Креветки и песто",
      ingredients: { connect: ingredients.slice(10, 15) },
      categoryId: 1,
    },
  });

  await prisma.variation.createMany({
    data: [
      createVariant({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      createVariant({ productId: pizza1.id, pizzaType: 2, size: 40 }),
      createVariant({ productId: pizza1.id, pizzaType: 1, size: 40 }),
      createVariant({ productId: pizza1.id, pizzaType: 1, size: 50 }),

      createVariant({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      createVariant({ productId: pizza2.id, pizzaType: 2, size: 40 }),
      createVariant({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      createVariant({ productId: pizza2.id, pizzaType: 1, size: 50 }),

      createVariant({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      createVariant({ productId: pizza3.id, pizzaType: 2, size: 40 }),
      createVariant({ productId: pizza3.id, pizzaType: 1, size: 40 }),
      createVariant({ productId: pizza3.id, pizzaType: 1, size: 50 }),

      createVariant({ productId: 1 }),
      createVariant({ productId: 2 }),
      createVariant({ productId: 3 }),
      createVariant({ productId: 4 }),
      createVariant({ productId: 5 }),
      createVariant({ productId: 6 }),
      createVariant({ productId: 7 }),
      createVariant({ productId: 8 }),
      createVariant({ productId: 9 }),
      createVariant({ productId: 10 }),
      createVariant({ productId: 11 }),
      createVariant({ productId: 12 }),
      createVariant({ productId: 13 }),
      createVariant({ productId: 14 }),
      createVariant({ productId: 15 }),
      createVariant({ productId: 16 }),
      createVariant({ productId: 17 }),
    ],
  });

  const basket = await prisma.cart.createMany({
    data: [
      {
        token: "12345",
        userId: user1.id,
        totalAmount: 3000,
      },
      {
        token: "54321",
        userId: user2.id,
        totalAmount: 3000,
      },
    ],
  });

  const basketProduct = await prisma.cartProduct.create({
    data: {
      quantity: 2,
      cartId: 1,
      variantid: 1,
      ingredients: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });
}

async function reset() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await reset();
    await create();
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
