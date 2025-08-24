"use client"


import React from 'react';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

interface Props {
    className?: string;
    value?: string;
    setValue?: (value: string) => void
    onFocus?: () => void;
}

export const Search: React.FC<Props> = (props) => {
    const { className, value, setValue, onFocus } = props;
    return (
        <label className={cn("relative flex items-center gap-2", className)}>
            <SearchIcon className='absolute left-1 text-gray-400' />
            <Input onFocus={onFocus} value={value} onChange={(e) => setValue?.(e.target.value)} placeholder='Поиск пиццы...' className='pl-8 py-1 bg-[#f9f9f9]' />
        </label>
    );
}