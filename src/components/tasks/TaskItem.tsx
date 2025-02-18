"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";
import { Pencil, Plus, SquareX, Trash2 } from "lucide-react";

const TaskItem = () => {
  const { tasks, project, setProject, setTaskForm } = useTaskStore();
  const { isLoading } = useTasks();

  const handleAdd = () => {
    setTaskForm();
  };
  const handleClose = () => {
    setProject(null);
  };
  const handleEdit = () => {};
  const handleDel = () => {};

  return (
    <div className="w-full h-[60dvh] overflow-hidden bg-gray-800 p-4 border border-gray-700">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-gray-700 px-3 py-1 rounded text-white">
          Project: {project?.project}
        </h1>
        <div className="flex gap-2">
          <button
            className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
            onClick={handleDel}
          >
            <Trash2 size={18} />
          </button>
          <button
            className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
            onClick={handleEdit}
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleAdd}
            className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
          >
            <Plus size={18} />
          </button>
          <button
            className="p-2 rounded bg-gray-700 hover:bg-white hover:text-black transition"
            onClick={handleClose}
          >
            <SquareX size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Task List */}
      <div className="h-[50dvh] overflow-auto custom-scrollbar space-y-2 pr-2">
        {isLoading ? (
          <p className="text-center text-white">Loading tasks...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task, i) => (
            <div
              key={i}
              className="border border-gray-600 rounded-md p-2 bg-gray-800 hover:bg-gray-600 transition"
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-300">{task.desc}</p>
              <div className="flex justify-between text-gray-400 text-sm mt-2">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span>Progress: {task.progress}</span>
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
