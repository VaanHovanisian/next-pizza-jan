import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './ui';

interface Props {
    className?: string;
    name: string;
    setSelected: () => void;
    selected: boolean;

}

export const FilterChekbox: React.FC<Props> = (props) => {
    const { className, name, selected, setSelected } = props;
    return (
        <label className={cn("flex gap-2 items-center", className)}>

            <Checkbox onCheckedChange={setSelected} checked={selected} />

            {name}

        </label>
    );
}