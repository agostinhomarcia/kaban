import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany(); // Buscar todas as tasks
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao buscar tarefas" },
      { status: 500 }
    );
  }
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
