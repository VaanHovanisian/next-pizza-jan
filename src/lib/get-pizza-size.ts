import { PizzaType, Variant } from "@/@types/pizza";
import { Variation } from "@prisma/client";

export const getPizzaSize = (
    type: PizzaType,
    variants: Variation[],
    pizzaSizes: Variant[]
) => {
    const filteredPizzasByType = variants.filter((el) => el.pizzaType === type);

    const filteredPizzasSizes = pizzaSizes.map((el) => ({
        name: el.name,
        value: el.value,
        disabled: !filteredPizzasByType.some((item) => item.size === +el.value),
    }));

    return filteredPizzasSizes;
};