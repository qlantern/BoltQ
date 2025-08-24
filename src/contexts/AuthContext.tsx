import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, SignUpData, SignInData, AuthError } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  signUp: (data: SignUpData) => Promise<{ user: User; error: null } | { user: null; error: AuthError }>;
  signIn: (data: SignInData) => Promise<{ user: User; error: null } | { user: null; error: AuthError }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>) => Promise<{ user: User; error: null } | { user: null; error: AuthError }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: true; error: null } | { success: false; error: AuthError }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      setAuthState({
        user: currentUser,
        isLoading: false,
        isAuthenticated: currentUser !== null
      });
    };

    // Set up event listeners
    const handleAuthStateChange = (data: { user: User | null; isAuthenticated: boolean }) => {
      setAuthState(prev => ({
        ...prev,
        user: data.user,
        isAuthenticated: data.isAuthenticated,
        isLoading: false
      }));
    };

    authService.on('auth:stateChange', handleAuthStateChange);

    initializeAuth();

    // Cleanup
    return () => {
      authService.off('auth:stateChange', handleAuthStateChange);
    };
  }, []);

  const signUp = async (data: SignUpData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await authService.signUp(data);
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return result;
  };

  const signIn = async (data: SignInData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await authService.signIn(data);
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return result;
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    await authService.signOut();
    setAuthState(prev => ({ ...prev, isLoading: false }));
  };

  const updateProfile = async (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await authService.updateProfile(updates);
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return result;
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    return await authService.changePassword(currentPassword, newPassword);
  };

  const value: AuthContextType = {
    ...authState,
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};