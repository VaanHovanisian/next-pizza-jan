import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    icon: React.ReactNode;
    title: string;
    value: string | React.ReactNode;
}

export const CheckoutItemDetalis: React.FC<Props> = (props) => {
    const { className, icon, title, value } = props;
    return (
        <div className={cn("flex items-end gap-2", className)}>
            <span className='flex  gap-2'>{icon} {title}</span>
            <span className='border-dashed border-b-1 border-[#dfdfdf] flex-1' />
            <span>{value}</span>
        </div>
    );
}