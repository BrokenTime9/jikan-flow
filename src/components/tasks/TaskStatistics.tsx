import { useTaskStore } from "@/store/taskStore";

const TaskStatistics = () => {
  const { tasks, userTasks } = useTaskStore();

  console.log(tasks);
  const totalTasks = userTasks.length;
  const completedTasks = userTasks.filter((task) => task.progress).length;
  const pendingTasks = totalTasks - completedTasks;
  const priorityTasks = userTasks.filter(
    (task) => !task.progress && task.priority === 1,
  );

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const highPriorityTodayTasks = userTasks.filter((task) => {
    const taskDate = new Date(task.dueDate).toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
    return !task.progress && task.priority === 1 && taskDate === today;
  });
  const completionRate =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (Number(completionRate) / 100) * circumference;

  return (
    <div className="flex-grow flex flex-col items-center justify-center h-[100dvh] bg-gray-900 text-white p-6">
      <div className="p-4 flex-grow rounded-md bg-gray-800 w-full shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Task Statistics
        </h2>

        {/* Circular Progress Indicator */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="gray"
              strokeWidth="10"
              opacity="0.2"
            />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="green"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {completionRate}%
          </span>
        </div>

        {/* Task Info */}
        <div className="grid grid-cols-2 gap-6 text-lg">
          <div className="bg-gray-700 p-4 rounded-2xl shadow-md">
            <p className="text-gray-400">Total Tasks</p>
            <p className="text-xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-green-800 p-4 rounded-2xl shadow-md">
            <p className="text-gray-200">Completed</p>
            <p className="text-xl font-bold">{completedTasks}</p>
          </div>
          <div className="bg-yellow-700 p-4 rounded-2xl shadow-md">
            <p className="text-gray-200">Pending</p>
            <p className="text-xl font-bold">{pendingTasks}</p>
          </div>
          <div className="bg-blue-800 p-4 rounded-2xl shadow-md">
            <p className="text-gray-200">Completion Rate</p>
            <p className="text-xl font-bold">{completionRate}%</p>
          </div>
          <div className="bg-red-800 p-4 rounded-2xl shadow-md">
            <p className="text-gray-200">High Priority Tasks Pending</p>
            <p className="text-xl font-bold">{priorityTasks.length}</p>
          </div>
          <div className="bg-red-800 p-4 rounded-2xl shadow-md">
            <p className="text-gray-200">High Priority Due Today</p>
            <p className="text-xl font-bold">{highPriorityTodayTasks.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;
