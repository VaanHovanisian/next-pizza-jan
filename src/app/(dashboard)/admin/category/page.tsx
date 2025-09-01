"use client";
import { Mode } from "@/@types/admin";
import { categoryAdmin } from "@/app/actions/category-admin";
import { FormInput } from "@/components";
import { Button } from "@/components/ui";
import { getCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function DashboardCategoryPage() {
  const [data, setData] = React.useState<Category[]>([]);
  const [mode, setMode] = React.useState<Mode>({ mode: "create" });
  React.useEffect(() => {
    (async () => setData(await getCategory()))(); // inqnakachvox funkcia
  }, []);

  const form = useForm({
    resolver: zodResolver(z.object({ category: z.string().min(4) })),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (mode.mode === "create") {
        const update = await categoryAdmin({ name: data.category }, "create");
        if (update) {
          toast.error("sranic ka ures sarqum");
        } else {
          toast.success("create success");
        }
      }
      if (mode.mode === "update" && mode.id) {
        await categoryAdmin({ name: data.category }, "update", mode.id);
        toast.success("update success");
      }
      if (mode.mode === "delete" && mode.id) {
        const countent = await categoryAdmin(
          { name: data.category },
          "delete",
          mode.id
        );
        if (countent) {
          toast.error("sra tak product ka ara");
        } else {
          toast.success("delete success");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("bad");
    } finally {
      form.reset();
      setMode({ mode: "create" });
      setData(await getCategory());
    }
  };

  return (
    <>
      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="category" label="Category" />
            <Button>{mode.mode}</Button>
            <Button
              type="button"
              onClick={() => {
                setMode({ mode: "create" });
                form.reset();
              }}
            >
              Cancel
            </Button>
          </form>
        </FormProvider>
        <ul>
          {data.map((el) => (
            <li key={el.id} className="flex justify-between items-center">
              <span>{el.name}</span>
              <div>
                <Button
                  onClick={() => {
                    setMode({ mode: "update", id: el.id });
                    form.setValue("category", el.name);
                  }}
                >
                  edit
                </Button>
                <Button
                  onClick={() => {
                    setMode({ mode: "delete", id: el.id });
                    form.setValue("category", el.name);
                  }}
                  variant={"destructive"}
                >
                  delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
