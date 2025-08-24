"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
}

export const FormInput: React.FC<Props> = (props) => {
  const { className, name, label, ...inputProps } = props;
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const onReset = () => setValue(name, "");
  const errorText = errors[name]?.message as string;
  return (
    <label className={cn("", className)}>
      {label && <span>{label}</span>}

      <span className="relative block">
        <Input {...register(name)} {...inputProps} />
        {value && (
          <button
            type="button"
            onClick={onReset}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
          >
            <X />
          </button>
        )}
      </span>

      {errorText && <span className="text-red-500">{errorText}</span>}
    </label>
  );
};
