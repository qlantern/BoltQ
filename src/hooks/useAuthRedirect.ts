import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseAuthRedirectOptions {
  requireAuth?: boolean;
  requireGuest?: boolean;
  redirectTo?: string;
  onRedirect?: (path: string) => void;
}

export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const {
    requireAuth = false,
    requireGuest = false,
    redirectTo,
    onRedirect
  } = options;

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      const path = redirectTo || 'signin';
      onRedirect?.(path);
    }

    if (requireGuest && isAuthenticated) {
      const path = redirectTo || 'home';
      onRedirect?.(path);
    }
  }, [isAuthenticated, isLoading, requireAuth, requireGuest, redirectTo, onRedirect]);

  return {
    shouldRender: isLoading || 
      (requireAuth ? isAuthenticated : true) && 
      (requireGuest ? !isAuthenticated : true)
  };
};