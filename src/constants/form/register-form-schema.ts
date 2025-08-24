import { z } from "zod";
import { passwordSchema } from "./login-form-schema";

export const registerFormSchema = z
  .object({
    email: z.email({ message: "write correct email" }),
    password: passwordSchema,
    fullName: z.string().min(2, { message: "minimum 2 simbol" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "write correct password",
    path: ["confirmPassword"],
  });
