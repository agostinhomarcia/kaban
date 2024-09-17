import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "todo";
  const tasks = await prisma.task.findMany({
    where: { status },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title, description, status } = await request.json();
  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
    },
  });
  return NextResponse.json(task);
}
