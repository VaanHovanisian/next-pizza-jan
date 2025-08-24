"use client";
import { CheckoutInfo, CheckoutSumm, Container } from "@/components";
import { CheckoutBasket } from "@/components/checkout/checkout-basket";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "@/constants/checkout-form-schema";
import { CheckoutFormSchema } from "@/@types/form";
import { CheckoutAddress } from "@/components/checkout/checkout-address";
import { createOrder } from "@/app/actions/create-order";
import toast from "react-hot-toast";

export default function Checkout() {
  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });
  const onSubmit = async (data: CheckoutFormSchema) => {
    try {
      const order = await createOrder(data);
      toast.success("Заказ успешно создан");

      if (order) {
        location.href = order;
      }
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при создании заказа");
    }
  };
  return (
    <>
      <FormProvider {...form}>
        <form className=" m-auto mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <Container className="grid gap-5">
            <h2 className="text-2xl mb-10 font-bold">Оформление заказа</h2>
            <div className="flex items-start gap-5">
              <div className="w-full grid gap-5">
                <CheckoutBasket />
                <CheckoutInfo />
                <CheckoutAddress />
              </div>
              <CheckoutSumm />
            </div>
          </Container>
        </form>
      </FormProvider>
    </>
  );
}
