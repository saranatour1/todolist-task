import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
const prisma = new PrismaClient();
// create a todo list
export const POST = async (request: NextRequest, response: NextResponse) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("unauthorized", { status: 401 });
  }

  const { name, description, status } = await request.json();

  const schema = vine.object({
    name: vine.string().maxLength(32),
    description: vine.string().maxLength(1000).optional(),
    status: vine.boolean().optional(),
  });

  const data = { name, description, status };
  try {
    const validator = vine.compile(schema);
    await validator.validate(data);
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error.messages);
      return NextResponse.json(error.messages, { status: 400 });
    }
  }

  const userId = session.user?.id;

  const todo = await prisma.todo.create({
    data: {
      name,
      description,
      status,
      userId,
    },
  });

  return NextResponse.json({ todo }, { status: 200 });
};
