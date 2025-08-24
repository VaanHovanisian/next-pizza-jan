import useSWR from "swr"
import { ApiRoutes } from "../services/constants"
import { fetcher } from "@/lib/fetcher"
import { getBasketDetails } from "@/lib/get-basket-details"
import { axiosInstance } from "@/services/instance"

import { CreateBasketValues } from "@/@types/basket"

export const useBasket = () => {
    const { data: basket, error, isLoading, isValidating, mutate } = useSWR(ApiRoutes.BASKET, fetcher)

    const data = basket?.products?.length > 0 ? getBasketDetails(basket) : { items: [], totalAmount: 0 }

    const updateProduct = async (id: number, quantity: number) => {
        const updateData = (await axiosInstance.patch(ApiRoutes.BASKET + "/" + id, { quantity })).data
        mutate(getBasketDetails(updateData), { populateCache: false })
    }

    const removeProduct = async (id: number) => {
        const updateData = (await axiosInstance.delete(ApiRoutes.BASKET + "/" + id)).data
        mutate(getBasketDetails(updateData), { populateCache: false })
    }
    const createProduct = async (data: CreateBasketValues) => {
        const updateData = (await axiosInstance.post(ApiRoutes.BASKET, data)).data
        mutate(getBasketDetails(updateData))
    }

    return { items: data.items, totalAmount: data.totalAmount, error, isLoading, isValidating, updateProduct, removeProduct, createProduct }

}