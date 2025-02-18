"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const AddTaskForm = () => {
  const { createTask, updateTask, isUpdating, isAdding } = useTasks();
  const { project, taskForm, setTaskForm, task, setTask } = useTaskStore();

  // Local state
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<number>(2);

  const numericPid = project?.id ? Number(project.id) : null;

  // Prefill form if editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.desc);
      setType(task.type);
      setDate(new Date(task.dueDate));
      setPriority(task.priority || 2);
    }
  }, [task]);

  const handleSubmit = () => {
    if (date && numericPid) {
      if (task?.id) {
        updateTask({
          id: task?.id,
          title,
          desc,
          dueDate: date,
          progress: task?.progress,
        });
      } else {
        createTask({
          title,
          desc,
          type,
          dueDate: date,
          priority,
          projectId: numericPid,
        });
      }
    }
  };

  return (
    <>
      {taskForm ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Form Container */}
          <div className="relative bg-gray-900 p-6 rounded-lg shadow-lg w-[400px]">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => {
                setTaskForm();
                setTask(null);
              }}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
              {task ? "Update Task" : "Add New Task"}
            </h2>

            {/* Form Inputs */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded text-black"
                required
              />
              <input
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
                className="w-full p-2 border border-gray-500 rounded text-black"
                required
              />
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full p-2 border border-gray-500 rounded text-black"
                min="1"
                max="3"
              />
              <button
                onClick={handleSubmit}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {task
                  ? isUpdating
                    ? "Updating..."
                    : "Edit Task"
                  : isAdding
                    ? "Adding task..."
                    : "Add task"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddTaskForm;
