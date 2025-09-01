import React from "react";
import { cn } from "@/lib/utils";
import { FormInput } from "../form";
import { Mode } from "@/@types/admin";

interface Props {
  className?: string;
  isLoadingOrDeleting?: boolean;
  mode?: Mode;
  form: any;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  previewUrl: string | null;
}

export const ImageViewer: React.FC<Props> = (props) => {
  const { className, isLoadingOrDeleting, form, setPreviewUrl, previewUrl } =
    props;
  return (
    <div className={cn("", className)}>
      <FormInput name="imgUrl" type="hidden" label="Upload Image" />
      <input
        type="file"
        accept="image/*"
        disabled={isLoadingOrDeleting}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            form.setValue("imgUrl", file); // кладёшь файл в форму
            setPreviewUrl(URL.createObjectURL(file)); // показываешь предпросмотр
          } else {
            setPreviewUrl(null);
          }
        }}
        className={cn(
          "block text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-primary-700 hover:file:bg-primary hover:file:text-white-100",
          isLoadingOrDeleting && "pointer-events-none"
        )}
      />
      {previewUrl && (
        <img
          className="w-40 h-40 object-cover"
          src={previewUrl}
          alt="preview"
        />
      )}
    </div>
  );
};
