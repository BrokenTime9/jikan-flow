"use client";

import { useProjectStore } from "@/store/projectStore";
import { Pencil } from "lucide-react";

const ProjectFormButton = () => {
  const { setProjectForm } = useProjectStore();

  return (
    <button
      onClick={setProjectForm}
      className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md transition hover:bg-blue-600"
    >
      <Pencil size={20} />
    </button>
  );
};

export default ProjectFormButton;
