import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
// Search todos by name or description
export const GET = async (request: NextRequest, response: NextResponse) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const userId = session.user?.id;
  const searchTerm = request.nextUrl.searchParams.get("q") || "";

  const todos = await prisma.todo.findMany({
    where: {
      userId,
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
  });

  if (todos.length === 0) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json({ todos }, { status: 200 });
};