import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { updateStaffRequest } from '@/api/staffApi.js'

export const useUpdateStaff = () => {
    const queryClient= useQueryClient();
  return useMutation({
    mutationFn: ({id,data})=>updateStaffRequest(id,data),
    onSuccess: () => {
      toast.success('Staff updated successfully')
      queryClient.invalidateQueries({queryKey:['staffs']})
    },
    onError: (error) => {
      console.log(error)
      toast.error('Something went wrong')
      
    },
  })
}
