"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectItem from "./ProjectItem";
import DeleteForm from "@/components/projects/DeleteForm";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project } from "@/types/projectType";
import { useProjectStore } from "@/store/projectStore";
import { Plus } from "lucide-react";

const ProjectList = () => {
  const { isLoading } = useProjects();
  const { projects, setProjectForm, setSelectedProject } = useProjectStore();

  const { projectForm, deleteForm } = useProjectStore();

  const handleAddProject = () => {
    setSelectedProject(null);
    setProjectForm();
  };

  return (
    <div className="bg-gray-800 text-white p-3 w-full h-[100dvh] flex flex-col">
      <div className="flex p-1 items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Your Projects</h1>
        <button
          onClick={handleAddProject}
          className="p-1 rounded bg-gray-700 hover:bg-white hover:text-black transition"
        >
          <Plus size={18} />
        </button>
      </div>
      {projectForm && <ProjectForm />}
      {deleteForm && <DeleteForm />}

      <div className="flex flex-col gap-2 overflow-y-auto flex-grow custom-scrollbar">
        {Array.isArray(projects) ? (
          projects.length > 0 ? (
            projects.map((e: Project, i: number) => (
              <ProjectItem key={i} p={e} />
            ))
          ) : (
            <p className="text-center text-gray-500">No projects yet.</p>
          )
        ) : isLoading ? (
          <p className="text-center text-gray-500">Loading Projects...</p>
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
