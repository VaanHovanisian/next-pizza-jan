import { objPizzaSizes, objPizzaTypes } from "@/constants/pizza";

export type Variant = {
    disabled?: boolean
    name: string
    value: string
}
export type PizzaSize = keyof typeof objPizzaSizes;
export type PizzaType = keyof typeof objPizzaTypes;