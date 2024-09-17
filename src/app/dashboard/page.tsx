"use client";
import React from "react";
import KanbanBoard from "../components/KanbanBoard";

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
};

export default DashboardPage;
