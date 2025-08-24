import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui";
import { useSession } from "next-auth/react";
import { AuthModal } from "./auth-modal";
import Link from "next/link";
import { User } from "lucide-react";

interface Props {
  className?: string;
}

export const AuthButton: React.FC<Props> = (props) => {
  const { className } = props;
  const user = useSession();
  console.log(user);

  if (user.data?.user?.email) {
    return (
      <Button className={cn("", className)} variant={"outline"}>
        <Link className="flex gap-2 items-center" href={"/profile"}>
          {user.data.user.image ? (
            <img
              className="w-6 h-6"
              width={24}
              height={24}
              src={user.data.user.image}
              alt=""
            />
          ) : (
            <User />
          )}
          <span>Профиль</span>
        </Link>
      </Button>
    );
  }

  return (
    <AuthModal>
      <Button className={cn("", className)} variant={"outline"}>
        <span>Войти</span>
      </Button>
    </AuthModal>
  );
};
