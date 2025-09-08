"use server";
import { RegisterTemplate } from "@/components";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prizma-client";
import { Prisma } from "@prisma/client";

export async function registerProfile(data: Prisma.UserCreateInput) {
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (findUser) {
            if (!findUser.verified) {
                throw new Error("user not verified");
            }
            throw new Error("user already exists");
        }

        const createUser = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                fullName: data.fullName,
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createUser.id,
            },
        });

        await sendEmail(
            data.email,
            "NEXT PIZZA VERIFICATION CODE",
            RegisterTemplate({ code })
        );
    } catch (error) {
        console.log(error);
    }
}
