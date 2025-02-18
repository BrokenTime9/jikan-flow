"use client";

import { useProjects } from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { X } from "lucide-react"; // Close button icon

const ProjectForm = () => {
  const { createProject, isAdding, updateProject, isUpdating } = useProjects();
  const { error, setError, selectedProject, setProjectForm } =
    useProjectStore();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(selectedProject?.project || "");
  }, [selectedProject]);

  const handleSave = () => {
    setError(null);
    if (name) {
      if (selectedProject?.id) {
        updateProject({ id: selectedProject.id, name });
      } else {
        createProject({ name });
      }
      setProjectForm();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={setProjectForm}
    >
      {/* Form Container */}
      <div
        className="relative bg-gray-900 p-6 rounded-lg shadow-lg w-[400px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={setProjectForm}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          {selectedProject ? "Edit Project" : "Create Project"}
        </h2>

        {/* Form Input */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded text-black"
          placeholder="Project name"
          required
        />

        {error && <p className="text-red-500 text-sm mt-2">*{error}</p>}

        {/* Action Button */}
        <button
          onClick={handleSave}
          disabled={isAdding || isUpdating}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isAdding || isUpdating
            ? "Saving..."
            : selectedProject
              ? "Edit Project"
              : "Add Project"}
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
