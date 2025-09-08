import { isAdmin } from "@/lib/is-admin";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob"
export async function POST(req: NextRequest) {
    try {
        if (!await isAdmin()) {
            return NextResponse.json({ message: "You are not admin" }, { status: 401 })
        }
        const formData = await req.formData()
        const file = formData.get("file") as File;
        const blob = await put(file.name, file, {
            access: "public",
            addRandomSuffix: true,
            token: process.env.BLOB_READ_WRITE_TOKEN,


        })
        return NextResponse.json({ url: blob.url })

    }
    catch (error) {
        console.log("UPLOAD_POST Server-Error", error)
        return NextResponse.json({ message: "upload image post error" }, { status: 500 })
    }

}
