import React, { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import AddTask from "./AddTask";

const TaskToolbar = ({ onTaskAdded, search, setSearch }) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
          />
        </div>


        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus />
          Add Task
        </button>
      </div>

      {showAddTask && (
        <AddTask
          onClose={() => setShowAddTask(false)}
          onSuccess={() => {
            onTaskAdded();
            setShowAddTask(false);
          }}
        />
      )}
    </>
  );
};

export default TaskToolbar;
