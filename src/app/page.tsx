"use client";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Kanban To-Do App</h1>
      <p className="text-lg mb-6">
        Gerencie suas tarefas de maneira organizada e eficiente.
      </p>

      <Link
        href="/dashboard"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Ir para o Kanban Board
      </Link>

      {/* Estatísticas rápidas sobre as tarefas */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Resumo de Tarefas:</h2>
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">To Do</h3>
            <p>5 Tarefas</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">In Progress</h3>
            <p>3 Tarefas</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Done</h3>
            <p>8 Tarefas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
