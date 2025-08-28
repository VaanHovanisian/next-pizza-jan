"use client";
import { Mode } from "@/@types/admin";
import { categoryAdmin } from "@/app/actions/category-admin";
import { FormInput } from "@/components";
import { Button } from "@/components/ui";
import { getCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function DashboardPage() {
  const [data, setData] = React.useState([]);
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
        }
        toast.success("create success");
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
          toast.error("sra tak product ka");
        }
        toast.success("delete success");
      }
    } catch (error) {
      console.log(error);
      toast.error("bad");
    } finally {
      form.reset();
      setMode({ mode: "create" });
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

// "use client";
// import { Mode } from "@/@types/admin";
// import { categoryForm } from "@/app/actions/categoryForm";
// import { FormInput } from "@/components";
// import { Button } from "@/components/ui";
// import { getCategory } from "@/services/category";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import z from "zod";

// export default function DashboardPage() {
//   const [data, setData] = React.useState([]);
//   const [mode, setMode] = React.useState<Mode>({ mode: "create" });

//   React.useEffect(() => {
//     (async () => {
//       setData(await getCategory());
//     })();
//   }, []);

//   const form = useForm({
//     resolver: zodResolver(z.object({ category: z.string().min(3) })),
//     defaultValues: {
//       category: "",
//     },
//   });

//   const onSubmit = async (data: any) => {
//     try {
//       if (mode.mode === "create") {
//         await categoryForm(mode.mode, data);
//         toast.success("good create");
//       } else if (mode.mode === "update" && mode.id) {
//         await categoryForm(mode.mode, data, mode.id);
//         toast.success("good update");
//       } else if (mode.mode === "delete") {
//         await categoryForm(mode.mode, data, mode.id);
//         toast.success("good delete");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("ploxo vso ne poluchilos");
//     } finally {
//       setData(await getCategory());
//       setMode({ mode: "create" });
//       form.reset();
//     }
//   };

//   return (
//     <div>
//       <FormProvider {...form}>
//         <form
//           className="mb-5 gap-3 flex flex-col items-start"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           <FormInput name="category" label="Name" />
//           <Button
//             variant={mode.mode === "delete" ? "destructive" : "default"}
//             type="submit"
//           >
//             {mode.mode}
//           </Button>
//           <Button
//             type="button"
//             onClick={() => {
//               setMode({ mode: "create" });
//               form.reset();
//             }}
//           >
//             Cancel
//           </Button>
//         </form>
//       </FormProvider>
//       <ul>
//         {data.map((item: any) => (
//           <li
//             className="flex mb-3 justify-between hover:bg-primary/10"
//             key={item.id}
//           >
//             {item.name}
//             <div className="flex gap-2">
//               <Button
//                 onClick={() => {
//                   form.setValue("category", item.name);
//                   setMode({ mode: "update", id: item.id });
//                 }}
//               >
//                 Update
//               </Button>
//               <Button
//                 onClick={() => {
//                   form.setValue("category", item.name);
//                   setMode({ mode: "delete", id: item.id });
//                 }}
//                 variant="destructive"
//               >
//                 Delete
//               </Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
