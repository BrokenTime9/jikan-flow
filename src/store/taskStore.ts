import { create } from "zustand";
import { Task } from "@/types/taskType";
import { Project } from "@/types/projectType";

interface TaskState {
  project: Project | null;
  tasks: Task[];
  selectedTask: Task | null;
  taskForm: boolean;
  deleteTaskForm: boolean;

  setProject: (project: Project | null) => void;
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (selectedTask: Task) => void;
  setTaskForm: () => void;
  setDeleteTaskForm: () => void;
  addTask: (task: Task) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  project: null,
  tasks: [],
  selectedTask: null,
  taskForm: false,
  deleteTaskForm: false,

  setProject: (project) => set({ project }),
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (selectedTask) => set({ selectedTask }),
  setTaskForm: () => set((state) => ({ taskForm: !state.taskForm })),
  setDeleteTaskForm: () =>
    set((state) => ({ deleteTaskForm: !state.taskForm })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
}));
