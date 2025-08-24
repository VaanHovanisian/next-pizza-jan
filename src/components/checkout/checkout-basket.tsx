"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../ui';
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import { BasketCard } from '../basket/basket-card';
import { useBasket } from '@/hooks/basket';
import { getBasketCardDetalis } from '@/lib/get-basket-card-detalis';
import { PizzaSize, PizzaType } from '@/@types/pizza';
import { Trash2 } from 'lucide-react';

interface Props {
    className?: string;
}

export const CheckoutBasket: React.FC<Props> = (props) => {
    const { className } = props;
    const { items, updateProduct, removeProduct, isLoading } = useBasket()
    return (

        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>1.Корзина</span>
                    <span className="flex items-center gap-2"><Trash2 />Очистить корзину</span>
                </CardTitle>
            </CardHeader>
            <CardContent className=" ">
                <ul className="overflow-auto">
                    {
                        items.length === 0 ?
                            <h1>Empty</h1> :
                            items.map((el) => (
                                <li key={el.id}>
                                    <BasketCard
                                        imgUrl={el.imgUrl}
                                        title={el.name}
                                        detalis={getBasketCardDetalis(el.pizzaType as PizzaType, el.size as PizzaSize, el.ingredients)}
                                        price={el.price}
                                        count={el.quantity}
                                        increment={() => updateProduct(el.id, el.quantity + 1)}
                                        decrement={() => updateProduct(el.id, el.quantity - 1)}
                                        remove={() => removeProduct(el.id)} />
                                </li>
                            ))
                    }
                </ul>
            </CardContent>
        </Card>



    );
}