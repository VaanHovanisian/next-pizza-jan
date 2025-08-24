export const objPizzaSizes = {
    30: "Маленкая",
    40: "Средняя",
    50: "Большая",
} as const;

export const objPizzaTypes = {
    1: "Тонкое",
    2: "Традиционное",
} as const;

export const pizzaSizes = Object.entries(objPizzaSizes).map(
    ([value, name]) => ({
        name,
        value,
    })
);
console.log(pizzaSizes);

export const pizzatypes = Object.entries(objPizzaTypes).map(
    ([value, name]) => ({
        name,
        value,
    })
);