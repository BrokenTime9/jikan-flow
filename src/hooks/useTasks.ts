import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NewMutationTask, Task } from "@/types/taskType";
import { useTaskStore } from "@/store/taskStore";
import { useEffect } from "react";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const {
    task,
    setTasks,
    addTask,
    upTask,
    project,
    delTask,
    setDeleteTaskForm,
    setTaskForm,
  } = useTaskStore();

  // Fetch tasks
  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks", project?.id],
    queryFn: async (): Promise<Task[]> => {
      const response = await axios.get("/api/projects/tasks", {
        params: { projectId: project?.id },
        withCredentials: true,
      });
      return response.data.tasks.task;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  // Create a new task
  const { mutate: createTask, isPending: isAdding } = useMutation({
    mutationFn: async ({
      title,
      desc,
      type,
      dueDate,
      priority,
      projectId,
    }: NewMutationTask): Promise<Task> => {
      const response = await axios.post("/api/projects/tasks", {
        title,
        desc,
        type,
        dueDate,
        priority,
        projectId,
      });
      return response.data;
    },
    onSuccess: (newTask) => {
      addTask(newTask);
      setTaskForm();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Update an existing task
  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      title,
      desc,
      dueDate,
      progress,
    }: Partial<Task>) => {
      const response = await axios.put(
        `/api/projects/tasks`,
        { id, title, desc, dueDate, progress },
        { withCredentials: true },
      );
      return response.data.task.task;
    },
    onSuccess: async (updatedTask) => {
      await upTask(updatedTask);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const response = await axios.delete("/api/projects/tasks", {
        data: { id },
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },
    onSuccess: async () => {
      if (task) {
        await delTask(task);
      }

      console.log("deleted");
      setDeleteTaskForm();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
    isAdding,
    isLoading,
    isUpdating,
    isDeleting,
  };
};
