"use client";

import { useTaskStore } from "@/store/taskStore";
import { Trash2 } from "lucide-react";

const TaskDeleteButton = () => {
  const { setDeleteTaskForm } = useTaskStore();
  const handleDelete = () => {
    setDeleteTaskForm();
  };
  return (
    <button
      className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
      onClick={handleDelete}
    >
      <Trash2 size={18} />
    </button>
  );
};

export default TaskDeleteButton;
