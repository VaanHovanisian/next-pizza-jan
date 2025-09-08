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
import { updateProfile } from "@/app/actions/update-profile";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface Props {
  className?: string;
  user?: User
  children?: React.ReactNode
}

export const FormProfile: React.FC<Props> = (props) => {
  const { className, user, children } = props;
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: user?.email || "",
      fullName: user?.fullName || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await updateProfile(data);
      toast.success("good update");
    } catch (error) {
      console.log(error);
      toast.error("bad update");
    }
  };

  return (
    <FormProvider {...form}>
      {children}
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
        <div className="flex items-center gap-5">
          <Button type="submit">Update</Button>
          <Button type="button" variant="secondary" onClick={async () => await signOut({ callbackUrl: "/" })}>Sign Out</Button>
        </div>
      </form>

    </FormProvider>
  );
};
