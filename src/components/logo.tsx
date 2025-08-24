import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    className?: string;
}

export const Logo: React.FC<Props> = (props) => {
    const { className } = props;
    return (
        <Link className={cn("flex gap-[10px] items-start", className)} href={'/'}>
            <Image src={'/logo.png'} alt={''} width={35} height={35} />
            <div className='flex flex-col'>
                <b className='text-2xl font-black'>NEXT PIZZA</b>
                <strong className='text-[#7b7b7b] text-base font-normal'>вкусней уже некуда</strong>
            </div>

        </Link>
    );
}