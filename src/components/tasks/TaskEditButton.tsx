"use client";

import { useTaskStore } from "@/store/taskStore";
import { Pencil } from "lucide-react";

const TaskEditButton = () => {
  const { setTaskForm } = useTaskStore();
  const handleEdit = () => {
    setTaskForm();
  };
  return (
    <button
      className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
      onClick={handleEdit}
    >
      <Pencil size={18} />
    </button>
  );
};

export default TaskEditButton;
