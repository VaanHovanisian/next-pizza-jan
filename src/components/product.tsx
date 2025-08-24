"use client"

import React from 'react';
import { cn } from '@/lib/utils';

import { ProductRelation } from '@/@types/prisma';
import { PizzaForm } from './pizza-form';

import { ProductForm } from './product-form';
import { useBasket } from '@/hooks/basket';
import { toast } from 'react-hot-toast';

interface Props {
    className?: string;
    product: ProductRelation;
}

export const Product: React.FC<Props> = (props) => {
    const { product } = props;
    const isPizza = product.variants[0].pizzaType
    const { createProduct } = useBasket()

    const onAddProduct = async (variantId?: number, ingredients?: number[]) => {
        try {
            await createProduct({ variantId: variantId ?? product.variants[0].id, ingredients })
            toast.success("urrraa avelacav producty")
        } catch (error) {
            console.dir(error)
            toast.error("ploxo chavelacav producty")
        }

    }

    if (isPizza) {
        return <PizzaForm
            imgUrl={product.imgUrl}
            name={product.name}

            variants={product.variants}
            ingredients={product.ingredients}
            onSubmit={onAddProduct}
        />
    }

    return (

        <ProductForm
            imgUrl={product.imgUrl}
            name={product.name}
            price={product.variants[0].price}
            onSubmit={onAddProduct}
        />
    )
}