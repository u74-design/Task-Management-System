import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddTask = ({ onClose, onSuccess }) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Priority, setPriority] = useState("High");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/addtask", {
        Title,
        Description,
        Priority,
      });

      toast.success("Task Added");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't add task");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center h-screen"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <textarea
            required
            placeholder="Description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <select
            value={Priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
