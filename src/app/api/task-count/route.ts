// app/api/task-count/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const todoCount = await prisma.task.count({ where: { status: "todo" } });
    const inProgressCount = await prisma.task.count({
      where: { status: "in progress" },
    });
    const doneCount = await prisma.task.count({ where: { status: "done" } });

    return NextResponse.json({
      todo: todoCount,
      inProgress: inProgressCount,
      done: doneCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao buscar contagens de tarefas" },
      { status: 500 }
    );
  }
}
