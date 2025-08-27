"use client";
import { Mode } from "@/@types/admin";
import { categoryForm } from "@/app/actions/categoryForm";
import { FormInput } from "@/components";
import { Button } from "@/components/ui";
import { getCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export default function DashboardPage() {
  const [data, setData] = React.useState([]);
  const [mode, setMode] = React.useState<Mode>({ mode: "create" });

  React.useEffect(() => {
    (async () => {
      setData(await getCategory());
    })();
  }, []);

  const form = useForm({
    resolver: zodResolver(z.object({ category: z.string().min(3) })),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (mode.mode === "create") {
        await categoryForm(mode.mode, data);
        toast.success("good create");
      } else if (mode.mode === "update" && mode.id) {
        await categoryForm(mode.mode, data, mode.id);
        toast.success("good update");
      } else if (mode.mode === "delete") {
        await categoryForm(mode.mode, data, mode.id);
        toast.success("good delete");
      }
    } catch (error) {
      console.log(error);
      toast.error("ploxo vso ne poluchilos");
    } finally {
      setData(await getCategory());
      setMode({ mode: "create" });
      form.reset();
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          className="mb-5 gap-3 flex flex-col items-start"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="category" label="Name" />
          <Button
            variant={mode.mode === "delete" ? "destructive" : "default"}
            type="submit"
          >
            {mode.mode}
          </Button>
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
        {data.map((item: any) => (
          <li
            className="flex mb-3 justify-between hover:bg-primary/10"
            key={item.id}
          >
            {item.name}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  form.setValue("category", item.name);
                  setMode({ mode: "update", id: item.id });
                }}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  form.setValue("category", item.name);
                  setMode({ mode: "delete", id: item.id });
                }}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
