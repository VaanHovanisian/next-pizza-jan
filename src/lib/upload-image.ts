import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
export const uploadImage = async (file: File) => {
    try {
        let imgUrl: string | File = file;
        if (file instanceof File) {
            const formData = new FormData();
            formData.append("file", imgUrl);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })
            const url = await res.json()
            imgUrl = url.url
        }
        return imgUrl as string

    } catch (error) {
        console.log("UPLOAD_POST Server-Error", error)
        return NextResponse.json({ message: "upload image post error" }, { status: 500 })
    }
}