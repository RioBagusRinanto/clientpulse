import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - replace with actual API call
      const storedUserData = localStorage.getItem('user_data');
      const storedPassword = localStorage.getItem('user_password');
      if (!storedUserData || !storedPassword) {
        throw new Error('No user found');
      }
      const userObj = JSON.parse(storedUserData);
      if (userObj.email !== email || storedPassword !== password) {
        throw new Error('Invalid email or password');
      }
      localStorage.setItem('auth_token', 'mock-token');
      setUser(userObj);
    } catch {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock signup - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        plan: 'free',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('auth_token', 'mock-token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      localStorage.setItem('user_password', password);
      setUser(mockUser);
    } catch {
      throw new Error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};