// ProtectedRoute.jsx
import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
