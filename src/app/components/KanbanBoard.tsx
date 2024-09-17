import React from "react";
import Column from "./Column";

const KanbanBoard = () => {
  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="flex gap-4 justify-center">
      {columns.map((column) => (
        <Column key={column} title={column} />
      ))}
    </div>
  );
};

export default KanbanBoard;
