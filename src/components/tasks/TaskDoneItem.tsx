"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";

const TaskDoneItem = () => {
  const { tasks } = useTaskStore();
  const { isLoading } = useTasks();

  return (
    <div className="w-full h-[50dvh]  bg-gray-800 p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-gray-700 px-3 py-1 rounded text-white">
          Completed Projects:
        </h1>
      </div>

      <div className="w-full  h-[40dvh] overflow-auto custom-scrollbar bg-gray-800 pr-2">
        {/* Scrollable Task List */}
        <div className="space-y-2">
          {isLoading ? (
            <p className="text-center text-white">Loading tasks...</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-600 rounded-md p-2 bg-gray-800 hover:bg-gray-600 transition"
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-300">{task.desc}</p>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <span>Progress: {task.progress}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks completed yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDoneItem;
