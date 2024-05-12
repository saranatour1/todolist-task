import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import prisma from "database/db";
import { hash } from "bcrypt";
export const POST = async (request: NextRequest) => {
  try{
    const {email, password} = await request.json();

    const schema = vine.object({
      email:vine.string().email(),
      password:vine.string().minLength(8).maxLength(32),
    });

    const data = { email,password }

    try {
      const validator = vine.compile(schema);
      await validator.validate(data);
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);
        return NextResponse.json(error.messages, { status: 400 });
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select:{
        passwordRecovery:true,
        createdAt:true,
        confirmed:true,
      }
    })

    if (!user) {
      return NextResponse.json("user does not found", { status: 404 })
    }

    if(!user.confirmed && user.passwordRecovery != null){
      return NextResponse.json("please confirm pin code first ", { status: 400 })
    }

    const hashedPassword = await hash(password, 12);

    
    await prisma.user.update({
      where:{
        email:email
      },
      data:{
        password:hashedPassword,
      }
    })
    
    return NextResponse.json("Password updated successfully", { status: 200 });
  }catch(e){
    console.log(e)
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}