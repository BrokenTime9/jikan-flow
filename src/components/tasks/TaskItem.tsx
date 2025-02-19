"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";
import { Plus, X } from "lucide-react";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskEditButton from "./TaskEditButton";
import { useState } from "react";

const TaskItem = () => {
  const { tasks, project, setProject, setTask, task, setTaskForm } =
    useTaskStore();
  const { isLoading, updateTask } = useTasks();
  const [progressValues, setProgressValues] = useState<{
    [key: string]: number;
  }>({});
  const [editingTask, setEditingTask] = useState<boolean>(false);

  const handleAdd = () => {
    setTask(null);
    setTaskForm();
  };

  const handleClose = () => {
    setProject(null);
  };

  const handleProgressChange = (taskId: number, value: number) => {
    setProgressValues((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const handleSetProgress = (taskId: number) => {
    if (progressValues[taskId] !== undefined) {
      updateTask({
        id: task?.id,
        title: task?.title,
        desc: task?.desc,
        dueDate: task?.dueDate,
        progress: progressValues[taskId],
        priority: task?.priority,
      });
      setEditingTask(false);
    }
  };

  const getPriorityColor = (priority: number | null) => {
    if (priority) {
      switch (priority) {
        case 1:
          return "text-red-500";
        case 2:
          return "text-yellow-500";
        case 3:
          return "text-green-500";
        default:
          return "text-gray-500";
      }
    }
    return "text-gray-500";
  };

  // Ensure `tasks` is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="w-full h-[60dvh] overflow-hidden bg-gray-800 p-4 border border-gray-700">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-gray-700 px-3 py-1 rounded text-white">
          Project: {project?.project}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
          >
            <Plus size={18} />
          </button>
          <button
            className="p-2 rounded bg-gray-700 hover:bg-red-500 hover:text-white transition"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Task List */}
      <div className="h-[50dvh] overflow-auto custom-scrollbar space-y-2 pr-2">
        {isLoading ? (
          <p className="text-center text-white">Loading tasks...</p>
        ) : safeTasks.length > 0 ? (
          safeTasks
            .filter((t) => t.progress !== 100)
            .map((t) => (
              <div
                key={t.id}
                className={`border border-gray-600 rounded-md p-2 hover:bg-gray-600 transition`}
                onClick={() => setTask(t)}
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">
                    {t.title}{" "}
                    <span className={`text-xl ${getPriorityColor(t.priority)}`}>
                      ●
                    </span>
                  </h2>
                  <div className="flex gap-2">
                    <TaskEditButton />
                    <TaskDeleteButton />
                  </div>
                </div>
                <p className="text-sm text-gray-300">{t.desc}</p>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>Due: {new Date(t.dueDate).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    {task?.id === t.id && editingTask ? (
                      <>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={progressValues[t.id] ?? t.progress}
                          onChange={(e) =>
                            handleProgressChange(t.id, Number(e.target.value))
                          }
                        />

                        <button
                          onClick={() => handleSetProgress(t.id)}
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                        >
                          Set
                        </button>
                      </>
                    ) : (
                      ""
                    )}

                    <p
                      onClick={() => setEditingTask((prevState) => !prevState)}
                    >
                      Progress: {progressValues[t.id] ?? t.progress}%
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
