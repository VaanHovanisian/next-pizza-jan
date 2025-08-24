"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button, Dialog, DialogTrigger, DialogContent } from "./ui";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormLogin, FormRegister } from "./form";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const AuthModal: React.FC<Props> = (props) => {
  const { className, children } = props;
  const [toggleAuth, setToggleAuth] = React.useState<"LogIn" | "Register">(
    "LogIn"
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("z-200", className)}>
        <div className="flex flex-col gap-5">
          {toggleAuth === "LogIn" ? <FormRegister /> : <FormLogin />}
          <div className="flex items-center justify-evenly">
            <Button
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/" })
              }
            >
              <Image
                src="/google-icon.png"
                alt="google-icon"
                width={24}
                height={24}
              />
              <span>Sign in with Google</span>
            </Button>
            <Button
              onClick={() =>
                signIn("github", { redirect: true, callbackUrl: "/" })
              }
            >
              <Image
                src="/github-icon.png"
                alt="google-icon"
                width={24}
                height={24}
              />
              <span>Sign in with Github</span>
            </Button>
          </div>
          <Button
            onClick={() =>
              setToggleAuth((prev) => (prev === "LogIn" ? "Register" : "LogIn"))
            }
          >
            {toggleAuth === "LogIn" ? "Войти" : "Register"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
