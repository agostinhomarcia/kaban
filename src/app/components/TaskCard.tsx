import React from "react";
import { Task } from "@prisma/client";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="flex justify-between mt-2">
        <button className="text-blue-500">Edit</button>
        <button className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
