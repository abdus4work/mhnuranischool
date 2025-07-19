import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { logoutRequest } from '@/api/authApi.js'
import { useAuthStore } from '@/store/useAuthStore.js'

export const useLogout = () => {
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)
  return useMutation({
    mutationFn: logoutRequest,
    onMutate: async () => {
      toast.info('Logging out...', {
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 5000,
      })
    },
    onSuccess: () => {
      setToken(null)
      setUser(null)
      toast.success('Logged out successfully', {
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 5000,
      })
      window.location.href = '/login'
    },
    onError: (error) => {
      console.error('Logout failed:', error)
      toast.error('Logout failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      })
    },
  })
}
