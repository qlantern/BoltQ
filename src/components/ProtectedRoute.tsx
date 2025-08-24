import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
  fallback?: ReactNode;
  onRedirect?: (path: string) => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  requireGuest = false,
  fallback,
  onRedirect
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    if (onRedirect) {
      onRedirect('signin');
      return null;
    }
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requireGuest && isAuthenticated) {
    if (onRedirect) {
      onRedirect('home');
      return null;
    }
    return fallback || null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;