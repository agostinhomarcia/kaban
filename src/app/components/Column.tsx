import React from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Task } from "../interfaces/Task";

interface ColumnProps {
  title: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const getTasksByColumn = (tasks: Task[], column: string) => {
  return tasks.filter((task) => task.status === column.toLowerCase());
};

const Column: React.FC<ColumnProps> = ({ title, tasks, setTasks }) => {
  const columnTasks = getTasksByColumn(tasks, title);

  return (
    <div className="w-1/3 bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <TaskForm column={title.toLowerCase()} setTasks={setTasks} />
      {columnTasks.map((task) => (
        <TaskCard key={task.id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default Column;
