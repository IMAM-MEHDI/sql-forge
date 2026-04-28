import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = (() => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return !!payload.is_admin;
    } catch {
      return false;
    }
  })();

  if (adminOnly && !isAdmin) {
    // If it's an admin-only route and user is not admin, redirect to regular dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
