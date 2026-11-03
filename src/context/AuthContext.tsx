// 'use client';

// import { createContext, useContext, useSyncExternalStore } from 'react';
// import { apiRequest } from '@/lib/api';
// import type { User } from '@/types/studio';

// const STORAGE_KEY = 'studio_user';
// const AUTH_EVENT = 'studiospace:auth-change';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (userData: User) => void;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function subscribeToAuth(callback: () => void) {
//   window.addEventListener('storage', callback);
//   window.addEventListener(AUTH_EVENT, callback);
//   return () => {
//     window.removeEventListener('storage', callback);
//     window.removeEventListener(AUTH_EVENT, callback);
//   };
// }

// function getStoredUser(): string | null {
//   try {
//     return localStorage.getItem(STORAGE_KEY);
//   } catch (error) {
//     console.error('Unable to read the saved StudioSpace user.', error);
//     return null;
//   }
// }

// function getUser(serializedUser: string | null | undefined): User | null {
//   if (!serializedUser) return null;
//   try {
//     const user: unknown = JSON.parse(serializedUser);
//     if (
//       typeof user === 'object' &&
//       user !== null &&
//       'name' in user &&
//       typeof user.name === 'string' &&
//       'email' in user &&
//       typeof user.email === 'string'
//     ) {
//       return {
//         name: user.name,
//         email: user.email,
//         photoUrl: 'photoUrl' in user && typeof user.photoUrl === 'string' ? user.photoUrl : undefined,
//       };
//     }
//     console.error('The saved StudioSpace user has an invalid format.');
//   } catch (error) {
//     console.error('Unable to parse the saved StudioSpace user.', error);
//   }
//   return null;
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const serializedUser = useSyncExternalStore<string | null | undefined>(
//     subscribeToAuth,
//     getStoredUser,
//     () => undefined,
//   );
//   const loading = serializedUser === undefined;
//   const user = getUser(serializedUser);

//   const login = (userData: User) => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
//       window.dispatchEvent(new Event(AUTH_EVENT));
//     } catch (error) {
//       console.error('Unable to save the StudioSpace user.', error);
//       throw new Error('Your session could not be saved in this browser.', { cause: error });
//     }
//   };

//   const logout = async () => {
//     await apiRequest('/logout', { method: 'POST' });
//     localStorage.removeItem(STORAGE_KEY);
//     window.dispatchEvent(new Event(AUTH_EVENT));
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// }



'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import { apiRequest } from '@/lib/api';
import type { User } from '@/types/studio';

const STORAGE_KEY = 'studio_user';
const AUTH_EVENT = 'studiospace:auth-change';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function subscribeToAuth(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getStoredUser(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('Unable to read the saved StudioSpace user.', error);
    return null;
  }
}

function getUser(serializedUser: string | null | undefined): User | null {
  if (!serializedUser) return null;
  try {
    const user: unknown = JSON.parse(serializedUser);
    if (
      typeof user === 'object' &&
      user !== null &&
      'name' in user &&
      typeof user.name === 'string' &&
      'email' in user &&
      typeof user.email === 'string'
    ) {
      return {
        name: user.name,
        email: user.email,
        photoUrl: 'photoUrl' in user && typeof user.photoUrl === 'string' ? user.photoUrl : undefined,
      };
    }
    console.error('The saved StudioSpace user has an invalid format.');
  } catch (error) {
    console.error('Unable to parse the saved StudioSpace user.', error);
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const serializedUser = useSyncExternalStore<string | null | undefined>(
    subscribeToAuth,
    getStoredUser,
    () => null, // Server side snapshot fix to avoid initial undefined state issues
  );
  
  // Loading should only be true if we haven't mounted yet or actively checking. 
  // With useSyncExternalStore, if it returns null immediately on server/client first pass, loading can be managed safely.
  const loading = serializedUser === undefined;
  const user = getUser(serializedUser);

  const login = (userData: User) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      window.dispatchEvent(new Event(AUTH_EVENT));
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
    window.dispatchEvent(new Event(AUTH_EVENT));
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