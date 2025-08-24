import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Input } from "./ui";
import { DualRangeSlider } from "./ui/dual-slider";

interface Props {
  className?: string;
  value: number[];
  setValue: (value: number[]) => void;
}

export const FilterPrice: React.FC<Props> = (props) => {
  const { className, value, setValue } = props;
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <Title size={"s"}>Цена от и до:</Title>
      <div className="flex items-center">
        <Input
          value={value[0]}
          onChange={(e) => setValue([+e.target.value, value[1]])}
          type="number"
          placeholder="0 ₽"
          min={0}
          max={5000}
        />
        <Input
          value={value[1]}
          onChange={(e) => setValue([value[0], +e.target.value])}
          type="number"
          placeholder="5000 ₽"
          min={0}
          max={5000}
        />
      </div>
      <DualRangeSlider
        label={(value) => value}
        value={value}
        onValueChange={setValue}
        min={0}
        max={5000}
        step={100}
      />
    </div>
  );
};
