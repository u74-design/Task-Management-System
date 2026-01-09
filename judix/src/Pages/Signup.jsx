import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser(); 
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PassWord, setPassWord] = useState("");

  const SignupData = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/signup",
        { Name, Email, PassWord },
        { withCredentials: true }
      );
        setUserData({
        name: Name,
        email: Email,
      });
      toast.success("Welcome");
      navigate("/dashboard");
    } catch (err) {
      console.log("Error in Signup", err);
      toast.error("Error in Signup try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-1">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">Manage your Task</p>

        <form className="space-y-4" onSubmit={SignupData}>
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full border rounded-md px-3 py-2 bg-gray-50"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              required
              type="password"
              placeholder="******"
              className="w-full border rounded-md px-3 py-2 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-3"
          >
            Create Account 
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <button onClick={()=>navigate('/login')}>Signin</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
