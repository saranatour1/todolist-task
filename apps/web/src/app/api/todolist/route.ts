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

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  const todo = await prisma.todo.create({
    data: {
      name,
      description,
      status,
      userId: userId?.id,
    },
  });

  return NextResponse.json({ todo }, { status: 200 });
};

// Edit a todo item
export const PUT = async (request: NextRequest, response: NextResponse) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("unauthorized", { status: 401 });
  }

  const { id, name, description, status } = await request.json();

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  const schema = vine.object({
    name: vine.string().maxLength(32).optional(),
    description: vine.string().maxLength(1000).optional(),
    status: vine.boolean().optional(),
  });

  const data = { id, name, description, status };
  try {
    const validator = vine.compile(schema);
    await validator.validate(data);
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(error.messages, { status: 400 });
    }
  }

  // const userId = session.user?.id;

  const todo = await prisma.todo.update({
    where: { id: id, userId: userId?.id },
    data: { name, description, status },
  });

  if (!todo) {
    return NextResponse.json("Todo not found", { status: 404 });
  }

  return NextResponse.json({ todo }, { status: 200 });
};

// Delete a todo item
export const DELETE = async (request: NextRequest, response: NextResponse) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("unauthorized", { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  const todo = await prisma.todo.delete({
    where: { id: Number(id), userId: userId?.id },
  });

  if (!todo) {
    return NextResponse.json("Todo not found", { status: 404 });
  }

  return NextResponse.json(
    { message: "Todo item deleted successfully" },
    { status: 200 },
  );
};

// get todos by filter and page
export const GET = async (request: NextRequest, response: NextResponse) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("unauthorized", { status: 401 });
  }

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;
  const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const todos = await prisma.todo.findMany({
    where: { userId: userId?.id },
    take: limit,
    skip: offset,
  });

  const total = await prisma.todo.count({
    where: { userId: userId?.id },
  });

  if (todos.length === 0) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json({ todos, total }, { status: 200 });
};
