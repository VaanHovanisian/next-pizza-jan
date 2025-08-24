import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui';
import { Ingredient, Variation } from '@prisma/client';
import { usePizzaOpitons } from '@/hooks/pizza-options';
import { pizzaSizes, pizzatypes } from '@/constants/pizza';
import { PizzaImage } from './pizza-image';
import { PizzaVariants } from './pizza-variants';
import { PizzaSize, PizzaType } from '@/@types/pizza';
import { IngredientItem } from './ingredient-item';
import { calcPizzaPrice } from '@/lib/calc-pizza-price';

interface Props {
    className?: string;
    name: string;
    variants: Variation[];
    ingredients: Ingredient[];
    imgUrl: string;
    onSubmit: (variantId: number, ingredients: number[]) => Promise<void>;
}

export const PizzaForm: React.FC<Props> = (props) => {
    const { className, imgUrl, name, onSubmit, ingredients, variants } = props;
    const { filteredPizzasSizes, selectedIngredients, setSelectedIngredients, setSize, setType, size, type, activeVariantId } =
        usePizzaOpitons(variants, pizzaSizes);

    const totalPrice = calcPizzaPrice(size, type, variants, ingredients, selectedIngredients)

    const create = async () => {
        if (activeVariantId) {
            await onSubmit(activeVariantId, Array.from(selectedIngredients));

        }
    }
    return (
        <div className={cn(" flex items-center justify-center gap-5", className)}>
            <div>
                <PizzaImage size={size} imgUrl={imgUrl} />
            </div>
            <div className='flex flex-col gap-7'>
                <h2 className='text-[28px]'>{name}</h2>
                <PizzaVariants selectedValue={size.toString()} variants={filteredPizzasSizes} setSelectedValue={(value) => setSize(+value as PizzaSize)} />
                <PizzaVariants selectedValue={type.toString()} variants={pizzatypes} setSelectedValue={(value) => setType(+value as PizzaType)} />

                <ul className='grid grid-cols-3 gap-3'>
                    {
                        ingredients.map((el) => (
                            <li key={el.id}>
                                <IngredientItem imgUrl={el.imgUrl} name={el.name} price={el.price} checked={selectedIngredients.has(el.id)} onChecked={() => setSelectedIngredients(el.id)} />

                            </li>
                        ))
                    }
                </ul>


                <Button onClick={create} className='text-[18px]'>Добавить в корзину{totalPrice}</Button>
            </div>


        </div>
    );
}