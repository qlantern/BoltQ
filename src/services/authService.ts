import { User, SignUpData, SignInData, AuthError } from '../types/auth';

class AuthService {
  private users: Map<string, User & { password: string }> = new Map();
  private currentUser: User | null = null;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.initializeMockUsers();
    this.loadUserFromStorage();
  }

  // Event system for auth state changes
  on(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  private initializeMockUsers() {
    // Mock users for testing
    const mockUsers = [
      {
        id: 'user-1',
        email: 'student@example.com',
        password: 'password123',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        role: 'student' as const,
        isEmailVerified: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: 'user-2',
        email: 'teacher@example.com',
        password: 'password123',
        firstName: 'Sarah',
        lastName: 'Johnson',
        avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        role: 'teacher' as const,
        isEmailVerified: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];

    mockUsers.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  private loadUserFromStorage() {
    const storedUser = localStorage.getItem('teachbnb_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Convert date strings back to Date objects
        userData.createdAt = new Date(userData.createdAt);
        userData.updatedAt = new Date(userData.updatedAt);
        this.currentUser = userData;
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        localStorage.removeItem('teachbnb_user');
      }
    }
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem('teachbnb_user', JSON.stringify(user));
  }

  private removeUserFromStorage() {
    localStorage.removeItem('teachbnb_user');
  }

  // Simulate API delay
  private delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async signUp(data: SignUpData): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    await this.delay(1500);

    // Check if user already exists
    if (this.users.has(data.email)) {
      return {
        user: null,
        error: {
          code: 'user_already_exists',
          message: 'A user with this email already exists'
        }
      };
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: `https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`,
      role: data.role || 'student',
      isEmailVerified: false, // In real app, would require email verification
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.set(data.email, newUser);

    // Remove password from user object for client
    const { password, ...userWithoutPassword } = newUser;
    this.currentUser = userWithoutPassword;
    this.saveUserToStorage(userWithoutPassword);

    this.emit('auth:signUp', userWithoutPassword);
    this.emit('auth:stateChange', { user: userWithoutPassword, isAuthenticated: true });

    return { user: userWithoutPassword, error: null };
  }

  async signIn(data: SignInData): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    await this.delay(1000);

    const user = this.users.get(data.email);
    if (!user || user.password !== data.password) {
      return {
        user: null,
        error: {
          code: 'invalid_credentials',
          message: 'Invalid email or password'
        }
      };
    }

    // Remove password from user object for client
    const { password, ...userWithoutPassword } = user;
    this.currentUser = userWithoutPassword;
    
    if (data.rememberMe) {
      this.saveUserToStorage(userWithoutPassword);
    }

    this.emit('auth:signIn', userWithoutPassword);
    this.emit('auth:stateChange', { user: userWithoutPassword, isAuthenticated: true });

    return { user: userWithoutPassword, error: null };
  }

  async signOut(): Promise<void> {
    await this.delay(500);

    this.currentUser = null;
    this.removeUserFromStorage();

    this.emit('auth:signOut', null);
    this.emit('auth:stateChange', { user: null, isAuthenticated: false });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async updateProfile(updates: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    await this.delay(800);

    if (!this.currentUser) {
      return {
        user: null,
        error: {
          code: 'not_authenticated',
          message: 'User not authenticated'
        }
      };
    }

    const updatedUser: User = {
      ...this.currentUser,
      ...updates,
      updatedAt: new Date()
    };

    // Update in storage
    const userWithPassword = this.users.get(this.currentUser.email);
    if (userWithPassword) {
      this.users.set(this.currentUser.email, { ...userWithPassword, ...updates, updatedAt: new Date() });
    }

    this.currentUser = updatedUser;
    this.saveUserToStorage(updatedUser);

    this.emit('auth:profileUpdate', updatedUser);
    this.emit('auth:stateChange', { user: updatedUser, isAuthenticated: true });

    return { user: updatedUser, error: null };
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: true; error: null } | { success: false; error: AuthError }> {
    await this.delay(800);

    if (!this.currentUser) {
      return {
        success: false,
        error: {
          code: 'not_authenticated',
          message: 'User not authenticated'
        }
      };
    }

    const userWithPassword = this.users.get(this.currentUser.email);
    if (!userWithPassword || userWithPassword.password !== currentPassword) {
      return {
        success: false,
        error: {
          code: 'invalid_password',
          message: 'Current password is incorrect'
        }
      };
    }

    // Update password
    userWithPassword.password = newPassword;
    userWithPassword.updatedAt = new Date();
    this.users.set(this.currentUser.email, userWithPassword);

    return { success: true, error: null };
  }

  // Method to easily migrate to Supabase
  async migrateToSupabase() {
    // This method would handle the migration from mock auth to Supabase
    // For now, it's just a placeholder
    console.log('Ready to migrate to Supabase authentication');
  }
}

export const authService = new AuthService();