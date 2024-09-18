"use client";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          Kanban Tasks
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            Kanban Board
          </Link>
          <Link href="/tasks" className="text-gray-300 hover:text-white">
            Lista de Tarefas
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link
            href="/dashboard"
            className="block text-gray-300 hover:text-white"
          >
            Kanban Board
          </Link>
          <Link href="/tasks" className="block text-gray-300 hover:text-white">
            Lista de Tarefas
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
