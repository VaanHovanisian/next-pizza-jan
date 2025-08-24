"use client"


import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog } from './ui';
import { DialogContent, DialogTitle } from './ui/dialog';
import { Product } from './product';
import { useRouter } from 'next/navigation';

import { ProductRelation } from '@/@types/prisma';


interface Props {
    className?: string;
    product: ProductRelation;
}

export const Modal: React.FC<Props> = (props) => {
    const { className, product } = props;

    const router = useRouter()
    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='sm:max-w-[1200px] z-100'>
                <DialogTitle />
                <Product product={product} />
            </DialogContent>
        </Dialog>
    );
}