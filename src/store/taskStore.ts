import { create } from "zustand";
import { Task } from "@/types/taskType";
import { Project } from "@/types/projectType";

interface TaskState {
  user: string | null; //userID
  project: Project | null; //for all tasks of a project
  task: Task | null; //for selected task - edit,delete
  tasks: Task[]; // all tasks
  taskForm: boolean; // add edit task form visibility
  deleteTaskForm: boolean; // delete task form visibility

  setProject: (project: Project | null) => void; // sets selected project
  fetchUser: () => Promise<void>; // sets userId
  setTask: (task: Task | null) => void; // sets individual selected task
  setTasks: (tasks: Task[]) => void; // sets all tasks
  setTaskForm: () => void; //visibility
  setDeleteTaskForm: () => void; //visibility
  addTask: (task: Omit<Task, "userId">) => void; //add task - ui update
  upTask: (project: Task) => void; //update task - ui update
  delTask: (task: Task) => void; // delete task - ui update
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

    const newTask: Task = { ...task, userId };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
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
