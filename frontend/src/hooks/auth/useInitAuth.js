
import { useEffect } from 'react'

import { getUserDataRequest, refreshTokenRequest } from '@/api/authApi.js'
import { useAuthStore } from '@/store/useAuthStore.js'

export const useInitAuth = () => {
  const setToken = useAuthStore.getState().setToken
  const setUser = useAuthStore.getState().setUser
  const setIsAuthInitialized = useAuthStore.getState().setIsAuthInitialized
  const isAuthInitialized = useAuthStore.getState().isAuthInitialized
  useEffect(() => {
    if (isAuthInitialized) return
    
    // Function to initialize authentication
    const initAuth = async () => {
      try {
        const { data } = await refreshTokenRequest()
        console.log('Initializing authentication...');
        setToken(data.token)
        const userResponse = await getUserDataRequest()
        setUser(userResponse.data)
      } catch (error) {
        console.error('Error during auth initialization:', error)
        window.location.replace('/login')
      } finally {
        setIsAuthInitialized()
      }
    }
    initAuth()
  }, [isAuthInitialized])
}
