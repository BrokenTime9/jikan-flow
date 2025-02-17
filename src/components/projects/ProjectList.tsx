"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectItem from "./ProjectItem";
import { Project } from "@/types/projectType";
import { useProjectStore } from "@/store/projectStore";
import { Plus } from "lucide-react";

const ProjectList = () => {
  const { isLoading } = useProjects();
  const { projects, setProjectForm, setSelectedProject } = useProjectStore();

  const handleAddProject = () => {
    setSelectedProject(null);
    setProjectForm();
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 max-w-4xl w-full mx-auto mt-8 max-h-[90dvh] flex flex-col">
      <div className="flex justify-between p-4 m-8 font-semibold">
        <div></div>
        <h1 className="text-3xl font-semibold text-center mb-4">
          Your Projects
        </h1>
        <button onClick={handleAddProject}>
          <Plus />
        </button>
      </div>

      {/* Ensure this div has a max height */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[70dvh] custom-scrollbar">
        {Array.isArray(projects) ? (
          projects.map((e: Project, i: number) => (
            <ProjectItem key={i} project={e} />
          ))
        ) : (
          <>
            {isLoading ? (
              <p className="text-center text-gray-500">Loading Projects...</p>
            ) : (
              <p className="text-center text-gray-500">No projects yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
