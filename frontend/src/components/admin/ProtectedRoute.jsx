import React from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  if (!token || isAdmin !== 'true') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
