import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignupForm = () => {
  const [adminname, setAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors

  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const validationErrors = {};

    if (!adminname.trim()) {
      validationErrors.adminname = "Admin name is required!";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      validationErrors.email = "Invalid email format!";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required!";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long!";
    }

    return validationErrors;
  };

  const HandleAdminData = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/admin/signup", {
          adminname,
          email,
          password,
        });

        if (res.data.status) {
          navigate("/adminLogin");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        method="POST"
        onSubmit={HandleAdminData}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Admin Signup</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Admin name
          </label>
          <input
            type="text"
            id="adminname"
            name="adminname"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
            onChange={(e) => setAdmin(e.target.value)}
          />
          {errors.adminname && (
            <span className="text-red-500">{errors.adminname}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/adminLogin" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminSignupForm;
