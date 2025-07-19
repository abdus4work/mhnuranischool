import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteStaffRequest } from '@/api/staffApi.js'

export const useDeleteStaff = () => {
    const queryClient= useQueryClient();
  return useMutation({
    mutationFn: deleteStaffRequest,
    onSuccess: (data) => {
      console.log(data)
      toast.success('Staff deleted successfully')
      queryClient.invalidateQueries({queryKey:['staffs']})
    },
    onError: (error) => {
      console.log(error)
      toast.error('Something went wrong..')
    },
  })
}
