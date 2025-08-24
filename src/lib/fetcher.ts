import { axiosInstance } from "@/services/instance";

export const fetcher = (url: string) => axiosInstance.get(url).then(({ data }) => data)