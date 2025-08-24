import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getIngredients = async () => {
    return (await axiosInstance.get(ApiRoutes.INGREDIENTS)).data
}