import { z } from "zod";

export const dashboardIngredientSchema = z.object({
    name: z.string().min(4, { message: "minimum 4 simbol" }),
    price: z.coerce.number().positive({ message: "Enter a valid price" }),
    imgUrl: z.instanceof(File).or(z.string()),
})

export const dashboardProductFormSchema = z.object({
    name: z.string().min(4, "Name is required"),
    imgUrl: z.union([
        z.string().optional(),
        z.instanceof(File),
    ]),
    categoryId: z.string().min(1, "Category is required"),
    price: z
        .string()
        .refine(
            (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
            "Price must be a number >= 0"
        ),
    size: z.string().nullable(),
    pizzaType: z.string().nullable(),
    ingredients: z.record(z.string(), z.boolean()),
});
