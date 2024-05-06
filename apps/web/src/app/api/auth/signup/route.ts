import { NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { email, password, username } = await request.json();
    const schema = vine.object({
      username: vine.string(),
      email: vine.string().email(),
      password: vine.string().minLength(8).maxLength(32),
      image: vine.any().optional(),
    });

    const data = {
      email,
      password,
      username,
    };

    try {
      const validator = vine.compile(schema);
      await validator.validate(data);
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);
        return NextResponse.json(error.messages, { status: 400 });
      }
    }

    const hashedPassword = await hash(password, 12);
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        username: username,
      },
    });
    return NextResponse.json("user created successfully", { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json("Failed to register user", { status: 500 });
  }
};
