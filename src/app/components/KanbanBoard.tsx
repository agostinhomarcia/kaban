"use client";
import React, { useState, useEffect } from "react";
import Column from "./Column";
import { Task } from "../interfaces/Task";

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao buscar as tasks:", error);
      }
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
