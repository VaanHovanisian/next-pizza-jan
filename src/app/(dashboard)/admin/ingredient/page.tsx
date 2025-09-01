"use client";
import { Mode } from "@/@types/admin";
import { ingredientAdmin } from "@/app/actions/ingredient-admin";
import { FormInput, ImageViewer } from "@/components";
import { Button } from "@/components/ui";
import { dashboardIngredientSchema } from "@/constants/dashboard-form-schema";
import { uploadImage } from "@/lib/upload-image";
import { getIngredients } from "@/services/ingredients";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ingredient } from "@prisma/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function DashboardIngredientPage() {
  const [data, setData] = React.useState<Ingredient[]>([]);
  const [mode, setMode] = React.useState<Mode>({ mode: "create" });
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => setData(await getIngredients()))(); // inqnakachvox funkcia
  }, []);

  const form = useForm({
    resolver: zodResolver(dashboardIngredientSchema),
    defaultValues: {
      name: "",
      imgUrl: "",
      price: "",
    },
  });

  const onSubmit = async (data: any) => {
    const imgUrl = await uploadImage(data.imgUrl);

    try {
      if (mode.mode === "create") {
        const update = await ingredientAdmin(
          {
            ...data,
            imgUrl,
          },
          "create"
        );
        if (update) {
          toast.error("sranic ka ures sarqum");
        } else {
          toast.success("create success");
        }
      }
      if (mode.mode === "update" && mode.id) {
        await ingredientAdmin(
          {
            ...data,
            imgUrl,
          },
          "update",
          mode.id
        );
        toast.success("update success");
      }
      if (mode.mode === "delete" && mode.id) {
        const countent = await ingredientAdmin(
          {
            ...data,
            imgUrl,
          },
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
      setData(await getIngredients());
      setPreviewUrl("");
    }
  };

  return (
    <>
      <div>
        <FormProvider {...form}>
          <form
            className="grid gap-5 justify-normal justify-items-start"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput name="name" label="Name" />
            <FormInput name="price" label="Price" type="number" />
            <ImageViewer
              form={form}
              mode={mode}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
            <div className="flex items-center gap-3">
              <Button>{mode.mode}</Button>
              <Button
                type="button"
                onClick={() => {
                  setMode({ mode: "create" });
                  setPreviewUrl("");
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
        <ul>
          {data.map((el) => (
            <li
              key={el.id}
              className="flex justify-between items-center hover:bg-accent"
            >
              <img
                className="p-2"
                width={70}
                height={70}
                src={el.imgUrl}
                alt=""
              />
              <span>{el.name}</span>
              <span>{el.price} rub</span>
              <div>
                <Button
                  onClick={() => {
                    setMode({ mode: "update", id: el.id });
                    form.setValue("name", el.name);
                    form.setValue("price", el.price);
                    setPreviewUrl(el.imgUrl);
                  }}
                >
                  edit
                </Button>
                <Button
                  onClick={() => {
                    setMode({ mode: "delete", id: el.id });
                    form.setValue("name", el.name);
                    form.setValue("price", el.price);
                    setPreviewUrl(el.imgUrl);
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
