import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    if (!email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      validationErrors.email = "Invalid email format!";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required!";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long!";
    }

    return validationErrors;
  };

  const HandleAdmin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If no validation errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/admin/login", { email, password });
        if (res.data.status) {
          navigate("/adminPanel");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={HandleAdmin} 
        method="POST"
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/adminSignup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
