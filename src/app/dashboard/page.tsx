"use client";

import Tasks from "./tasks/page";
import Projects from "./projects/page";
import ErrorPopUp from "@/components/popup/errorPopUp";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-80 h-[100dvh] ">
        <Projects />
      </div>
      <Tasks />
      <ErrorPopUp />
    </div>
  );
};

export default Dashboard;
