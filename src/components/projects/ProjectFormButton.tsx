"use client";

import { useProjectStore } from "@/store/projectStore";
import { Project } from "@/types/projectType";
import { Pencil } from "lucide-react";

const ProjectFormButton = ({ project }: { project: Project }) => {
  const { setProjectForm, setSelectedProject } = useProjectStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
    setProjectForm();
  };
  return (
    <button
      onClick={handleClick}
      className=" p-2 bg-gray-700 text-white rounded shadow-md transition hover:bg-white hover:text-black "
    >
      <Pencil size={16} />
    </button>
  );
};

export default ProjectFormButton;
