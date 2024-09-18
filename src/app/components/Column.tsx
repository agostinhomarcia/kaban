// app/components/Column.tsx
import React from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Task } from "../interfaces/Task";

interface ColumnProps {
  title: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, setTasks }) => {
  const columnTasks = tasks.filter(
    (task) => task.status === title.toLowerCase()
  );

  return (
    <div className="w-1/3 bg-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <TaskForm column={title.toLowerCase()} setTasks={setTasks} />
      {columnTasks.map((task) => (
        <TaskCard key={task.id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default Column;
