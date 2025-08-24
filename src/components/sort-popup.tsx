import React from 'react';
import { cn } from '@/lib/utils';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { ArrowUpDown } from 'lucide-react';


interface Props {
    className?: string;
}

export const SortPopup: React.FC<Props> = (props) => {
    const { className } = props;
    return (
        <div className={cn("", className)}>
            <Select defaultValue={"rating"}>
                <SelectTrigger className="">

                    <span className='flex items-center gap-2'>
                        <ArrowUpDown /> Сортировка:

                    </span>
                    <span className='text-primary'>
                        <SelectValue />

                    </span>
                </SelectTrigger>
                <SelectContent>


                    <SelectItem value="rating">Рейтингу</SelectItem>
                    <SelectItem value="price">Цене</SelectItem>


                </SelectContent>
            </Select>
        </div>
    );
}