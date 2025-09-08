import z from "zod";
import { dashboardIngredientSchema } from "../constants/dashboard-form-schema";
import { dashboardProductFormSchema } from "../constants/dashboard-form-schema";

export type Mode = {
    mode: "create" | "update" | "delete" | null;
    id?: number;
    value?: string;
};
export type DashboardProductSchema = z.infer<typeof dashboardProductFormSchema>;
export type DashboardIngredientSchema = z.infer<typeof dashboardIngredientSchema>;
