"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from './search';
import { getProducts } from '@/services/products';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
    className?: string;
}

export const SearchHeader: React.FC<Props> = (props) => {
    const { className } = props;
    const [products, setProducts] = React.useState<Product[]>([])
    const [searchValue, setSearchValue] = React.useState("")
    const [focus, setFocus] = React.useState(false)

    useDebounce(async () => {
        // const res = await fetch("http://localhost:3000/api/products?search=" + searchValue)
        // const data = await res.json()
        // setProducts(data)

        const data = await getProducts(searchValue);
        setProducts(data)




    }, 300, [searchValue])


    const ref = React.useRef(null);
    useClickAway(ref, () => {
        setFocus(false);
    });


    return (
        <>
            {
                focus &&
                <div className='fixed bg-black/50 inset-0 z-50 '></div>
            }

            <div className={cn("relative z-50", className)} ref={ref}>
                <Search onFocus={() => setFocus(true)} value={searchValue} setValue={setSearchValue} />
                {
                    focus &&
                    <ul className='absolute w-full bg-white p-2 rounded-2xl '>
                        {
                            products.map((el) => (
                                <li className='hover:bg-primary/50 rounded-1xl'>
                                    <Link className='flex items-center gap-2 ' href={`/product/${el.id}`} >
                                        <img src={el.imgUrl} alt={el.name} width={40} height={40} />{el.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                }

            </div>

        </>
    );
}