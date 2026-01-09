import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskCard = ({ refresh, search }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/tasks");
      setTasks(res.data.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const DeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3001/deletetask/${id}`);
      toast.success("Task Deleted");
      fetchTasks();
    } catch (err) {
      console.log("Couldn't Delete the Task", err);
      toast.error("Couldn't Delete the Task, Please try again!");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.Title.toLowerCase().includes(search.toLowerCase()) ||
    task.Description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl border p-5"
          >
            <h3 className="text-lg font-semibold">{task.Title}</h3>
            <p className="text-sm text-gray-500 mt-1">{task.Description}</p>

            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 text-xs rounded-full bg-red-100">
                {task.Priority}
              </span>

              <button
                onClick={() => DeleteTask(task._id)}
                className="px-3 py-1 text-xs text-white rounded-full bg-red-800 cursor-pointer"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No tasks found
        </p>
      )}
    </div>
  );
};

export default TaskCard;
