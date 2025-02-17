"use client";

import { useProjects } from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";

const ProjectForm = () => {
  const { createProject, isAdding, updateProject, isUpdating } = useProjects();
  const { error, setError, setProjectForm, selectedProject } =
    useProjectStore();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(selectedProject?.project || "");
  }, [selectedProject]);

  const addProject = () => {
    setError(null);
    if (name) {
      createProject({ name: name });
    }
  };
  const update = () => {
    if (name && selectedProject?.id) {
      setError(null);
      updateProject({ id: selectedProject?.id, name: name });
    }
  };

  if (selectedProject) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={setProjectForm}
      >
        <div
          className="bg-white p-4 rounded-lg shadow-lg w-64 flex flex-col items-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          {!isUpdating ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 p-2 rounded w-full mb-2 text-black"
                placeholder="Project name"
              />
              {error ? <p className="text-red-500">*{error}</p> : ""}
              <button
                onClick={update}
                disabled={isUpdating}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isUpdating ? "Editing..." : "Edit Project"}
              </button>
            </>
          ) : (
            <p className="text-black">Editing task...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={setProjectForm}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-64 flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {!isAdding ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 p-2 rounded w-full mb-2 text-black"
              placeholder="Project name"
            />

            {error ? <p className="text-red-500">*{error}</p> : ""}
            <button
              onClick={addProject}
              disabled={isAdding}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add Project"}
            </button>
          </>
        ) : (
          <p className="text-black">Adding task...</p>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
