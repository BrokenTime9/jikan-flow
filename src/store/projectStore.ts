import { create } from "zustand";
import { Project } from "@/types/projectType";

interface ProjectState {
  projects: Project[];
  error: string | null;
  selectedProject: Project | null;
  projectForm: boolean;
  deleteForm: boolean;

  setProjects: (projects: Project[]) => void;
  setError: (error: string | null) => void;
  setSelectedProject: (project: Project | null) => void;
  setProjectForm: () => void;
  setDeleteForm: () => void;
  addProject: (project: Project) => void;
  upProject: (project: Project) => void;
  delProject: (project: Project) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  error: null,
  selectedProject: null,
  projectForm: false,
  deleteForm: false,

  setProjects: (projects) => set({ projects }),
  setError: (error) => set({ error }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setProjectForm: () => set((state) => ({ projectForm: !state.projectForm })),
  setDeleteForm: () => set((state) => ({ deleteForm: !state.deleteForm })),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  upProject: (updatedProject) =>
    set((state) => {
      const updatedProjects = state.projects.map((p) => p);

      return {
        projects: [...updatedProjects],
        selectedProject:
          state.selectedProject?.id === updatedProject.id
            ? updatedProject
            : state.selectedProject,
      };
    }),
  delProject: (project) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== project.id),
      selectedProject:
        state.selectedProject?.id === project.id ? null : state.selectedProject,
    })),
}));
