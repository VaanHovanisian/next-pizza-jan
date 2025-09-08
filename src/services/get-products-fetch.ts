import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getProductsFetch = async () => {
    return (await axiosInstance.get(ApiRoutes.PRODUCTS)).data
}