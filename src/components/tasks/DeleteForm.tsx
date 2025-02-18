"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskStore";

const DeleteForm = () => {
  const { task, setDeleteTaskForm } = useTaskStore();
  const { deleteTask, isDeleting } = useTasks();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        {!isDeleting ? (
          <>
            <h1 className="text-lg font-semibold text-gray-800 mb-4 break-words ">
              Are you sure you want to delete the project:{" "}
              <span className="text-red-500">{task?.title}</span>?
            </h1>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (task?.id !== undefined) {
                    deleteTask({ id: task?.id });
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md transition hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setDeleteTaskForm();
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md transition hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Deleting...</p>
        )}
      </div>
    </div>
  );
};

export default DeleteForm;
