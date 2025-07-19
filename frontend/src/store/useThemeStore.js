import {create} from 'zustand'

export const useTheme = create(set => ({
  theme: 'light', // Default theme
  
  initTheme: () => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    console.log('Initializing theme:', savedTheme)
    document.documentElement.className = savedTheme
    set({theme: savedTheme})
  },
  toggleTheme: () => {
    set((state)=>{
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      document.documentElement.className = newTheme
      localStorage.setItem('theme', newTheme)
      return {theme: newTheme}
    })
  }
}))