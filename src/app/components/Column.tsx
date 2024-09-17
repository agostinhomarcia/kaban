import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "@prisma/client";
import TaskForm from "./TaskForm";

interface ColumnProps {
  title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks by column status
    const fetchTasks = async () => {
      const res = await fetch(`/api/tasks?status=${title.toLowerCase()}`);
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, [title]);

  return (
    <div className="w-1/3 bg-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <TaskForm column={title.toLowerCase()} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
