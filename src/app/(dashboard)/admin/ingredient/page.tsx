"use client"
import { Button } from "@/components/ui";
import { FormInput } from "@/components/form";
import React from "react";
import { Ingredient } from "@prisma/client";
import { getIngredients } from "@/services/ingredients";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mode } from "@/@types/admin";
import { ingredientAdmin } from "@/app/actions/ingredient-admin";
import toast from "react-hot-toast";

import { ImageViewer } from "@/components";
import { dashboardIngredientSchema } from "@/constants/dashboard-form-schema";
import { uploadImage } from "@/lib/upload-image";

export default function DashboardIngredientPage() {
    const [data, setData] = React.useState<Ingredient[]>([])
    const [mode, setMode] = React.useState<Mode>({ mode: "create" })

    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    React.useEffect(() => {
        (async () => {
            setData(await getIngredients())
        })()
    }, [])
    console.dir(data)

    const form = useForm({
        resolver: zodResolver(dashboardIngredientSchema),
        defaultValues: {
            name: "",
            price: "",
            imgUrl: "",
        },
    })

    const onSubmit = async (data: any) => {
        console.dir(data)
        const imgUrl = await uploadImage(data.imgUrl)
        try {
            if (mode.mode === "create") {
                const create = await ingredientAdmin({ ...data, imgUrl }, "create")
                if (create) {
                    toast.error("sranic ka ur es sarqum")
                    return
                }
                else {
                    toast.success("Ingredient added")
                }
            }
            else if (mode.mode === "update" && mode.id) {
                await ingredientAdmin({ ...data, imgUrl }, "update", mode.id)
                toast.success("Ingredient updated")
            }
            else if (mode.mode === "delete" && mode.id) {
                const countent = await ingredientAdmin({ ...data, imgUrl }, "delete", mode.id)
                if (countent) {
                    toast.error("sra tak product ka")
                    return
                }
                else {
                    toast.success("Ingredient deleted")
                }
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {
            form.reset()
            setMode({ mode: "create" })
            setData(await getIngredients())
        }
    }
    return (
        <>

            <div>


                <FormProvider {...form}>
                    <form className="grid justify-normal justify-items-start gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                        <FormInput name="name" label="Ingredient Name" />
                        <FormInput name="price" label="Ingredient Price" type="number" />
                        <ImageViewer form={form} mode={mode} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
                        <div className="flex items-center gap-3">
                            <Button type="submit">{mode.mode === "create" ? "Add Ingredient" : mode.mode === "update" ? "Update Ingredient" : "Delete Ingredient"}</Button>
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
                            <span>{el.price} rub.</span>
                            <div>
                                <Button onClick={() => {
                                    setMode({ mode: "update", id: el.id, value: el.name })
                                    form.setValue("name", el.name)
                                    form.setValue("price", el.price)
                                    setPreviewUrl(el.imgUrl)
                                }}>Edit</Button>
                                <Button variant="destructive" onClick={() => {
                                    setMode({ mode: "delete", id: el.id })
                                    form.setValue("name", el.name)
                                    form.setValue("price", el.price)
                                    setPreviewUrl(el.imgUrl)
                                }}>Delete</Button>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        </>
    )
}