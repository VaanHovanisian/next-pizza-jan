"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Basket } from "./basket";
import { useBasket } from "@/hooks/basket";

interface Props {
  className?: string;
}

export const BasketButton: React.FC<Props> = (props) => {
  const { className } = props;
  const { items, totalAmount, isLoading, isValidating } = useBasket()
  return (
    <Basket>
      <Button variant={isLoading || isValidating ? "loading" : "default"} className={cn("", className)}>
        <span>{totalAmount}$</span>|<span>{items.length}</span>
      </Button>
    </Basket>
  );
};
