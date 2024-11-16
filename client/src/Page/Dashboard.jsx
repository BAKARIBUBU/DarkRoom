// src/components/Dashboard.jsx
import React from 'react';
import DashboardSidebar from './DashboardSidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100 flex justify-center items-center min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Your Dashboard
        </h2>
        {/* More dashboard content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
