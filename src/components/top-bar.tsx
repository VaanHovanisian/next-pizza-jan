import React from "react";
import { cn } from "@/lib/utils";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Container } from "./container";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
  categories: Array<{ name: string; id: number }>;
}

export const TopBar: React.FC<Props> = (props) => {
  const { className, categories } = props;
  return (
    <Container
      className={cn(
        "bg-white z-10 sticky top-2 flex justify-between",
        className
      )}
    >
      <Categories items={categories} />
      <SortPopup />
    </Container>
  );
};
