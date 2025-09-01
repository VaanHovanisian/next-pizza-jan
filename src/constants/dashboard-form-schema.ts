import z from "zod";

export const dashboardIngredientSchema = z.object({
  name: z.string().min(4, { message: "minimum 4 simbol" }),
  imgUrl: z.instanceof(File).or(z.string()),
  price: z.coerce.number().positive({ message: "Enter a valid price" }),
});
