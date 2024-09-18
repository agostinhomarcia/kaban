import React, { useState } from "react";
import { Task } from "../interfaces/Task";

interface TaskFormProps {
  column: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ column, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description, status: column }),
      headers: { "Content-Type": "application/json" },
    });
    const newTask = await res.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-2">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
