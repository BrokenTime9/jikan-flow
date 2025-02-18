import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NewMutationTask, Task } from "@/types/taskType";
import { useTaskStore } from "@/store/taskStore";
import { useEffect } from "react";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const { setTasks, addTask, project } = useTaskStore();
  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks", project?.id],
    queryFn: async (): Promise<Task[]> => {
      const response = await axios.get("/api/projects/tasks", {
        params: { projectId: project?.id },
        withCredentials: true,
      });
      return response.data.tasks.task;
    },
    enabled: !!project?.id,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  const { mutate: createTask, isPending: isAdding } = useMutation({
    mutationFn: async (taskData: NewMutationTask): Promise<Task> => {
      const response = await axios.post("/api/projects/tasks", taskData);
      return response.data;
    },
    onSuccess: (data) => {
      addTask(data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { createTask, isAdding, isLoading };
};
