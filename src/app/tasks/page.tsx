// app/tasks/page.tsx
import { Task } from "@prisma/client";
import Link from "next/link";

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

const TaskListPage = async () => {
  const tasks = await fetchTasks();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Lista de Tarefas</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">Status: {task.status}</p>
          </li>
        ))}
      </ul>

      <Link
        href="/dashboard"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Voltar ao Kanban Board
      </Link>
    </div>
  );
};

export default TaskListPage;
