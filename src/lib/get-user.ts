import { getServerSession } from "next-auth"
import { authOptions } from "@/constants/auth-options"

export const getUser = async () => {
    const isUser = await getServerSession(authOptions)
    return isUser?.user || null
}
