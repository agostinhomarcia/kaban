// app/components/TaskCard.tsx
import React from "react";
import { Task } from "../interfaces/Task";

interface TaskCardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setTasks }) => {
  const handleDelete = async () => {
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  const handleMove = async (newStatus: string) => {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updatedTask = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">
        Created at: {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        Updated at: {new Date(task.updatedAt).toLocaleDateString()}
      </p>

      <div className="flex justify-between mt-2">
        {/* Botão para mover a tarefa para trás */}
        {task.status === "in progress" && (
          <button
            className="text-yellow-500"
            onClick={() => handleMove("todo")}
          >
            ← Mover para &quot;To Do&quot;
          </button>
        )}
        {task.status === "done" && (
          <button
            className="text-yellow-500"
            onClick={() => handleMove("in progress")}
          >
            ← Mover para &quot;In Progress&quot;
          </button>
        )}

        {/* Botão para mover a tarefa para frente */}
        {task.status === "todo" && (
          <button
            className="text-green-500"
            onClick={() => handleMove("in progress")}
          >
            Mover para &quot;In Progress&quot; →
          </button>
        )}
        {task.status === "in progress" && (
          <button className="text-green-500" onClick={() => handleMove("done")}>
            Mover para &quot;Done&quot; →
          </button>
        )}
      </div>

      <div className="flex justify-between mt-2">
        <button className="text-blue-500">Edit</button>
        <button className="text-red-500" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
