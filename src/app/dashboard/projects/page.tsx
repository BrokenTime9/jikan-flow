"use client";
import DeleteForm from "@/components/projects/DeleteForm";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectList from "@/components/projects/ProjectList";
import { useProjectStore } from "@/store/projectStore";

const Projects = () => {
  const { projectForm, deleteForm } = useProjectStore();
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col">
      <ProjectList />
      {projectForm && <ProjectForm />}
      {deleteForm && <DeleteForm />}
    </div>
  );
};

export default Projects;
