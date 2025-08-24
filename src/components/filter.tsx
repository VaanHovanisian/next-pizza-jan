"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FilterGroup } from "./filter-group";
import { Title } from "./title";

import { FilterPrice } from "./filter-price";
import { useFilter } from "@/hooks/filter";
import { useIngredient } from "@/hooks/ingredients";
import { useQueryFilter } from "@/hooks/query-filter";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = (props) => {
  const { className } = props;
  const filter = useFilter();
  useQueryFilter(filter);
  const { niceIngredients } = useIngredient();

  return (
    <div className={cn("flex flex-col gap-5 ", className)}>
      <Title size={"m"}>Филтрация</Title>
      <FilterGroup
        items={[
          { name: "30 cm", value: 30 },
          { name: "40 cm", value: 40 },
          { name: "50 cm", value: 50 },
        ]}
        title={"Размеры:"}
        setSelected={filter.setSelectedSize}
        selected={filter.selectedSize}
      />
      <FilterPrice value={filter.prices} setValue={filter.setPrices} />
      <FilterGroup
        items={[
          { name: "Традиционное", value: 1 },
          { name: "Тонкое", value: 2 },
        ]}
        title={"Тип Теста:"}
        setSelected={filter.setSelectedType}
        selected={filter.selectedType}
      />
      <FilterGroup
        items={niceIngredients}
        title={"Ингридиенты:"}
        setSelected={filter.setSelectedIngredients}
        selected={filter.selectedIngredients}
        limit={6}
      />
    </div>
  );
};
