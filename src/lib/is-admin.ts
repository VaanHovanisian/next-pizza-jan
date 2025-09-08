import { authOptions } from "@/constants/auth-options";
import { getServerSession } from "next-auth";



export const isAdmin = async () => {
    try {
        const user = await getServerSession(authOptions)
        if (!user?.user?.email) {
            return false
        }
        return user.user.role === "ADMIN"
    } catch (error) {
        console.log(error)
        return false
    }

}