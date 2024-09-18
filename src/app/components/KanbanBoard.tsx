"use client";
import React, { useState, useEffect } from "react";
import Column from "./Column";
import { Task } from "../interfaces/Task";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="flex gap-4 justify-center">
      {columns.map((column) => (
        <Column key={column} title={column} tasks={tasks} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default KanbanBoard;
