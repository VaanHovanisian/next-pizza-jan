import { prisma } from "@/prisma/prizma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {


try {

  const code = req.nextUrl.searchParams.get("code")

  if (!code) {
      return NextResponse.json({message: "code not found"},{status:500})
  }
  const verificatCode = await prisma.verificationCode.findFirst({
    where:{
      code,
    }
  })

if (!verificatCode) {
  return NextResponse.json({message: "cod not found"},{status:404})
}

await prisma.user.update({
  where: {
  id:verificatCode.userId
  },
  data:{
  verified:new Date()
  } 
})

await prisma.verificationCode.delete({
  where:{
    id:verificatCode.id
  }
})



  return NextResponse.redirect(new URL("/?verified", req.url))

}

  catch (error) {
  console.log(error);
  return NextResponse.json({message: "server error"},{status:500})
}


  ;
}
