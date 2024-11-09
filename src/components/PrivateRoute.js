import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user, surveyCompleted } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!surveyCompleted && location.pathname !== '/survey') {
    // Redirect to survey if not completed
    return <Navigate to="/survey" replace />;
  }

  return children;
}

export default PrivateRoute; 