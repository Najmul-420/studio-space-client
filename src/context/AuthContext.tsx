'use client';

import { createContext, useContext, useState, useEffect, startTransition } from 'react';
import { apiRequest } from '@/lib/api';
import type { User } from '@/types/studio';

const STORAGE_KEY = 'studio_user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // পেজ লোড বা রিফ্রেশ হওয়ার সময় localStorage থেকে ইউজার রিড করা
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const parsedUser: unknown = JSON.parse(storedUser);
        if (
          typeof parsedUser === 'object' &&
          parsedUser !== null &&
          'name' in parsedUser &&
          typeof parsedUser.name === 'string' &&
          'email' in parsedUser &&
          typeof parsedUser.email === 'string'
        ) {
          const name = parsedUser.name;
          const email = parsedUser.email;
          const photoUrl = 'photoUrl' in parsedUser && typeof parsedUser.photoUrl === 'string' ? parsedUser.photoUrl : undefined;

          // পেজ রিফ্রেশের পরেও auth_session কুকি নিশ্চিত করা
          document.cookie = "auth_session=1; path=/; max-age=604800; SameSite=Lax";

          startTransition(() => {
            setUser({
              name,
              email,
              photoUrl,
            });
          });
        }
      }
    } catch (error) {
      console.error('Unable to parse the saved StudioSpace user.', error);
    } finally {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, []);

  const login = (userData: User) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      // auth_session কুকি সেট করা হচ্ছে (non-httpOnly) যা proxy.ts রিড করবে
      document.cookie = "auth_session=1; path=/; max-age=604800; SameSite=Lax";
      setUser(userData);
    } catch (error) {
      console.error('Unable to save the StudioSpace user.', error);
      throw new Error('Your session could not be saved in this browser.', { cause: error });
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = "auth_session=; path=/; max-age=0; SameSite=Lax";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
