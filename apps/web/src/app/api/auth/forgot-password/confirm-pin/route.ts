import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import prisma from "@/prisma/db";

// send the email to the backend, and check if the user exists, yes -> send email, no -> throw error and route them to signup 
export const POST = async (request: NextRequest) => {
  try {
    const { passwordRecovery, email } = await request.json();
    const schema = vine.object({
      passwordRecovery: vine.string().fixedLength(6),
      email:vine.string().email(),
    });
    const data = { passwordRecovery, email }

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

    if (user.passwordRecovery !== passwordRecovery) {
      return NextResponse.json("Incorrect PIN", { status: 400 });
    }

    if (!user.createdAt || isExpired(user.createdAt)) {
      return NextResponse.json("PIN has expired", { status: 400 });
    }

    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        confirmed: true,
        passwordRecovery: null,
      }
    });

    return NextResponse.json("PIN confirmed successfully", { status: 200 });
  } catch (e) {
    console.log(e)
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}


function isExpired(createdAt: Date): boolean {
  const expirationDuration = 2 * 60 * 1000; 
  const now = new Date();
  return now.getTime() - createdAt.getTime() > expirationDuration;
}

