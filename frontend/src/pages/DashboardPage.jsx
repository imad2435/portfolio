import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    // Redirect to the homepage
    navigate('/');
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-sans flex h-screen">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
          <nav className="space-y-4">
            {/* These Links will navigate within the dashboard's <Outlet> */}
            <Link to="/dashboard/personal-info" className="block text-lg text-gray-400 hover:text-white">Personal Info</Link>
            <Link to="/dashboard/skills" className="block text-lg text-gray-400 hover:text-white">Skills</Link>
            <Link to="/dashboard/projects" className="block text-lg text-gray-400 hover:text-white">Projects</Link>
            <Link to="/dashboard/experiences" className="block text-lg text-gray-400 hover:text-white">Experiences</Link>
            <Link to="/dashboard/messages" className="block text-lg text-gray-400 hover:text-white">Messages</Link>
          </nav>
        </div>
        <button 
          onClick={handleLogout}
          className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>
      
      <main className="flex-1 p-10 overflow-y-auto">
        {/* The content for each admin section will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;