"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FormInput } from "./form-input";
import { Button } from "../ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/@types/form";
import { loginFormSchema } from "@/constants/form/login-form-schema";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const FormLogin: React.FC<Props> = (props) => {
  const { className } = props;
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      await signIn("credentials", {
        callbackUrl: "/",
        redirect: true,
        ...data,
      });
      toast.success("good login");
    } catch (error) {
      console.log(error);
      toast.error("ploxo vso ne poluchilos zaloginetsa");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("", className)}
      >
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <Button type="submit">Login</Button>
      </form>
    </FormProvider>
  );
};
