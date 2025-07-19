import axios from 'axios'

import { getUserDataRequest, refreshTokenRequest } from '@/api/authApi.js'
import { serverConfig } from '@/Configs/serverConfig.js'
import { useAuthStore } from '@/store/useAuthStore.js'

export const api = axios.create({
  baseURL: serverConfig.API_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    const isRefreshUrl = originalRequest.url.includes('/auth/refresh-token')
    if (isRefreshUrl) {
      window.location.href = '/login'

      return Promise.reject(err)
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { data } = await refreshTokenRequest()
        useAuthStore.getState().setToken(data.token)
        originalRequest.headers.Authorization = `Bearer ${data.token}`

        //Fetch the user data again after refreshing the token
        const userResponse = await getUserDataRequest()

        useAuthStore.getState().setUser(userResponse.data)

        return api(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return Promise.reject(err)
  }
)
