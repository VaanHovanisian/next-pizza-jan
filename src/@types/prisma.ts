import { Ingredient, Product, Variation } from "@prisma/client";

export type ProductRelation = Product & {
    ingredients: Ingredient[],
    variants: Variation[]
}