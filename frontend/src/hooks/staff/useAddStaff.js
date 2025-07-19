import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { addStaffRequest } from '@/api/staffApi.js'

export const useAddStaff = (form) => {
  return useMutation({
    mutationFn: addStaffRequest,
    onSuccess: (data) => {
      console.log(data)
      toast.success(`Staff added Success full`)
      form.reset()
    },
    onError: (error) => {
      console.log('from hook', error.response)
      const errorMessage = error.response?.data?.message || 'Something went wrong'
      toast.error(errorMessage)
      const field = error.response?.data?.details?.[0]?.field
      if (field) {
        form.setError(field, {
          type: 'manual',
          message: `${field} already exists`,
        })
      }
    },
  })
}
