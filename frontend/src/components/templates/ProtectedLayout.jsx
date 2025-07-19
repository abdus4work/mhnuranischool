import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { Spinner } from '@/components/molecules/Spinner.jsx'
import { useInitAuth } from '@/hooks/auth/useInitAuth.js'
import { useAuthStore } from '@/store/useAuthStore.js'
export const ProtectedLayout = () => {
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.token)
  const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized)

  useInitAuth()

  useEffect(() => {
    if (isAuthInitialized && !token) {
      console.log('Redirecting to login page')
      navigate('/login', { replace: true })
    }
  }, [isAuthInitialized, token, navigate])

  if (!isAuthInitialized) {
    return <Spinner /> // Show a loading state while auth is being initialized
  }

  if (!token) {
    return null // Prevent rendering the layout if not authenticated
  }

  return <Outlet />
}
