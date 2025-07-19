import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthInitialized: false,
  setIsAuthInitialized: () => set({ isAuthInitialized:true }),
  setUser: (user) => set({ user }),
  setToken: (token) => set({token}),
}))
