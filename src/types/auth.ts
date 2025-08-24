export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'student' | 'teacher';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'student' | 'teacher';
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthError {
  code: string;
  message: string;
}