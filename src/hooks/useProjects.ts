import { useProjectStore } from "@/store/projectStore";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Project } from "@/types/projectType";
import { useEffect } from "react";

export const useProjects = () => {
  const {
    selectedProject,
    setProjects,
    addProject,
    upProject,
    delProject,
    setDeleteForm,
    setProjectForm,

    setError,
  } = useProjectStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const response = await axios.get("/api/projects", {
        withCredentials: true,
      });
      return response.data.project;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  useEffect(() => {
    if (data) {
      setProjects(data);
      setError(null);
    }
  }, [data, setProjects, setError]);

  const { mutate: createProject, isPending: isAdding } = useMutation({
    mutationFn: async ({ name }: { name: string }): Promise<Project> => {
      const response = await axios.post(
        "/api/projects",
        { name },
        {
          withCredentials: true,
        },
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    },
    onSuccess: async (data) => {
      await addProject(data.project);

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setProjectForm();
    },
    onError: (error) => {
      setError(String(error));
    },
  });

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const response = await axios.delete("/api/projects", {
        data: { id },
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.project;
    },
    onSuccess: async () => {
      if (selectedProject) {
        await delProject(selectedProject);
      }

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setDeleteForm();
    },
    onError: (error) => {
      setError(String(error));
    },
  });

  const { mutate: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const response = await axios.put(
        "/api/projects",
        { id, name },
        { withCredentials: true },
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.project;
    },
    onSuccess: async (data) => {
      await upProject(data);

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setProjectForm();
    },
    onError: (error) => {
      setError(String(error));
    },
  });
  return {
    createProject,
    deleteProject,
    updateProject,
    isLoading,
    isAdding,
    isDeleting,
    isUpdating,
  };
};
