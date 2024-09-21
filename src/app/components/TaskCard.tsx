import React, { useState } from "react";
import { Task } from "../interfaces/Task";

interface TaskCardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

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
    console.log(`Movendo a tarefa para: ${newStatus}`);
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

  const handleEdit = async () => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          status: task.status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const updatedTask = await res.json();
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
        setIsEditing(false);
      } else {
        throw new Error(`Failed to edit task: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2">
      {isEditing ? (
        <div>
          <input
            className="w-full border rounded p-2 mb-2"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full border rounded p-2 mb-2"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleEdit}
          >
            Salvar
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded ml-2"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>

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
            <button
              className="text-blue-500"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button className="text-red-500" onClick={handleDelete}>
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
