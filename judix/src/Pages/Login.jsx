import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();

  const [Email, setEmail] = useState("");
  const [PassWord, setPassWord] = useState("");

  const LoginData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/login",
        { Email, PassWord },
        { withCredentials: true }
      );

      //Fetch User Data From Backend
      setUserData({
        name: res.data.user.name,
        email: res.data.user.email,
      });

      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (err) {
      console.log("Error in Login", err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-1">Login</h1>
        <p className="text-center text-gray-500 mb-6">Manage your Task</p>

        <form className="space-y-4" onSubmit={LoginData}>
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-md px-3 py-2 bg-gray-50"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="******"
              className="w-full border rounded-md px-3 py-2 bg-gray-50"
              onChange={(e) => setPassWord(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-3"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Don't have an account?{" "}
          <button onClick={() => navigate("/")}>Signup</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
