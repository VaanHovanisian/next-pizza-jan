import { z } from "zod";

export const checkoutFormSchema = z.object({
    name: z.string().min(2, { message: "Минимум 2 символа" }).max(20, "Максимум 20 символа"),
    lastname: z.string().min(3, { message: "Минимум 3 символа" }).max(20, "Максимум 20 символа"),
    email: z.email({ message: "Неверный email" }),
    phone: z.string().min(9, { message: "Минимум 9 символов" }).max(15, { message: "Максимум 15 символов" }),
    address: z.string().min(4, { message: "Минимум 4 символов" }).max(100, { message: "Максимум 100 символов" }),
    comment: z.string().optional(),
})
