import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext"; 

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout,loading   } = useUser();
  if (loading) return null;
  return (

    <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm border-b border-gray-200">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-black">TaskFlow</span>
        <span className="text-gray-500 text-sm">
          Manage your tasks efficiently
        </span>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-semibold text-black">{user.name}</div>
            <div className="text-gray-500 text-sm">{user.email}</div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm flex items-center gap-1"
          >
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
