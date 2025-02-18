"use client";

import AddTaskForm from "@/components/tasks/AddTaskForm";
import TaskDoneItem from "@/components/tasks/TaskDoneItem";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskItem from "@/components/tasks/TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";

const Tasks = () => {
  const { tasks, project, taskForm } = useTaskStore();

  return (
    <>
      {project ? (
        <div className="flex flex-col flex-grow h-[100dvh] bg-gray-900 p-4">
          {/* Add Task Form */}
          {taskForm && <AddTaskForm />}
          {/* Task List */}
          <TaskItem />
          <TaskDoneItem />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Tasks;
