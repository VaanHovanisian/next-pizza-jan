import { PizzaSize, PizzaType } from "@/@types/pizza";
import { Ingredient, Variation } from "@prisma/client";
import React from "react";

export const calcPizzaPrice = (
    size: PizzaSize,
    type: PizzaType,
    variants: Variation[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        variants.find((el) => el.pizzaType === type && el.size === size)?.price || 0;

    const totalIngredintsPrice = ingredients
        .filter((el) => selectedIngredients.has(el.id))
        .reduce((acc, el) => acc + el.price, 0);

    const totalPrice = pizzaPrice + totalIngredintsPrice;

    return totalPrice;
};