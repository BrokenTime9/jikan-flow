"use client";

import DeleteButton from "./DeleteButton";
import { Project } from "@/types/projectType";
import ProjectFormButton from "./ProjectFormButton";
import { useTaskStore } from "@/store/taskStore";

const ProjectItem = ({ p }: { p: Project }) => {
  const { setProject, project } = useTaskStore();
  const handleProjectClick = () => {
    setProject(p);
  };

  return (
    <div
      key={p.id}
      onClick={handleProjectClick}
      className={`p-4 bg-gray-800 text-white flex justify-between items-center rounded-md shadow-md cursor-pointer transition border ${project?.id === p.id ? "border-b-4 border-b-white" : "border"} border-gray-600 focus:outline-none hover:bg-gray-700`}
    >
      <h1 className=" text-md overflow-x-hidden">{p.project}</h1>
      <div className="flex gap-2">
        <ProjectFormButton project={p} />
        <DeleteButton project={p} />
      </div>
    </div>
  );
};

export default ProjectItem;
