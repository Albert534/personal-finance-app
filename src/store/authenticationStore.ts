// authenticationStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthenticationStore {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

export const useAuthenticationStore = create<AuthenticationStore>()(
  persist(
    (set) => ({
      authenticated: false,
      setAuthenticated: (authenticated) => set({ authenticated }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
);
