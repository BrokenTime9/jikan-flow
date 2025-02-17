"use client";

import { useProjectStore } from "@/store/projectStore";
import { Trash } from "lucide-react";

const DeleteButton = () => {
  const { setDeleteForm } = useProjectStore();

  return (
    <button
      onClick={setDeleteForm}
      className="px-3 py-1 bg-gray-700 text-white rounded-lg shadow-md transition hover:bg-red-600"
    >
      <Trash size={20} />
    </button>
  );
};

export default DeleteButton;
