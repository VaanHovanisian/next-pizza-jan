"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button, Card } from "../ui";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import { Package, Percent, Truck } from "lucide-react";
import { CheckoutItemDetalis } from "./checkout-item-detalis";
import { useBasket } from "@/hooks/basket";

interface Props {
  className?: string;
}

const TAX = 0.05;
const DELIVERY = 120;

export const CheckoutSumm: React.FC<Props> = (props) => {
  const { className } = props;
  const { totalAmount } = useBasket();
  const taxPrice = totalAmount * TAX;
  const total = taxPrice + DELIVERY + totalAmount;

  return (
    <Card className={cn("max-w-[450px] w-full", className)}>
      <CardHeader className="grid gap-3">
        <span className="text-[22px]">Итого:</span>
        <span className="text-[34px] font-bold">{total} ₽</span>
      </CardHeader>
      <CardContent className="mb-5">
        <CheckoutItemDetalis
          icon={<Package />}
          title="Стоимость товаров:"
          value={`${totalAmount} ₽`}
        />
        <CheckoutItemDetalis
          icon={<Percent />}
          title="Налоги:"
          value={`${taxPrice} ₽`}
        />
        <CheckoutItemDetalis
          icon={<Truck />}
          title="Доставка:"
          value={`${DELIVERY} ₽`}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Перейти к оплате</Button>
      </CardFooter>
    </Card>
  );
};
