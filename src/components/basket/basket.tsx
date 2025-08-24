"use client"

import React from "react";
import { cn } from "@/lib/utils";
import { Button, Sheet } from "../ui";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useBasket } from "@/hooks/basket";
import { BasketCard } from "./basket-card";
import { get } from "http";
import { getBasketCardDetalis } from "@/lib/get-basket-card-detalis";
import { PizzaSize, PizzaType } from "@/@types/pizza";
import Link from "next/link";

interface Props {
  className?: string;
  children?: React.ReactNode;

}

export const Basket: React.FC<Props> = (props) => {
  const { className, children } = props;
  const { items, totalAmount, updateProduct, removeProduct } = useBasket()
  return (
    <div className={cn("", className)}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="bg-[#F4F1EE]">
          <SheetHeader><SheetTitle>Корзина</SheetTitle></SheetHeader>
          <ul className="overflow-auto grid gap-3">
            {
              items.length === 0 ?
                <h1>Empty</h1> :
                items.map((el) => (
                  <li key={el.id}>
                    <BasketCard
                      imgUrl={el.imgUrl}
                      title={el.name}
                      detalis={getBasketCardDetalis(el.pizzaType as PizzaType, el.size as PizzaSize, el.ingredients)}
                      price={el.price}
                      count={el.quantity}
                      increment={() => updateProduct(el.id, el.quantity + 1)}
                      decrement={() => updateProduct(el.id, el.quantity - 1)}
                      remove={() => removeProduct(el.id)} />
                  </li>
                ))
            }
          </ul>
          <SheetFooter>
            <span>Итого: {totalAmount} $</span>
            <Button>
              <Link href="/checkout">Оформить Заказ</Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
