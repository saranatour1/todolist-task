import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Search todos by name or description
export const GET = async (request: NextRequest, response: NextResponse) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  const searchTerm = request.nextUrl.searchParams.get("q") || "";

  const todos = await prisma.todo.findMany({
    where: {
      userId: userId?.id,
      OR: [
        { name: { contains: searchTerm, mode: "default" } },
        { description: { contains: searchTerm, mode: "default" } },
      ],
    },
  });

  if (todos.length === 0) {
    return NextResponse.json("Not found", { status: 404 });
  }

  return NextResponse.json({ todos }, { status: 200 });
};
