"use client"


import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';

interface Props {
    className?: string;
    items: Array<{ name: string; id: number }>;
}

export const Categories: React.FC<Props> = (props) => {
    const { className, items } = props;
    const activeCategory = useCategoryStore(state => state.activeCategory)
    return (
        <ul className={cn("flex items-center w-fit gap-2 bg-gray-300 rounded-2xl p-4", className)}>
            {items.map((el) => (
                <li key={el.id}>
                    <Link className={cn('bg-gray-200 rounded-2xl px-3 py-2', { "bg-white": activeCategory === el.id })} href={`#${el.name}`}>{el.name}</Link>

                </li>


            ))}
        </ul>



    );
}