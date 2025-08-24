"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { FilterChekbox } from './filter-chekbox';
import { Title } from './title';
import { Button } from './ui';
import { Search } from './search';

interface Props {
    className?: string;
    items: any[];
    limit?: number;
    title: string;
    setSelected: (value: number) => void;
    selected: Set<number>;

}

export const FilterGroup: React.FC<Props> = (props) => {
    const { className, items, limit, title, selected, setSelected } = props;
    const [openAll, setOpenAll] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")


    const limitItems = openAll ? items.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase())) : items.slice(0, limit)



    return (
        <div className={cn("", className)}>

            <Title size={'s'}>
                {title}
            </Title>
            {
                limit && openAll && (
                    <Search value={searchValue} setValue={setSearchValue} />
                )
            }
            <ul>
                {limitItems.map((el) => (
                    <li key={el.value}>
                        <FilterChekbox name={el.name} setSelected={() => setSelected(el.value)} selected={selected.has(el.value)} />

                    </li>
                ))}




            </ul>


            {
                limit && (
                    <Button onClick={() => setOpenAll(!openAll)}>
                        {!openAll ? "+ Показать все" : "- Скрыть"}
                    </Button>
                )
            }

        </div>
    );
}