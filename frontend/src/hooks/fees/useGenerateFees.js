import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { generateDueFeesRequest } from '@/api/feesApi.js'

export const useGenerateFees = () => {
  return useMutation({
    mutationFn: generateDueFeesRequest,
    onSuccess: ({data}) => {
      const message = data?.modifiedCount > 0? 'Fees generated successfully' : 'Fees already generated' 
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    },
    onError: (error) => {
      console.error('Error generating fees:', error)
      toast.error('Failed to generate fees', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    },
  })
}
