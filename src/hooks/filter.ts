import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}
export interface Filter {
  prices: number[];
  selectedIngredients: Set<string>;
  selectedSize: Set<string>;
  selectedType: Set<string>;
}

interface ReturnProps extends Filter {
  setPrices: (value: number[]) => void;
  setSelectedIngredients: (value: string) => void;
  setSelectedSize: (value: string) => void;
  setSelectedType: (value: string) => void;
}

export const useFilter = (): ReturnProps => {
  const searchParams = useSearchParams();
  const [prices, setPrices] = React.useState([]);


  const query = Object.fromEntries(Array.from(searchParams));

  const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
    new Set<string>(query.ingredients?.split(",") || [])
  );
  const [selectedSize, { toggle: setSelectedSize }] = useSet(
    new Set<string>(query.sizes?.split(",") || [])
  );
  const [selectedType, { toggle: setSelectedType }] = useSet(
    new Set<string>(query.types?.split(",") || [])
  );

  return {
    prices,
    setPrices,
    selectedIngredients,
    selectedSize,
    selectedType,
    setSelectedIngredients,
    setSelectedSize,
    setSelectedType,
  };
};
