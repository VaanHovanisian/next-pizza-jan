import { UserRole } from "@prisma/client";
import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {

    interface Session {

        user: {

            id: string;
            name: string;
            email: string;
            role: UserRole;
        }

    }
    interface User extends DefaultUser {
        id: string;
        role: UserRole;
    }
}



declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: UserRole;
    }
}