import { checkoutFormSchema } from "@/constants/checkout-form-schema";
import { loginFormSchema } from "@/constants/form/login-form-schema";
import { registerFormSchema } from "@/constants/form/register-form-schema";
import { z } from "zod";

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
