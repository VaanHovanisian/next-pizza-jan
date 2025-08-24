import { BasketCardRelation } from "@/@types/basket";

export const calcBasketPrice = (item: BasketCardRelation): number => {
    const ingredientsPrice = item?.ingredients?.reduce((acc, el) => acc + el.price, 0);
    return (ingredientsPrice + item.variant.price) * item.quantity;
};