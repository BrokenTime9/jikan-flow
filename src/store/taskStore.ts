import { create } from "zustand";
import { Task } from "@/types/taskType";
import { Project } from "@/types/projectType";

interface TaskState {
  project: Project | null;
  task: Task | null;
  tasks: Task[];
  userTasks: Task[];
  taskForm: boolean;
  deleteTaskForm: boolean;

  setProject: (project: Project | null) => void;
  setTask: (task: Task | null) => void;
  setTasks: (tasks: Task[]) => void;
  setUserTasks: (tasks: Task[]) => void;
  setTaskForm: () => void;
  setDeleteTaskForm: () => void;
  addTask: (task: Task) => void;
  upTask: (project: Task) => void;
  delTask: (task: Task) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  project: null,
  task: null,
  tasks: [],
  userTasks: [],
  taskForm: false,
  deleteTaskForm: false,

  setProject: (project) => set({ project }),
  setTask: (task) => set({ task }),
  setTasks: (tasks) => set({ tasks }),
  setUserTasks: (tasks) => set({ userTasks: tasks }),
  setTaskForm: () => set((state) => ({ taskForm: !state.taskForm })),
  setDeleteTaskForm: () =>
    set((state) => ({ deleteTaskForm: !state.deleteTaskForm })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  upTask: (updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((p) => p);

      return {
        tasks: [...updatedTasks],
        task: state.task?.id === updatedTask.id ? updatedTask : state.task,
      };
    }),
  delTask: (task) =>
    set((state) => ({
      tasks: state.tasks.filter((p) => p.id !== task.id),
      selectedTask: state.task?.id === task.id ? null : state.task,
    })),
}));
