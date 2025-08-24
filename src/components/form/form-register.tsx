"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FormInput } from "./form-input";
import { Button } from "../ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/constants/form/register-form-schema";
import { RegisterFormSchema } from "@/@types/form";
import toast from "react-hot-toast";
import { registerProfile } from "@/app/actions/register-profile";

interface Props {
  className?: string;
}

export const FormRegister: React.FC<Props> = (props) => {
  const { className } = props;
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await registerProfile(data);
      toast.success("good register");
    } catch (error) {
      console.log(error);
      toast.error("bad register");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("", className)}
      >
        <FormInput name="fullName" label="Full Name" />
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
        <Button type="submit">Register</Button>
      </form>
    </FormProvider>
  );
};
