import { create } from "zustand";
import { Task } from "@/types/taskType";
import { Project } from "@/types/projectType";

interface TaskState {
  user: string | null; // User ID
  project: Project | null; // Selected project
  task: Partial<Task> | null; // Selected task (edit, delete)
  tasks: Partial<Task>[]; // List of all tasks
  taskForm: boolean; // Visibility of add/edit task form
  deleteTaskForm: boolean; // Visibility of delete task form

  setProject: (project: Project | null) => void; // Set selected project
  fetchUser: () => Promise<void>; // Fetch user ID
  setTask: (task: Partial<Task> | null) => void; // Set selected task
  setTasks: (tasks: Partial<Task>[]) => void; // Set all tasks
  setTaskForm: () => void; // Toggle task form visibility
  setDeleteTaskForm: () => void; // Toggle delete form visibility
  addTask: (task: Partial<Task>) => void; // Add a task (UI update)
  upTask: (updatedTask: Partial<Task>) => void; // Update a task (UI update)
  delTask: (task: Partial<Task>) => void; // Delete a task (UI update)
}

export const useTaskStore = create<TaskState>((set, get) => ({
  user: null,
  project: null,
  task: null,
  tasks: [],
  taskForm: false,
  deleteTaskForm: false,

  fetchUser: async () => {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (res.ok) {
      const { user } = await res.json();
      set({ user });
    }
  },

  setProject: (project) => set({ project }),
  setTask: (task) => set({ task }),
  setTasks: (tasks) => set({ tasks }),
  setTaskForm: () => set((state) => ({ taskForm: !state.taskForm })),
  setDeleteTaskForm: () =>
    set((state) => ({ deleteTaskForm: !state.deleteTaskForm })),

  addTask: (task) => {
    const user = get().user;
    const userId = Number(user);
    if (!userId) return;

    const newTask: Partial<Task> = { ...task, userId };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  upTask: (updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
      );

      return {
        tasks: updatedTasks,
        task: state.task?.id === updatedTask.id ? updatedTask : state.task,
      };
    }),

  delTask: (task) =>
    set((state) => ({
      tasks: state.tasks.filter((p) => p.id !== task.id),
      task: state.task?.id === task.id ? null : state.task,
    })),
}));
