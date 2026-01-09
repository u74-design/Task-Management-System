import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TaskToolbar from "../components/Search";
import TaskCard from "../components/Task";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState(""); 

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="px-6 mt-6 space-y-8">
        <TaskToolbar
          onTaskAdded={() => setRefresh((prev) => !prev)}
          search={search}
          setSearch={setSearch}
        />
        <TaskCard refresh={refresh} search={search} />
      </div>
    </div>
  );
};

export default Dashboard;
