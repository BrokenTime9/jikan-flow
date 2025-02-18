"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";
import { useState } from "react";
import { X } from "lucide-react";

const AddTaskForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<number>(2);
  const { createTask } = useTasks();
  const { project } = useTaskStore();
  const numericPid = project?.id ? Number(project.id) : null;
  const { taskForm, setTaskForm } = useTaskStore();

  const handleClick = () => {
    if (numericPid && date) {
      createTask({ title, desc, type, dueDate: date, projectId: numericPid });
      setTaskForm();
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
              }}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
              Add New Task
            </h2>

            {/* Form Inputs */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Type"
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
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full p-2 border border-gray-500 rounded text-black"
                min="1"
                max="3"
              />
              <button
                onClick={handleClick}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddTaskForm;
