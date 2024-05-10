import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import prisma from "@/prisma/db";
import nodemailer from "nodemailer";

// send the email to the backend, and check if the user exists, yes -> send email, no -> throw error and route them to signup 
export const POST = async (request: NextRequest) => {
  try {
    const server = process.env.MAILPIT_EMAIL_SERVER;
    const fromEmail = process.env.EMAIL_FROM;
    const { email } = await request.json();
    const schema = vine.object({
      email: vine.string().email(),
    });
    const data = { email }

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
      }
    })

    if (!user) {
      return NextResponse.json("user does not found", { status: 404 })
    }

    const randomPin = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 2); 

    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        passwordRecovery: {
          set:randomPin.toString(),
        },
        createdAt: new Date(), 
        confirmed:false,  
      },
    });

    let transporter = nodemailer.createTransport(server)

   const info  = await transporter.sendMail({
    from: 'reach@saranatour.dev',
    to: email,
    subject:"forgot password pin",
    text:`${randomPin}`,
    html: `
      <p>the pin that you asked for</p>
      <p>${randomPin}</p>
      <p>do not share this with anyone</p>
    `
   })

   console.log("Message sent: %s", info.messageId);

    return NextResponse.json(`pin successfully sent,${info.messageId}, ${info.response}`, { status:200 })
  } catch (e) {
    console.log(e)
  }
}

