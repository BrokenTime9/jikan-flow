"use client";

import Tasks from "./tasks/page";
import Projects from "./projects/page";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-80 h-[100dvh] ">
        <Projects />
      </div>
      <Tasks />
    </div>
  );
};

export default Dashboard;
