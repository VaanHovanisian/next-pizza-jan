import React from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filter } from "./filter";
export const useQueryFilter = (filter: Filter) => {
  const router = useRouter();

  React.useEffect(() => {
    const query = qs.stringify(
      {
        sizes: Array.from(filter.selectedSize),
        types: Array.from(filter.selectedType),
        ingredients: Array.from(filter.selectedIngredients),
        priceFrom: filter.prices[0],
        priceTo: filter.prices[1],
      },
      {
        arrayFormat: "comma",
        encode: false,
      }
    );
    router.push(`?${query}`);
  }, [
    filter.prices,
    filter.selectedSize,
    filter.selectedType,
    filter.selectedIngredients,
  ]);
};
