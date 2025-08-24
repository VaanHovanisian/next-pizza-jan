import { CartProduct, Ingredient, Product, Variation } from "@prisma/client"

export type BasketCardRelation = CartProduct & {
    ingredients: Ingredient[],
    variant: Variation & {
        product: Product;
    }
};

export type BasketRelation = {
    products: BasketCardRelation[],

}

export type CreateBasketValues = {
    variantId: number;
    ingredients?: number[];

};
