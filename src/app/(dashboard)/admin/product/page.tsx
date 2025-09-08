"use client"
import { Button } from "@/components/ui";
import { FormInput } from "@/components/form";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mode } from "@/@types/admin";
import { productAdmin } from "@/app/actions/product-admin";
import toast from "react-hot-toast";

import { ImageViewer } from "@/components";
import { dashboardProductFormSchema } from "@/constants/dashboard-form-schema";
import { getProductsFetch } from "@/services/get-products-fetch";
import { uploadImage } from "@/lib/upload-image";
import { useSet } from "react-use";
import { Ingredient } from "@prisma/client";
import { getIngredients } from "@/services/ingredients";
import { ProductRelation } from "@/@types/prisma";



type Product = {
    id: number;
    name: string;
    imgUrl: string;
    categoryId: number;
    variants: {
        price: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
export default function DashboardProductPage() {
    const [data, setData] = React.useState<ProductRelation[]>([])
    const [mode, setMode] = React.useState<Mode>({ mode: "create" })
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    React.useEffect(() => {
        (async () => {
            setData(await getProductsFetch())
            setIngredients(await getIngredients())
        })()
    }, [])
    console.dir(data)

    const form = useForm({
        resolver: zodResolver(dashboardProductFormSchema),
        defaultValues: {
            name: "",
            price: "",
            imgUrl: "",
            categoryId: "",
            size: null,
            pizzaType: null,
            ingredients: {},
        },
    })

    const onSubmit = async (data: any) => {
        const selectedIngredients = Object.entries(data.ingredients || {})
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value)
            .map(([id]) => Number(id));
        console.dir(data)
        const imgUrl = await uploadImage(data.imgUrl) as string
        try {
            if (mode.mode === "create") {
                const create = await productAdmin({
                    name: data.name,
                    ingredients: selectedIngredients,

                    categoryId: Number(data.categoryId),
                    variants: [{
                        price: Number(data.price),
                        size: Number(data.size) || null,
                        pizzaType: data.pizzaType || null,

                    }],
                    imgUrl,
                }, "create")
                if (create) {
                    toast.error("sranic ka ur es sarqum")
                    return
                }
                else {
                    toast.success("Product added")
                }
            }
            else if (mode.mode === "update" && mode.id) {
                await productAdmin({
                    name: data.name,
                    ingredients: selectedIngredients,

                    categoryId: Number(data.categoryId),
                    variants: [{
                        price: Number(data.price),
                        size: Number(data.size) || null,
                        pizzaType: data.pizzaType || null,

                    }],
                    imgUrl,
                }, "update", mode.id)
                toast.success("Product updated")
            }
            else if (mode.mode === "delete" && mode.id) {
                const countent = await productAdmin({
                    name: data.name,
                    ingredients: selectedIngredients,

                    categoryId: Number(data.categoryId),
                    variants: [{
                        price: Number(data.price),
                        size: Number(data.size) || null,
                        pizzaType: data.pizzaType || null,

                    }],
                    imgUrl,
                }, "delete", mode.id)
                if (countent) {
                    toast.error("sra tak product ka")
                    return
                }
                else {
                    toast.success("Product deleted")
                }
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {
            form.reset()
            setMode({ mode: "create" })
            setData(await getProductsFetch())
        }
    }
    return (
        <>

            <div>


                <FormProvider {...form}>
                    <form className="grid justify-normal justify-items-start gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                        <FormInput name="name" label="Product Name" />
                        <FormInput name="price" label="Product Price" type="number" />
                        <FormInput name="categoryId" label="Product Category" type="number" />
                        <FormInput name="size" label="Product Size" type="number" />
                        <FormInput name="pizzaType" label="Product Pizza Type" type="number" />
                        <ul>
                            {ingredients.map((item) => (
                                <li key={item.id}>
                                    <input
                                        {...form.register(`ingredients.${item.id}`)}
                                        type="checkbox"
                                    //disabled={loading || mode === "delete"}
                                    //className={cn(isLoadingOrDeleting && "pointer-events-none")}
                                    />
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                        <ImageViewer form={form} mode={mode} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
                        <div className="flex items-center gap-3">
                            <Button type="submit">{mode.mode === "create" ? "Add Product" : mode.mode === "update" ? "Update Product" : "Delete Product"}</Button>
                            <Button variant="outline" type="button" onClick={() => {
                                setMode({ mode: "create" })
                                form.reset()
                            }}>Cancel</Button>
                        </div>
                    </form>
                </FormProvider>

                <ul>
                    {data.map((el) => (
                        <li key={el.id} className="flex justify-between items-center gap-3 hover:bg-accent p-2">
                            <img src={el.imgUrl} alt={el.name} className="w-[70px] h-[70px] p-2" />
                            <span>{el.name}</span>
                            <span>{el.variants[0].price} rub.</span>
                            <div>
                                <Button onClick={() => {
                                    setMode({ mode: "update", id: el.id, value: el.name })
                                    form.setValue("name", el.name)
                                    form.setValue("price", el.variants[0].price.toString())
                                    form.setValue("categoryId", el.categoryId.toString())
                                    form.setValue("size", el.variants[0].size?.toString() || "")
                                    form.setValue("pizzaType", el.variants[0].pizzaType?.toString() || "")
                                    form.setValue("imgUrl", el.imgUrl)
                                    setPreviewUrl(el.imgUrl)
                                    el.ingredients.forEach((ingredient) => {
                                        form.setValue(`ingredients.${ingredient.id}`, true)
                                    })
                                }}>Edit</Button>
                                <Button variant="destructive" onClick={() => {
                                    setMode({ mode: "delete", id: el.id })
                                    form.setValue("name", el.name)
                                    form.setValue("price", el.variants[0].price.toString())
                                    form.setValue("categoryId", el.categoryId.toString())
                                    form.setValue("size", el.variants[0].size?.toString() || "")
                                    form.setValue("pizzaType", el.variants[0].pizzaType?.toString() || "")
                                    form.setValue("imgUrl", el.imgUrl)
                                    setPreviewUrl(el.imgUrl)
                                    el.ingredients.forEach((ingredient) => {
                                        form.setValue(`ingredients.${ingredient.id}`, true)
                                    })
                                }}>Delete</Button>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        </>
    )
}