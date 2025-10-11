import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'admin' | 'officer';
  phone?: string;
  aadharNumber?: string;
  state?: string;
  district?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  aadharNumber: string;
  state: string;
  district: string;
  role: 'farmer' | 'admin' | 'officer';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In a real app, you would validate the token with your backend
          const userData = localStorage.getItem('user_data');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication - accept any email/password for demo purposes
      // In production, this would validate against your backend
      if (email && password && email.includes('@') && password.length >= 1) {
        // Determine role based on email or use default
        let role: 'farmer' | 'admin' | 'officer' = 'farmer';
        let name = 'Demo User';
        
        if (email.includes('admin') || email === 'admin@example.com') {
          role = 'admin';
          name = 'Admin User';
        } else if (email.includes('officer') || email === 'officer@example.com') {
          role = 'officer';
          name = 'Government Officer';
        } else if (email === 'farmer@example.com') {
          name = 'Rajesh Kumar';
        } else {
          // Extract name from email for new users
          const emailName = email.split('@')[0];
          name = emailName.charAt(0).toUpperCase() + emailName.slice(1);
        }
        
        const mockUser: User = {
          id: Date.now().toString(),
          email: email,
          name: name,
          role: role,
          phone: '+91 9876543210',
          aadharNumber: '1234-5678-9012',
          state: 'Delhi',
          district: 'New Delhi'
        };
        
        setUser(mockUser);
        localStorage.setItem('auth_token', 'mock_jwt_token');
        localStorage.setItem('user_data', JSON.stringify(mockUser));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, create user via backend
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        aadharNumber: userData.aadharNumber,
        state: userData.state,
        district: userData.district
      };
      
      setUser(newUser);
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user_data', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual profile update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
