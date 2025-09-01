import { dashboardIngredientSchema } from "@/constants/dashboard-form-schema";
import z from "zod";

export type Mode = {
  mode: "create" | "update" | "delete" | null;
  id?: number;
  value?: string;
};

export type DashboardIngredientSchema = z.infer<
  typeof dashboardIngredientSchema
>;
