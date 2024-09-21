import React from "react";
import { Task } from "../interfaces/Task";

interface TaskCardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setTasks }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`Failed to delete task: ${res.statusText}`);
      }
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMove = async (newStatus: string) => {
    try {
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
      } else {
        throw new Error(`Failed to move task: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error moving task:", error);
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
        {task.status.toLowerCase() === "todo" && (
          <button
            className="text-green-500"
            onClick={() => handleMove("in progress")}
          >
            Mover para &quot;In Progress&quot; →
          </button>
        )}
        {task.status.toLowerCase() === "in progress" && (
          <>
            <button
              className="text-yellow-500"
              onClick={() => handleMove("todo")}
            >
              ← Mover para &quot;To Do&quot;
            </button>
            <button
              className="text-green-500"
              onClick={() => handleMove("done")}
            >
              Mover para &quot;Done&quot; →
            </button>
          </>
        )}
        {task.status.toLowerCase() === "done" && (
          <button
            className="text-yellow-500"
            onClick={() => handleMove("in progress")}
          >
            ← Mover para &quot;In Progress&quot;
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
