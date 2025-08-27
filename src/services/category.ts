import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getCategory = async () => {
  return (await axiosInstance.get(ApiRoutes.CATEGORY)).data;
};
