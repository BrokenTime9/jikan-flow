"use client";

import { useProjectStore } from "@/store/projectStore";
import { Project } from "@/types/projectType";
import { Trash2 } from "lucide-react";

const DeleteButton = ({ project }: { project: Project }) => {
  const { setDeleteForm, setSelectedProject } = useProjectStore();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
    setDeleteForm();
  };
  return (
    <button
      onClick={handleClick}
      className="p-2 bg-gray-700 text-white rounded shadow-md transition hover:bg-white hover:text-black"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteButton;
