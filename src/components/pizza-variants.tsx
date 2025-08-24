"use client";

import { Variant } from "@/@types/pizza";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    className?: string;
    variants: Variant[];
    selectedValue: Variant["value"];
    setSelectedValue: (value: Variant["value"]) => void;
}

export const PizzaVariants: React.FC<Props> = (props) => {
    const { className, variants, selectedValue, setSelectedValue } = props;
    return (
        <ul
            className={cn(
                "flex items-center gap-4 bg-gray-100 rounded-2xl p-1",
                className
            )}
        >
            {variants.map((el) => (
                <li className="w-full" key={el.value}>
                    <button
                        onClick={() => setSelectedValue(el.value)}
                        className={cn("rounded-2xl py-2 px-4 w-full", {
                            "bg-white font-bold": selectedValue === el.value,
                            "pointer-events-none opacity-50": el.disabled,
                        })}
                    >
                        {el.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};