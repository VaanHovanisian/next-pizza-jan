import { PizzaSize, PizzaType } from "@/@types/pizza";
import { objPizzaTypes, pizzatypes } from "@/constants/pizza";

export const getBasketCardDetalis = (pizzatypes: PizzaType, pizzaSizes: PizzaSize, ingredients: Array<{ name: string; price: number }>) => {
    const result = [];
    if (pizzaSizes && pizzatypes) {
        result.push(`${objPizzaTypes[pizzatypes]} ${pizzaSizes} см`);
    }

    if (ingredients.length > 0) {
        result.push(ingredients.map(el => el.name).join(', '));

    }

    return result.join(', ');

}