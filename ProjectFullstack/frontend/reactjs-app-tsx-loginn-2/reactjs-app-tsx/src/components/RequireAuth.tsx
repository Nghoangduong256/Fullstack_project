import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props): React.ReactElement {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, preserve the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
