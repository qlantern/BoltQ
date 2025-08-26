import { User, SignUpData, SignInData, AuthError, Session, StoredUser } from '../types/auth';

import { hashPassword, verifyPassword, generateToken } from '../utils/crypto';

class AuthService {
  private users: Map<string, StoredUser> = new Map();
  private currentUser: User | null = null;
  private currentSession: Session | null = null;
  private eventListeners: Map<string, Function[]> = new Map();
  private failedAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();
  private readonly MAX_FAILED_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.initializeMockUsers().catch(console.error);
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

  private async initializeMockUsers() {
    // Mock users for testing
    const mockUsers = [
      {
        id: 'user-1',
        email: 'student@example.com',
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
        firstName: 'Sarah',
        lastName: 'Johnson',
        avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        role: 'teacher' as const,
        isEmailVerified: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];

    for (const user of mockUsers) {
      const { hash, salt } = await hashPassword('password123');
      const storedUser: StoredUser = {
        ...user,
        passwordHash: hash,
        passwordSalt: salt,
        sessions: []
      };
      this.users.set(user.email, storedUser);
    }
  }

  private loadUserFromStorage() {
    const storedAuth = localStorage.getItem('teachbnb_auth');
    if (storedAuth) {
      try {
        const { user, session } = JSON.parse(storedAuth);
        // Convert date strings back to Date objects
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        session.expiresAt = new Date(session.expiresAt);
        
        // Check if session is expired
        if (session.expiresAt <= new Date()) {
          this.removeUserFromStorage();
          return;
        }

        this.currentUser = user;
        this.currentSession = session;
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        this.removeUserFromStorage();
      }
    }
  }

  private saveUserToStorage(user: User, session: Session) {
    localStorage.setItem('teachbnb_auth', JSON.stringify({ user, session }));
  }

  private removeUserFromStorage() {
    localStorage.removeItem('teachbnb_auth');
  }

  // Simulate API delay
  private delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async signUp(data: SignUpData): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    await this.delay(1500);

    // Input validation
    if (!this.isValidEmail(data.email)) {
      return {
        user: null,
        error: {
          code: 'invalid_email',
          message: 'Please enter a valid email address'
        }
      };
    }

    if (!this.isValidPassword(data.password)) {
      return {
        user: null,
        error: {
          code: 'invalid_password',
          message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
      };
    }

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

    // Hash password
    const { hash, salt } = await hashPassword(data.password);

    // Create new user
    const userWithoutSensitive: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: `https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`,
      role: data.role || 'student',
      isEmailVerified: false, // In real app, would require email verification
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create session
    const session: Session = {
      token: generateToken(),
      expiresAt: new Date(Date.now() + this.SESSION_DURATION)
    };

    // Create stored user
    const storedUser: StoredUser = {
      ...userWithoutSensitive,
      passwordHash: hash,
      passwordSalt: salt,
      sessions: [session]
    };

    this.users.set(data.email, storedUser);
    this.currentUser = userWithoutSensitive;
    this.currentSession = session;
    this.saveUserToStorage(userWithoutSensitive, session);

    this.emit('auth:signUp', userWithoutSensitive);
    this.emit('auth:stateChange', { 
      user: userWithoutSensitive, 
      isAuthenticated: true,
      session
    });

    return { user: userWithoutSensitive, error: null };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  async signIn(data: SignInData): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    await this.delay(1000);

    // Check for rate limiting
    const attempts = this.failedAttempts.get(data.email);
    if (attempts) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
      if (attempts.count >= this.MAX_FAILED_ATTEMPTS && timeSinceLastAttempt < this.LOCKOUT_DURATION) {
        return {
          user: null,
          error: {
            code: 'account_locked',
            message: `Too many failed attempts. Please try again in ${Math.ceil((this.LOCKOUT_DURATION - timeSinceLastAttempt) / 60000)} minutes.`
          }
        };
      }
      if (timeSinceLastAttempt >= this.LOCKOUT_DURATION) {
        this.failedAttempts.delete(data.email);
      }
    }

    const storedUser = this.users.get(data.email);
    if (!storedUser) {
      this.recordFailedAttempt(data.email);
      return {
        user: null,
        error: {
          code: 'invalid_credentials',
          message: 'Invalid email or password'
        }
      };
    }

    if (!(await verifyPassword(data.password, storedUser.passwordHash, storedUser.passwordSalt))) {
      this.recordFailedAttempt(data.email);
      return {
        user: null,
        error: {
          code: 'invalid_credentials',
          message: 'Invalid email or password'
        }
      };
    }

    // Reset failed attempts on successful login
    this.failedAttempts.delete(data.email);

    // Create new session
    const session: Session = {
      token: generateToken(),
      expiresAt: new Date(Date.now() + this.SESSION_DURATION)
    };

    // Store session
    storedUser.sessions = storedUser.sessions.filter(s => s.expiresAt > new Date());
    storedUser.sessions.push(session);
    
    const { passwordHash, passwordSalt, sessions, ...userWithoutSensitiveData } = storedUser;
    this.currentUser = userWithoutSensitiveData;
    this.currentSession = session;
    
    if (data.rememberMe) {
      this.saveUserToStorage(userWithoutSensitiveData, session);
    }

    this.emit('auth:signIn', userWithoutSensitiveData);
    this.emit('auth:stateChange', { 
      user: userWithoutSensitiveData, 
      isAuthenticated: true,
      session
    });

    return { user: userWithoutSensitiveData, error: null };
  }

  private recordFailedAttempt(email: string) {
    const attempts = this.failedAttempts.get(email) || { count: 0, lastAttempt: new Date() };
    attempts.count += 1;
    attempts.lastAttempt = new Date();
    this.failedAttempts.set(email, attempts);
  }

  async signOut(): Promise<void> {
    await this.delay(500);

    if (this.currentUser && this.currentSession) {
      const storedUser = this.users.get(this.currentUser.email);
      if (storedUser) {
        // Remove current session
        storedUser.sessions = storedUser.sessions.filter(
          s => s.token !== this.currentSession?.token
        );
        this.users.set(this.currentUser.email, storedUser);
      }
    }

    this.currentUser = null;
    this.currentSession = null;
    this.removeUserFromStorage();

    this.emit('auth:signOut', null);
    this.emit('auth:stateChange', { 
      user: null, 
      isAuthenticated: false,
      session: null
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  async updateProfile(updates: Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>>): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    await this.delay(800);

    if (!this.currentUser || !this.currentSession) {
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
    const storedUser = this.users.get(this.currentUser.email);
    if (storedUser) {
      const updatedStoredUser: StoredUser = {
        ...storedUser,
        ...updates,
        updatedAt: new Date()
      };
      this.users.set(this.currentUser.email, updatedStoredUser);
    }

    this.currentUser = updatedUser;
    this.saveUserToStorage(updatedUser, this.currentSession);

    this.emit('auth:profileUpdate', updatedUser);
    this.emit('auth:stateChange', { 
      user: updatedUser, 
      isAuthenticated: true,
      session: this.currentSession
    });

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

    // Validate new password
    if (!this.isValidPassword(newPassword)) {
      return {
        success: false,
        error: {
          code: 'invalid_password',
          message: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
      };
    }

    const storedUser = this.users.get(this.currentUser.email);
    if (!storedUser || !(await verifyPassword(currentPassword, storedUser.passwordHash, storedUser.passwordSalt))) {
      return {
        success: false,
        error: {
          code: 'invalid_password',
          message: 'Current password is incorrect'
        }
      };
    }

    // Update password
    const { hash, salt } = await hashPassword(newPassword);
    storedUser.passwordHash = hash;
    storedUser.passwordSalt = salt;
    storedUser.updatedAt = new Date();
    this.users.set(this.currentUser.email, storedUser);

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