import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { loginRequest } from '@/api/authApi.js'
import { useAuthStore } from '@/store/useAuthStore.js'

export const useLogin = () => {
  const navigate = useNavigate()

  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)
  const setIsAuthInitialized = useAuthStore((s) => s.setIsAuthInitialized)

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ data }) => {
      const { token, ...user } = data
      setToken(token)
      setUser(user)
      setIsAuthInitialized(true)

      console.log(token, user)
      toast.success('Success')
      navigate('/')
    },
    onError: ({ response }) => {
      console.log(response.data)
      if (response.data.statusCode == 404) {
        toast.error('User not found')
        return
      }
      if (response.data.statusCode === 401) {
        toast.error('Password not match')
        return
      }

      toast.error(response.data.message)
    },
  })

  return mutation
}
