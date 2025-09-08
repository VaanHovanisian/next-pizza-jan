import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(3, { message: "minimum 3 simbol" });

export const loginFormSchema = z.object({
  email: z.email({ message: "write correct email" }),
  password: passwordSchema,
});
