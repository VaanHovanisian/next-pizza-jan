"use client"
import { Button } from "@/components/ui";
import { FormInput } from "@/components/form";
import React from "react";
import { Category } from "@prisma/client";
import { getCategories } from "@/services/category";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mode } from "@/@types/admin";
import { categoryAdmin } from "@/app/actions/category-admin";
import toast from "react-hot-toast";

export default function DashboardCategoryPage() {
    const [data, setData] = React.useState<Category[]>([])
    const [mode, setMode] = React.useState<Mode>({ mode: "create" })
    React.useEffect(() => {
        (async () => {
            setData(await getCategories())
        })()
    }, [])
    console.dir(data)

    const form = useForm({
        resolver: zodResolver(z.object({
            category: z.string().min(4),
        })),
        defaultValues: {
            category: "",
        },
    })

    const onSubmit = async (data: any) => {
        try {
            if (mode.mode === "create") {
                const create = await categoryAdmin({ name: data.category }, "create")
                if (create) {
                    toast.error("sranic ka ur es sarqum")
                    return
                }
                else {
                    toast.success("Category added")
                }
            }
            else if (mode.mode === "update" && mode.id) {
                await categoryAdmin({ name: data.category }, "update", mode.id)
                toast.success("Category updated")
            }
            else if (mode.mode === "delete" && mode.id) {
                const countent = await categoryAdmin({ name: data.category }, "delete", mode.id)
                if (countent) {
                    toast.error("sra tak product ka")
                    return
                }
                else {
                    toast.success("Category deleted")
                }
            }


        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
        finally {
            form.reset()
            setMode({ mode: "create" })
            setData(await getCategories())
        }
    }
    return (
        <>

            <div>


                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInput name="category" label="Category" />
                        <Button type="submit">{mode.mode === "create" ? "Add Category" : mode.mode === "update" ? "Update Category" : "Delete Category"}</Button>
                        <Button variant="outline" type="button" onClick={() => {
                            setMode({ mode: "create" })
                            form.reset()
                        }}>Cancel</Button>
                    </form>
                </FormProvider>

                <ul>
                    {data.map((el) => (
                        <li key={el.id} className="flex justify-between items-center gap-3">
                            <span>{el.name}</span>
                            <div>
                                <Button onClick={() => {
                                    setMode({ mode: "update", id: el.id, value: el.name })
                                    form.setValue("category", el.name)
                                }}>Edit</Button>
                                <Button variant="destructive" onClick={() => {
                                    setMode({ mode: "delete", id: el.id })
                                    form.setValue("category", el.name)
                                }}>Delete</Button>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        </>
    )
}