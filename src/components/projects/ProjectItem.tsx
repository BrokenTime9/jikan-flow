"use client";

import DeleteButton from "./DeleteButton";
import { Project } from "@/types/projectType";
import { useProjectStore } from "@/store/projectStore";
import ProjectFormButton from "./ProjectFormButton";

const ProjectItem = ({ project }: { project: Project }) => {
  const { setSelectedProject } = useProjectStore();

  return (
    <div
      key={project.id}
      onClick={() => setSelectedProject(project)}
      className="p-4 mr-2 bg-gray-800 text-white flex justify-between items-center rounded-md shadow-md cursor-pointer transition border border-gray-600 focus:outline-none hover:bg-gray-700"
    >
      <h1 className="font-semibold text-lg">{project.project}</h1>
      <div className="flex gap-2">
        <ProjectFormButton />
        <DeleteButton id={project.id} />
      </div>
    </div>
  );
};

export default ProjectItem;
