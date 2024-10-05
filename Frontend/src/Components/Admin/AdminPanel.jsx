import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminPanel = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout logic here
    navigate("/adminLogin"); // redirect to login
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-gray-400 text-white font-bold p-4 flex flex-col">
        <h2 className="text-4xl font-bold mb-6">Admin Panel</h2>
        <ul className="flex-1">
          <li className="mb-4">
            <Link to="/adminPanel/addMovie" className="block p-2 w-full rounded bg-blue-600">
              Create Movie
            </Link>
          </li>
          {/* New Link for All Movies */}
          <li className="mb-4">
            <Link to="/adminPanel/allMovie" className="block p-2 rounded bg-blue-600">
              All Movies
            </Link>
          </li>
        </ul>
        <button 
          onClick={handleLogout} 
          className="w-24 py-2 bg-red-500 hover:bg-red-600 rounded text-center mt-auto"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
        <div className="flex-1 bg-gray-100">
            <Outlet/>
        </div>
    </div>
  );
};

export default AdminPanel;
