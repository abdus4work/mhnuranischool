import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteStudentRequest } from '@/api/studentApi.js'

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteStudentRequest,
    onSuccess: () => {
      toast.success('Student deleted')
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: () => {
      toast.error('Delete failed')
    },
  })

  return mutation
}
