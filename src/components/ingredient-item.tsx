import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface Props {
    className?: string;
    imgUrl: string;
    name: string;
    price: number;
    checked: boolean;
    onChecked: (checked: boolean) => void;
}

export const IngredientItem: React.FC<Props> = (props) => {
    const { className, imgUrl, price, name, checked, onChecked } = props;
    return (
        <div
            onClick={() => onChecked(true)}
            className={cn(
                "flex flex-col items-center gap-4 relative",
                checked && "border-1 border-primary rounded-2xl",
                className
            )}
        >
            {checked && <Check className="absolute top-2 right-2" />}
            <img src={imgUrl} alt={name} width={50} height={50} />
            <span>{name}</span>
            <span className="font-bold">{price}</span>
        </div>
    );
};