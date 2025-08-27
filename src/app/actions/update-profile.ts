"use server";

import { RegisterTemplate } from "@/components";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prizma-client";
import { Prisma } from "@prisma/client";

export async function updateProfile(data: Prisma.UserUpdateInput) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email as string,
      },
    });

    if (!findUser) {
      throw new Error("user already exists");
    }

    await prisma.user.update({
      where: {
        email: data.email as string,
      },
      data: {
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
