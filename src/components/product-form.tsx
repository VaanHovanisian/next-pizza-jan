"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui';

interface Props {
    className?: string;
    name: string;
    price: number;
    imgUrl: string;
    onSubmit: () => void;
}

export const ProductForm: React.FC<Props> = (props) => {
    const { className, imgUrl, name, onSubmit, price } = props;
    return (
        <div className={cn("max-w-[450px] h-[250px] flex items-center gap-8", className)}>
            <div>
                <img src={imgUrl} alt="" />
            </div>
            <div className='flex flex-col gap-7'>
                <h2 className='text-[28px]'>{name}</h2>
                <Button onClick={() => onSubmit()} className='text-[18px]'>Добавить в корзину{price}</Button>
            </div>


        </div>
    );
}