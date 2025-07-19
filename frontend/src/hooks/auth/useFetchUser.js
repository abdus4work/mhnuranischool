import { useQuery } from '@tanstack/react-query'

import { getUserDataRequest } from '@/api/authApi.js'

export const useFetchUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserDataRequest,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
}
