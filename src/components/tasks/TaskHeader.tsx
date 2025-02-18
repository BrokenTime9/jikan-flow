"use client";

const TaskHeader = () => {
  return (
    <thead className="">
      <tr>
        <th className="border border-gray-600 p-2 w-1/5">Title</th>
        <th className="border border-gray-600 p-2 w-1/5">Description</th>
        <th className="border border-gray-600 p-2 w-1/5">Due Date</th>
        <th className="border border-gray-600 p-2 w-1/5">Progress</th>
      </tr>
    </thead>
  );
};

export default TaskHeader;
