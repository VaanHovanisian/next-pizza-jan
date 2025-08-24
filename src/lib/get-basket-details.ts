import { BasketRelation } from "@/@types/basket";
import { calcBasketPrice } from "./calc-basket-price";

export const getBasketDetails = (data: BasketRelation) => {
    const items = data?.products?.map(el => ({
        id: el.id,
        name: el.variant.product.name,
        price: calcBasketPrice(el),
        quantity: el.quantity,
        imgUrl: el.variant.product.imgUrl,
        size: el.variant.size,
        pizzaType: el.variant.pizzaType,
        ingredients: el?.ingredients?.map(item => ({
            name: item.name,
            price: item.price
        }))
    }))
    const totalAmount = data?.products?.reduce((acc, el) => acc + calcBasketPrice(el), 0)
    return { items, totalAmount }
}
