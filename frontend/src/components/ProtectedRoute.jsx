import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for the auth token in localStorage
  const token = localStorage.getItem('authToken');

  // If a token exists, render the child routes (using <Outlet />).
  // If not, redirect the user to the /login page.
  // The 'replace' prop prevents the user from going back to the protected page with the browser's back button.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;