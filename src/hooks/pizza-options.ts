import { PizzaSize, PizzaType, Variant } from "@/@types/pizza";
import { getPizzaSize } from "@/lib/get-pizza-size";
import { Variation } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    setSelectedIngredients: (id: number) => void;
    filteredPizzasSizes: Variant[];
    activeVariantId?: number;
}

export const usePizzaOpitons = (
    variants: Variation[],
    pizzaSizes: Variant[]
): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(30);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
        new Set<number>([])
    );
    const filteredPizzasSizes = getPizzaSize(type, variants, pizzaSizes);

    const activeVariantId = variants.find(
        (el) => el.size === size && el.pizzaType === type
    )?.id;

    React.useEffect(() => {
        const isPizza = filteredPizzasSizes.find((el) => !el.disabled);
        if (isPizza) {
            setSize(+isPizza.value as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        setSelectedIngredients,
        filteredPizzasSizes,
        activeVariantId,
    };
};