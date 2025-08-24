"use server";

import { CheckoutFormSchema } from "@/@types/form";
import { OrderTemplate } from "@/components";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prizma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormSchema) {
  try {
    const cookie = await cookies();
    const basketToken = cookie.get("basketToken")?.value;
    if (!basketToken) {
      throw new Error("Token not found");
    }
    const userBasket = await prisma.cart.findFirst({
      where: {
        token: basketToken,
      },
      include: {
        products: {
          include: {
            ingredients: true,
            variant: {
              include: {
                cartProducts: true,
              },
            },
          },
        },
      },
    });

    if (!userBasket) {
      throw new Error("Basket not found");
    }
    if (userBasket.totalAmount === 0) {
      throw new Error("Basket is empty");
    }
    const order = await prisma.order.create({
      data: {
        fullName: data.name + " " + data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        token: basketToken,
        totalAmount: userBasket.totalAmount as number,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userBasket.products),
      },
    });

    await prisma.cart.update({
      where: {
        id: userBasket.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartProduct.deleteMany({
      where: {
        cartId: userBasket.id,
      },
    });

    await sendEmail(
      data.email,
      "NEXT PIZZA ORDER",
      OrderTemplate({
        paymentUrl:
          "https://www.youtube.com/watch?v=wVdlFYFan3A&list=RDwVdlFYFan3A&start_radio=1",
        orderId: order.id,
      })
    );
    console.log(order, "order");
    return "https://www.youtube.com/watch?v=wVdlFYFan3A&list=RDwVdlFYFan3A&start_radio=1";
  } catch (error) {
    console.log(error);
  }
}
