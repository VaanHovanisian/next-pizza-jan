import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getCategories = async () => {
    return (await axiosInstance.get(ApiRoutes.CATEGORY)).data
}