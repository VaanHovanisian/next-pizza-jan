"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AuthButton, BasketButton, Logo, SearchHeader } from "@/components";
import { Container } from "./container";
import { SessionProvider } from "next-auth/react";
interface Props {
  className?: string;
  isCheckout?: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { className, isCheckout } = props;

  return (
    <SessionProvider>
      <header className={cn("", className)}>
        <Container className="flex justify-between items-center gap-3">
          <Logo />
          {!isCheckout && <SearchHeader className="flex-1" />}
          <AuthButton />
          {!isCheckout && <BasketButton />}
        </Container>
      </header>
    </SessionProvider>
  );
};
