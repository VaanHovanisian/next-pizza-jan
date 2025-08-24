import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from '../title';
import { X } from 'lucide-react';
import { BasketCountButton } from './basket-count-button';

interface Props {
    className?: string;
    imgUrl: string;
    title: string;
    detalis: string;
    price: number;
    count: number;
    increment: () => Promise<void>;
    decrement: () => Promise<void>;
    remove: () => Promise<void>;
    isCheckout?: boolean;
}

export const BasketCard: React.FC<Props> = (props) => {
    const { className, count, decrement, increment, remove, imgUrl, title, detalis, price, isCheckout } = props;
    const [loading, setLoading] = React.useState(false)
    const deleteProduct = async () => {
        setLoading(true)
        await remove()
    }
    return (
        <div className={cn("flex items-start bg-white gap-5 p-3 relative", { "opacity-50, pointer-events-none": loading }, className)}>
            <img src={imgUrl} alt="" width={80} height={80} className="ml-2" />
            <div className="flex flex-col gap-2 w-full p-2">
                <div className="">
                    <Title size={'s'} className="mb-2">
                        {title}
                    </Title>
                    <p className="text-[14px] text-gray-400">{detalis}</p>
                </div>

                <div className="flex flex-row-reverse justify-between items-center gap-2">
                    <span >{price} ₽</span>
                    <BasketCountButton increment={increment} decrement={decrement} count={count} className="flex items-center gap-2" />
                </div>

                <button className="absolute top-1 right-1 cursor-pointer opacity-70 hover:opacity-100" onClick={deleteProduct}><X /></button>
            </div>
        </div>
    );
}